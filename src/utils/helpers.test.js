import {
  calculateIndexedSalary,
  calculatePayrollTax,
  calculateRSZ,
  formatSalaryData,
  readXlsxFile,
} from "./helpers";

jest.mock("xlsx", () => ({
  read: jest.fn(),
  utils: {
    sheet_to_json: jest.fn(),
  },
}));

// Mocking fetch globally
global.fetch = jest.fn();

describe("readXlsxFile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch the Excel file and return parsed JSON data", async () => {
    const mockArrayBuffer = new ArrayBuffer(8);
    fetch.mockResolvedValueOnce({
      arrayBuffer: jest.fn().mockResolvedValue(mockArrayBuffer),
    });

    const mockSheetData = [{ id: 1, name: "Test" }];
    const mockWorkbook = { Sheets: { Sheet1: {} }, SheetNames: ["Sheet1"] };
    const XLSX = require("xlsx");
    XLSX.read.mockReturnValue(mockWorkbook);
    XLSX.utils.sheet_to_json.mockReturnValue(mockSheetData);

    const result = await readXlsxFile();
    expect(fetch).toHaveBeenCalledWith("./jaarbasis.xlsx");
    expect(XLSX.read).toHaveBeenCalledWith(mockArrayBuffer, { type: "array" });
    expect(XLSX.utils.sheet_to_json).toHaveBeenCalledWith(
      mockWorkbook.Sheets["Sheet1"]
    );
    expect(result).toEqual(mockSheetData);
  });

  it("should throw an error if no data is loaded", async () => {
    const mockArrayBuffer = new ArrayBuffer(8);
    fetch.mockResolvedValueOnce({
      arrayBuffer: jest.fn().mockResolvedValue(mockArrayBuffer),
    });

    const mockWorkbook = { Sheets: { Sheet1: {} }, SheetNames: ["Sheet1"] };
    const XLSX = require("xlsx");
    XLSX.read.mockReturnValue(mockWorkbook);
    XLSX.utils.sheet_to_json.mockReturnValue([]); // No data returned

    await expect(readXlsxFile()).rejects.toThrow("Geen data opgeladen");
  });

  it("should throw an error if the file is not found", async () => {
    fetch.mockRejectedValueOnce(new Error("File not found"));

    await expect(readXlsxFile()).rejects.toThrow("File not found");
    expect(fetch).toHaveBeenCalledWith("./jaarbasis.xlsx");
  });
});

describe("formatSalaryData", () => {
  it("should format salary scales correctly", () => {
    const salaryScales = [
      { naam: "A", trap: 1, loon: 1000 },
      { naam: "A", trap: 2, loon: 1100 },
      { naam: "B", trap: 1, loon: 1200 },
    ];

    const formatted = formatSalaryData(salaryScales);

    expect(formatted).toEqual([
      {
        naam: "A",
        steps: [
          { trap: 1, loon: 1000 },
          { trap: 2, loon: 1100 },
        ],
      },
      { naam: "B", steps: [{ trap: 1, loon: 1200 }] },
    ]);
  });

  it("should handle an empty salaryScales array", () => {
    const salaryScales = [];
    const formatted = formatSalaryData(salaryScales);
    expect(formatted).toEqual([]);
  });
});

describe("calculateIndexedSalary", () => {
  it("should calculate the indexed salary correctly", () => {
    const salary = 1000;
    const expectedSalary = 1000 + (1000 * 2.0807) / 100;
    const result = calculateIndexedSalary(salary);
    expect(result).toBeCloseTo(expectedSalary, 2);
  });

  it("should throw an error if the input is not a number", () => {
    expect(() => calculateIndexedSalary("not-a-number")).toThrow(
      "Geïndexeerd salaris - Het ingevoerde salaris is geen nummer"
    );
  });
});

describe("calculateRSZ", () => {
  it("should calculate RSZ contributions correctly", () => {
    const indexedSalary = 2000;
    const expectedRSZ = ((2000 / 12) * 13.07) / 100;
    const result = calculateRSZ(indexedSalary);
    expect(result).toBeCloseTo(expectedRSZ, 2);
  });

  it("should throw an error if the input is not a number", () => {
    expect(() => calculateRSZ("not-a-number")).toThrow(
      "RSZ - Het ingevoerde salaris is geen nummer"
    );
  });
});

describe("calculatePayrollTax", () => {
  it("should calculate payroll tax correctly", () => {
    const indexedSalary = 3000;
    const expectedTax = ((3000 / 12) * 33) / 100;
    const result = calculatePayrollTax(indexedSalary);
    expect(result).toBeCloseTo(expectedTax, 2);
  });

  it("should throw an error if the input is not a number", () => {
    expect(() => calculatePayrollTax("not-a-number")).toThrow(
      "PayrollTax - Het ingevoerde salaris is geen nummer"
    );
  });
});

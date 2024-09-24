import * as XLSX from "xlsx";

const INDEX = 2.0807;
const RSZ = 13.07;
const PAYROLL_TAX = 33;

const checkNumber = (value, errorMessage) => {
  if (typeof value !== "number") throw new Error(errorMessage);
};

export const readXlsxFile = async () => {
  const res = await fetch("./jaarbasis.xlsx");
  const workbookData = await res.arrayBuffer();
  const wb = XLSX.read(workbookData, { type: "array" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  if (jsonData.length === 0) throw new Error("Geen data opgeladen");

  return jsonData;
};

export const formatSalaryData = (salaryScales) => {
  const formattedSalaryScale = [];

  for (const salaryScale of salaryScales) {
    const { naam, trap, loon } = salaryScale;

    const entry = formattedSalaryScale.find((scale) => scale.naam === naam);

    if (!entry) {
      formattedSalaryScale.push({ naam, steps: [{ trap, loon }] });
    } else {
      entry.steps.push({ trap, loon });
    }
  }

  return formattedSalaryScale;
};

export const calculateIndexedSalary = (salary) => {
  checkNumber(
    salary,
    "Geïndexeerd salaris - Het ingevoerde salaris is geen nummer"
  );

  return (salary += (salary * INDEX) / 100);
};

export const calculateRSZ = (indexedSalary) => {
  checkNumber(indexedSalary, "RSZ - Het ingevoerde salaris is geen nummer");

  return ((indexedSalary / 12) * RSZ) / 100;
};

export const calculatePayrollTax = (indexedSalary) => {
  checkNumber(
    indexedSalary,
    "PayrollTax - Het ingevoerde salaris is geen nummer"
  );

  return ((indexedSalary / 12) * PAYROLL_TAX) / 100;
};

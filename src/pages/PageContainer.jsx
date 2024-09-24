import { useCallback, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import * as XLSX from "xlsx";
import {
  calculateIndexedSalary,
  calculatePayrollTax,
  calculateRSZ,
  formatSalaryData,
  readXlsxFile,
} from "../utils/helpers";
import { SalariesSelect, Steps, Value } from "../components";

export const PageContainer = () => {
  const { showBoundary } = useErrorBoundary();
  const [salaries, setSalaries] = useState([]);
  const [selectedSalaryScale, setSelectedSalaryScale] = useState({});
  const [isSalaryScaleSelected, setIsSalaryScaleSelected] = useState(false);
  const [selectedStep, setSelectedStep] = useState({});
  const [isStepSelected, setIsStepSelected] = useState(false);
  const [indexedSalary, setIndexedSalary] = useState(0);
  const [socialContribution, setSocialContribution] = useState(0);
  const [payrollTax, setPayrollTax] = useState(0);

  const fetchSalaryData = useCallback(async () => {
    try {
      const xlsxData = await readXlsxFile();
      setSalaries(formatSalaryData(xlsxData));
    } catch (error) {
      showBoundary(error);
    }
  }, []);

  useEffect(() => {
    fetchSalaryData();
  }, []);

  const handleSelectSalaryScaleChange = (event) => {
    setIsStepSelected(false);

    setSelectedSalaryScale(
      salaries.find((salary) => salary.naam === event.target.value)
    );

    setIsSalaryScaleSelected(true);
  };

  const handleSelectStep = (trap) => {
    const selected = selectedSalaryScale.steps.find(
      (step) => step.trap === trap
    );

    setSelectedStep(selected);

    try {
      const indexed = calculateIndexedSalary(selected.loon);
      const rsz = calculateRSZ(indexed);
      const tax = calculatePayrollTax(indexed);

      setIndexedSalary(indexed);
      setSocialContribution(rsz);
      setPayrollTax(tax);
    } catch (error) {
      showBoundary(error);
    }

    setIsStepSelected(true);
  };

  return (
    <>
      <div className="container p-12 mx-auto my-24">
        <h1 className="p-4 text-2xl font-bold text-center bg-amber-400">
          Loonschalen
        </h1>
        <div className="px-2 py-4 bg-zinc-300 min-h-96">
          <SalariesSelect
            handleSelectChange={handleSelectSalaryScaleChange}
            salaries={salaries}
          />

          {isSalaryScaleSelected && (
            <>
              <div className="mt-4">
                <Steps
                  handleSelectStep={handleSelectStep}
                  selectedSalaryScale={selectedSalaryScale}
                />
              </div>
              <hr className="my-4" />
            </>
          )}

          {isStepSelected && (
            <>
              <h3 className="mb-3 text-xl font-bold">
                Waarden voor trap {selectedStep.trap}
              </h3>
              <Value label={"Jaarbasis"} value={selectedStep.loon} />
              <Value label={"Geïndexeerde jaarbasis"} value={indexedSalary} />
              <Value label={"RSZ"} value={socialContribution} />
              <Value label={"Bedrijfsvoorheffing"} value={payrollTax} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

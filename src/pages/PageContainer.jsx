import { useCallback, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import * as XLSX from "xlsx";
import {
  calculateIndexedSalary,
  calculatePayrollTax,
  calculateRSZ,
  formatSalaryData,
} from "../utils/helpers";
import { Salaries, Steps } from "../components";

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
      const res = await fetch("./jaarbasis.xlsx");
      const workbookData = await res.arrayBuffer();
      const wb = XLSX.read(workbookData, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      if (jsonData.length === 0) throw new Error("Geen data");

      setSalaries(formatSalaryData(jsonData));
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
    const indexed = calculateIndexedSalary(selected.loon);
    const rsz = calculateRSZ(indexed);
    const tax = calculatePayrollTax(indexed);

    setSelectedStep(selected);
    setIndexedSalary(indexed);
    setSocialContribution(rsz);
    setPayrollTax(tax);
    setIsStepSelected(true);
  };

  return (
    <>
      <h1>Loonschalen</h1>
      <Salaries
        handleSelectChange={handleSelectSalaryScaleChange}
        salaries={salaries}
      />

      {isSalaryScaleSelected && (
        <>
          <Steps
            handleSelectStep={handleSelectStep}
            selectedSalaryScale={selectedSalaryScale}
          />
        </>
      )}

      {isStepSelected && (
        <>
          <p>Waarden voor trap {selectedStep.trap}</p>
          <p>Jaarbasis: {selectedStep.loon} EUR</p>
          <p>Geïndexeerde jaarbasis: {indexedSalary.toFixed(2)} EUR</p>
          <p>RSZ: {socialContribution.toFixed(2)} EUR</p>
          <p>Bedrijfsvoorheffing: {payrollTax.toFixed(2)} EUR</p>
        </>
      )}
    </>
  );
};

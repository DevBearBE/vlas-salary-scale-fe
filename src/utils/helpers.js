const INDEX = 2.0807;
const RSZ = 13.07;
const PAYROLL_TAX = 33;

export const formatSalaryData = (salaryScales) => {
  let formattedSalaryScale = [];

  for (const salaryScale of salaryScales) {
    const { naam, trap, loon } = salaryScale;

    if (
      formattedSalaryScale.length === 0 ||
      formattedSalaryScale.every((scale) => scale.naam !== naam)
    ) {
      formattedSalaryScale = [
        ...formattedSalaryScale,
        { naam, steps: [{ trap, loon }] },
      ];
    } else {
      const entry = formattedSalaryScale.find((scale) => scale.naam === naam);

      entry.steps = [...entry.steps, { trap, loon }];
    }
  }

  return formattedSalaryScale;
};

export const calculateIndexedSalary = (salary) => {
  if (typeof salary !== "number")
    throw new Error("Het type van het ingevoerde salaris is geen nummer");

  return (salary += (salary * INDEX) / 100);
};

export const calculateRSZ = (indexedSalary) => {
  if (typeof indexedSalary !== "number")
    throw new Error("Het type van het geïndexeerde salaris is geen nummer");

  return ((indexedSalary / 12) * RSZ) / 100;
};

export const calculatePayrollTax = (indexedSalary) => {
  if (typeof indexedSalary !== "number")
    throw new Error("Het type van het ingevoerde salaris is geen nummer");

  return ((indexedSalary / 12) * PAYROLL_TAX) / 100;
};

import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";

export const Salaries = () => {
  const [salaries, setSalaries] = useState([]);

  const fetchSalaryData = useCallback(async () => {
    try {
      await fetch("./jaarbasis.xlsx")
        .then((response) => response.arrayBuffer())
        .then((data) => {
          // Convert the data to a workbook
          const workbook = XLSX.read(data, { type: "array" });

          // Get the first sheet
          const sheet = workbook.Sheets[workbook.SheetNames[0]];

          // Convert the sheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          // Do something with the JSON data
          console.log(jsonData);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchSalaryData();
  }, []);

  return (
    <>
      <h1 className="bg-red-500">Salaries</h1>
    </>
  );
};

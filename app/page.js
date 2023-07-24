"use client"
import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [data, setData] = useState({});

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const bufferArray = e.target.result;
      const workbook = XLSX.read(bufferArray, { type: "array" });

      const allData = {};

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        allData[sheetName] = parsedData;
      });

      setData(allData);
      console.log("Data Object:", allData); // Log the data object to the console
    };
  };

  return (
    <div className="App">
      <h2>My Excel</h2>

      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {/* Rest of the JSX to display data in tables */}
    </div>
  );
}

export default App;

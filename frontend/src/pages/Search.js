import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "../components/Navbar";
import "./Search.css";

function Search() {
  const [search, setSearch] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((result) => {
        setSearch(result);
      });
  });

  const columns = [
    {
      name: "ชื่อ",
      selector: (row) => row.Fname,
    },
    {
      name: "นามสกุล",
      selector: (row) => row.Lname,
    },
    {
      name: "อายุ",
      selector: (row) => row.Age,
    },
    {
      name: "เพศ",
      selector: (row) => row.Gender,
    },
    {
      name: "ระยะที่",
      selector: (row) => row.Phase,
    },
    {
      name: "คู่ที่",
      selector: (row) => row.Team,
    },
    {
      name: "นักกายภาพบำบัด",
      selector: (row) => row.NamePt,
    },
  ];

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <main>
        <br /> <br />
        <h2>ข้อมูลผู้ป่วย</h2>
        <br /> <br />
        <div className="app">
          <DataTable columns={columns} data={search} />
        </div>
      </main>
    </div>
  );
}

export default Search;

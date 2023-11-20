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
    // {
    //   name: "ลำดับที่",
    //   selector: (row) => row.id,
    // },
    {
      name: "ชื่อ",
      selector: (row) => row.fname,
    },
    {
      name: "นามสกุล",
      selector: (row) => row.lname,
    },
    {
      name: "อายุ",
      selector: (row) => row.age,
    },
    {
      name: "เพศ",
      selector: (row) => row.gender,
    },
    {
      name: "ระยะที่",
      selector: (row) => row.phase,
    },
    {
      name: "คู่ที่",
      selector: (row) => row.team,
    },
    {
      name: "นักกายภาพบำบัด",
      selector: (row) => row.namept,
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

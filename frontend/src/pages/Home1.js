import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Home1.css";
import { useLocation } from "react-router-dom";

function Home1() {
  const [personalInfo, setPersonalInfo] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const id = new URLSearchParams(search).get("id");
    fetch("http://localhost:5000/health/" + id)
      .then((res) => res.json())
      .then((result) => {
        setPersonalInfo(result);
      });
  }, [search]);
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="header">
        <h2>บันทึกการออกกำลังกาย</h2>
        <div className="main">
          <ui>
            {personalInfo.map((health) => (
              <li>
                ชื่อ: {health.fname}
                <br />
                นามสกุล: {health.lname}
                <br />
                ระยะที่: {health.phase}
              </li>
            ))}
          </ui>
        </div>
        <div className="body">
          <ui>
            {personalInfo.map((health) => (
              <li>
                ข้อที่ 1 : {health.question1}
                <br />
                ข้อที่ 2 : {health.question2}
                <br />
                ข้อที่ 3 : {health.question3}
                <br />
                ข้อที่ 4 : {health.question4}
                <br />
                ข้อที่ 5 : {health.question5}
              </li>
            ))}
          </ui>
        </div>
      </div>
    </div>
  );
}

export default Home1;

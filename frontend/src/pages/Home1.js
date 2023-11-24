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
                ชื่อ: {health.Fname}
                <br />
                นามสกุล: {health.Lname}
                <br />
                ระยะที่: {health.Phase}
              </li>
            ))}
          </ui>
        </div>
        <div className="body">
          <ui>
            {personalInfo.map((health) => (
              <li>
                ข้อที่ 1 : ระดับความปวด {health.Question1}
                <br />
                ข้อที่ 2 : ระดับความปวด {health.Question2}
                <br />
                ข้อที่ 3 : ระดับความปวด {health.Question3}
                <br />
                ข้อที่ 4 : ระดับความปวด {health.Question4}
                <br />
                ข้อที่ 5 : ระดับความปวด {health.Question5}
                <br />
                ข้อที่ 6 : ระดับความปวด {health.Question6}
              </li>
            ))}
          </ui>
        </div>
      </div>
    </div>
  );
}

export default Home1;

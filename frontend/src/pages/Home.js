import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          getName();
        } else {
          localStorage.removeItem("token");
          window.location = "/login";
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  const token = localStorage.getItem("token");
  const [name, setName] = useState([]);

  const getName = () => {
    fetch("http://localhost:5000/health", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data);
      });
  };

  const onGotoPage = (e) => {
    window.location = "/Home1?id=" + e.id;
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="centered">
        <h2>บันทึกการออกกำลังกาย</h2>
        {name.map((item, index) => {
          return (
            <>
              <div className="btn">
                <button onClick={() => onGotoPage(item)}>
                  ผู้ป่วยลำดับที่ {index + 1}
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Chart from "../components/Chart";

function Home() {
  const [coronaGlobalData, setCoronaGlobalData] = useState({});

  const [cases, setGlobalCases] = useState("");
  const [deaths, setGlobalDeaths] = useState("");
  const [recovered, setGlobalRecovered] = useState("");

  useEffect(() => {
      axios
        .get(
          `https://coronavirus-19-api.herokuapp.com/all`
        )
        .then(function (response) {
          // handle success
          setCoronaGlobalData(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    });

  useEffect(() => {
    if (coronaGlobalData) {
      setGlobalCases(coronaGlobalData.cases);
      setGlobalDeaths(coronaGlobalData.deaths);
      setGlobalRecovered(coronaGlobalData.recovered);
    }
  }, [coronaGlobalData]);

  return (
    <div className="dataContainer">

        <Header />

        <div className="sectionContainerMain">
          <p><strong>COVID-19 in the World</strong></p>
        </div>
        <div className="sectionContainer">
            <div className="infoRowMain">
              <div className="infoColumn">
                <p><strong>Confirmed:</strong></p>
                <p><strong>Deaths:</strong></p>
                <p><strong>Recovered:</strong></p>
              </div>
              <div className="infoColumn2">
                <p><strong>{cases}</strong></p>
                <p><strong><span className="redText">{deaths}</span></strong></p>
                <p><strong><span className="greenText">{recovered}</span></strong></p>
              </div>
            </div>
        </div>
        <div className="sectionContainer">
            <Chart />
        </div>

    </div>

    
);


}

export default Home;
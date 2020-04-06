import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Chart from "../components/Chart";

function Home() {
  const [coronaGlobalData, setCoronaGlobalData] = useState({});

  const [cases, setGlobalCases] = useState("");
  const [todayCases, setGlobalTodayCases] = useState("");
  const [deaths, setGlobalDeaths] = useState("");
  const [todayDeaths, setGlobalTodayDeaths] = useState("");
  const [recovered, setGlobalRecovered] = useState("");
  const [active, setGlobalActive] = useState("");
  const [critical, setGlobalCritical] = useState("");

  useEffect(() => {
      axios
        .get(
          `https://coronavirus-19-api.herokuapp.com/countries/world`
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
      setGlobalTodayCases(coronaGlobalData.todayCases);
      setGlobalDeaths(coronaGlobalData.deaths);
      setGlobalTodayDeaths(coronaGlobalData.todayDeaths);
      setGlobalRecovered(coronaGlobalData.recovered);
      setGlobalActive(coronaGlobalData.active);
      setGlobalCritical(coronaGlobalData.critical);
    }
  }, [coronaGlobalData]);

  return (
    <div className="dataContainer">

        <Header />

        <div className="sectionContainerMain">
          <p><strong>COVID-19 in the World</strong></p>
        </div>
        <div className="sectionContainer">
            <div className="infoRowContainer">

              <div className="infoRowMain">
                <div className="infoColumn">
                  <p><strong>Confirmed:</strong></p>
                  <p><strong>Deaths:</strong></p>
                  <p><strong>Recovered:</strong></p>
                </div>
                <div className="infoColumn2">
                  <div className="infoRow">
                    <p><strong>{cases}</strong></p>
                  </div>
                  <div className="infoRow">
                    <p><span className="redText"><strong>{deaths}</strong></span></p>
                  </div>
                  <div className="infoRow">
                    <p><span className="greenText"><strong>{recovered}</strong></span></p>
                  </div>
                </div>
              </div>

              <div className="infoColumnArrows">
                <div className="infoRowArrows">
                  <img height="10px" width="14px" src="./black-arrow.png"></img>
                  <p><span class="smallText">{todayCases} Today</span></p>
                </div>
                <div className="infoRowArrows">
                  <img height="10px" width="14px" src="./red-arrow.png"></img>
                  <p><span class="smallRedText">{todayDeaths} Today</span></p>
                </div>
              </div>

            </div>
        </div>

        <div className="sectionContainer">
          <div className="infoRowMain">
            <div className="infoColumn">
              <p><strong>Active:</strong></p>
              <p><strong>Critical:</strong></p>
            </div>
            <div className="infoColumn2">
              <p><strong>{active}</strong></p>
              <p><strong>{critical}</strong></p>
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
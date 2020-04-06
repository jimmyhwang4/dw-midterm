import React, { useEffect, useState } from "react";
import axios from "axios";
import {Bar} from 'react-chartjs-2';

function Chart() {
  // API
  const [countryData, setCountryData] = useState([]);

  const [nameData, setNameData] = useState([]);
  const [casesData, setCasesData] = useState([]);

  useEffect(() => {
    if (countryData) {
      axios
        .get(
          `https://coronavirus-19-api.herokuapp.com/countries`
        )
        .then(function (response) {
          // handle success
          setCountryData(response.data);
        });
      }
    },[countryData]);

  useEffect(() => {
    if (nameData) {
    let countryArray = [];
    let casesArray = [];

    countryData.map(item => {
      countryArray.push(item.country);
      casesArray.push(item.cases);
    })
    setNameData(countryArray);
    setCasesData(casesArray);
    console.log('values', countryData, casesData);
    }
  }, [nameData]);

  let nameDataRemoved = nameData.slice(1, 17);
  let casesDataRemoved = casesData.slice(1, 17);

  // Chart
  const state = {

    // x-axis (countryArray)
    labels: nameDataRemoved,
    datasets: [
      {
        label: 'Cases',
        backgroundColor: 'rgba(125,125,125)',
        borderColor: 'rgba(125,125,125)',
        borderWidth: 0,
        // y-axis (casesArray)
        data: casesDataRemoved
      }
    ]
  }
  return (
    <div>
      <Bar
        data={state}
        options={{
          title:{
            display: true,
            text: 'COVID-19 Cases in Most Affected Countries',
            fontSize: 18
          },
          legend:{
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  );
}
export default Chart;
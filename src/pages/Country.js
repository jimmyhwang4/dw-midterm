import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";

function Country() {
  const [coronaCountryData, setCoronaCountryData] = useState({});
  const [country, setCountry] = useState(null);

  const [cases, setCountryCases] = useState("");
  const [todayCases, setCountryTodayCases] = useState("");
  const [deaths, setCountryDeaths] = useState("");
  const [todayDeaths, setCountryTodayDeaths] = useState("");
  const [recovered, setCountryRecovered] = useState("");
  const [active, setCountryActive] = useState("");
  const [critical, setCountryCritical] = useState("");
  const [casesPerOneMillion, setCountryCasesPerOneMillion] = useState("");
  const [deathsPerOneMillion, setCountryDeathsPerOneMillion] = useState("");

  let history = useHistory();

  // NEWS BY COUNTRY
  class NewsCountry extends React.Component {
    state = {
        news: [],
        isLoading: true,
        errors: null
    };
    
    getNewsCountry() {
        axios
            .get(`https://newsapi.org/v2/everything?q=${country}%20AND%20coronavirus&apiKey=407c0529551e4f43a30236fab2be4290`)
            .then(response =>
                response.data.articles.map(news => ({
                    id: `${news.source.id}`,
                    title: `${news.title}`,
                    author: `${news.author}`,
                    description: `${news.description}`,
                    url: `${news.url}`,
                    urlToImage: `${news.urlToImage}`,
                    publishedAt: `${news.publishedAt}`
                }))
            )
            .then(news => {
                this.setState({
                    news,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getNewsCountry();
    }

    render() {
        const { isLoading, news } = this.state;
        return (
            <React.Fragment>
                <div>
                    {!isLoading ? (
                        news.map(newsInfo => {
                            const { id, title, author, description, url, urlToImage, publishedAt } = newsInfo;
                            return (
                                <div className="newsContainer">
                                    <div className ="newsCard" key={id}>
                                        <div className="newsRow">
                                            <div className="newsImageContainer">
                                                <img width="400px" height="260px" src={urlToImage}></img>
                                            </div>
                                            <div className="newsTextContainer">
                                                <h2>{title}</h2>
                                                <div className="menuSmallText">
                                                    <p>{author} • Published {publishedAt}</p>
                                                </div>
                                                <div className="menuMedText">
                                                    <p>{description}</p>
                                                </div>
                                                <a target="_blank" rel="noopener noreferrer" href={url}>Read More</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </React.Fragment>
        );
      }
    }

    // COUNTRY DATA API
  useEffect(() => {
    let searchParams = history.location.search;
    let urlParams = new URLSearchParams(searchParams);
    let country = urlParams.get("country");
    if (country) {
      setCountry(country);
    } else {
      setCountry("USA");
    }
  }, [history]);

  useEffect(() => {
    if (country) {
    // Make a request for the coronavirus status by country
      axios
        .get(
          `https://coronavirus-19-api.herokuapp.com/countries/${country}`
        )
        .then(function (response) {
          // handle success
          setCoronaCountryData(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }, [country]);

  useEffect(() => {
    if (coronaCountryData) {
      setCountryCases(coronaCountryData.cases);
      setCountryTodayCases(coronaCountryData.todayCases);
      setCountryDeaths(coronaCountryData.deaths);
      setCountryTodayDeaths(coronaCountryData.todayDeaths);
      setCountryRecovered(coronaCountryData.recovered);
      setCountryActive(coronaCountryData.active);
      setCountryCritical(coronaCountryData.critical);
      setCountryCasesPerOneMillion(coronaCountryData.casesPerOneMillion);
      setCountryDeathsPerOneMillion(coronaCountryData.deathsPerOneMillion);
    }
  }, [coronaCountryData]);

  return (
    <div className="dataContainer">
        <Header />
        <div className="sectionContainerMain">
            <p><strong>COVID-19 in {country}</strong></p>
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
          <div className="infoRowMain">
            <div className="infoColumn">
              <p><strong>Cases per One Million:</strong></p>
              <p><strong>Deaths per One Million:</strong></p>
            </div>
            <div className="infoColumn2">
              <p><strong>{casesPerOneMillion}</strong></p>
              <p><strong>{deathsPerOneMillion}</strong></p>
            </div>
          </div>
        </div>

        <NewsCountry />
        
    </div>
  );


}

export default Country;
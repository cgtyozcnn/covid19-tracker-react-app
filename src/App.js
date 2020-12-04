
import "./App.scss";
import InfoCard from "./components/InfoCard/InfoCard";
import InfoChart from "./components/InfoChart/InfoChart";
import React, { useCallback, useEffect, useState } from "react";
import CountryTable from "./components/CountryTable/CountryTable";
import Grid from "@material-ui/core/Grid";
const App = () => {
  const [countryList, setCountryList] = useState();
  const [selectedCountryInfo, setSelectedCountryInfo] = useState({});
  const [selectedCountryHistoryInfo, setSelectedCountryHistoryInfo] = useState(
    {}
  );
  const [selectedCountryCode, setSelectedCountryCode] = useState("worldwide");
  const [infoType, setInfoType] = useState("Cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountryInfo(data);
      });
  }, []);

  const getCountries = useCallback(async () => {
    try {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const resData = await response.json();
      let sortedData = resData.sort((a, b) => {
        return a.cases > b.cases ? -1 : 1;
      });
      setCountryList(sortedData);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const onSelectCountryHandler = useCallback(
    async (countryCode = "worldwide") => {
      try {
        const response = await fetch(
          countryCode === "worldwide"
            ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`
        );
        const resData = await response.json();
        setSelectedCountryInfo(resData);

        setSelectedCountryCode(countryCode);
        const responseHistory = await fetch(
          countryCode === "worldwide"
            ? "https://disease.sh/v3/covid-19/historical/all"
            : `https://disease.sh/v3/covid-19/historical/${countryCode}`
        );
        const resDataHistory = await responseHistory.json();
        setSelectedCountryHistoryInfo(
          countryCode === "worldwide" ? resDataHistory : resDataHistory.timeline
        );
      } catch (error) {
        throw error;
      }
    },
    [setSelectedCountryInfo, setSelectedCountryHistoryInfo]
  );
  useEffect(() => {
    onSelectCountryHandler();
  }, [onSelectCountryHandler]);

  return (
    <div className="App">
      <nav className="Navbar">
        <div className="LogoContainer">
          <img src={require("./assets/logo.png").default} className="image" />
          <h3 className="logo_text">Covid 19 Tracker</h3>
        </div>
      </nav>
      <main className="Content">
        <div className="CountryTableContainer">
          <CountryTable
            data={countryList}
            onSelect={onSelectCountryHandler}
            selected={selectedCountryCode}
          />
        </div>
        <div className="InfoContainer">
          <div className="info-cards">
            <Grid container justify="center">
              <InfoCard
                type="Cases"
                total={selectedCountryInfo.cases}
                active={selectedCountryInfo.todayCases}
                updatedTime={selectedCountryInfo.updated}
                clicked={infoType === "Cases"}
                onClickInfo={() => setInfoType("Cases")}
              />
              <InfoCard
                type="Recovered"
                total={selectedCountryInfo.recovered}
                active={selectedCountryInfo.todayRecovered}
                updatedTime={selectedCountryInfo.updated}
                clicked={infoType === "Recovered"}
                onClickInfo={() => setInfoType("Recovered")}
              />
              <InfoCard
                type="Deaths"
                total={selectedCountryInfo.deaths}
                active={selectedCountryInfo.todayDeaths}
                updatedTime={selectedCountryInfo.updated}
                clicked={infoType === "Deaths"}
                onClickInfo={() => setInfoType("Deaths")}
              />
            </Grid>
          </div>
          <div className="info-chart">
            <InfoChart
              data={selectedCountryHistoryInfo}
              infoType={infoType}
              countryName={
                selectedCountryInfo.country
                  ? selectedCountryInfo.country
                  : "Worldwide"
              }
            />
          </div>
        </div>
      </main>
      <footer className="Footer">&#xA9; Copyright</footer>
    </div>
  );
};

export default App;

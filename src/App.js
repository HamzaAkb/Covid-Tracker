import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardX from './components/card';
import CountryPicker from './components/countryPicker';
import LiveCasesByCountry from './components/liveCasesByCountry';
import {
  convertToMillions,
  convertToThousands,
} from './helper functions/helperFunctions';

const App = () => {
  const [data, setData] = useState({});
  const [flag, setFlag] = useState(false);
  const [country, setCountry] = useState('Worldwide');
  const [kOrM, setKOrM] = useState('m');

  useEffect(() => {
    if (country === 'Worldwide') {
      axios
        .get('https://disease.sh/v3/covid-19/all')
        .then(({ data }) => {
          const overall = convertToMillions([
            data.cases,
            data.recovered,
            data.deaths,
          ]);
          const today = convertToThousands([
            data.todayCases,
            data.todayRecovered,
            data.todayDeaths,
          ]);
          setData({
            overall,
            today,
          });
          setFlag(true);
          setKOrM('m');
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    } else {
      axios
        .get(`https://disease.sh/v3/covid-19/countries/${country}`)
        .then(({ data }) => {
          const overall = convertToThousands([
            data.cases,
            data.recovered,
            data.deaths,
          ]);
          const today = convertToThousands([
            data.todayCases,
            data.todayRecovered,
            data.todayDeaths,
          ]);
          setData({
            overall,
            today,
          });
          setFlag(true);
          setKOrM('k');
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }
  }, [country]);

  const changeCountry = (item) => {
    setCountry(item);
  };

  return flag === true ? (
    <Grid container style={{ marginTop: '25px' }}>
      <Grid item xs={12} md={8} style={{ padding: '0px 35px 0px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            style={{
              color: '#fc3c3c',
              fontWeight: 'bold',
              marginTop: '10px',
            }}
            variant='h4'
          >
            COVID-19 Tracker
          </Typography>
          <CountryPicker country={changeCountry} />
        </div>
        <Grid container>
          <CardX
            heading='Coronavirus Cases'
            overall={data.overall[0]}
            today={data.today[0]}
            color='#cf233f'
            kOrM={kOrM}
          />
          <CardX
            heading='Recovered'
            overall={data.overall[1]}
            today={data.today[1]}
            color='#90ee95'
            kOrM={kOrM}
          />
          <CardX
            heading='Deaths'
            overall={data.overall[2]}
            today={data.today[2]}
            color='#cc1034'
            kOrM={kOrM}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4}>
        <Grid item xs={1} md={0}></Grid>
        <Grid item xs={11} md={12}>
          <LiveCasesByCountry />
        </Grid>
        <Grid item xs={1} md={0}></Grid>
      </Grid>
    </Grid>
  ) : (
    ''
  );
};

export default App;

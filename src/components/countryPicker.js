import { FormControl, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CountryPicker = ({ country }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then(({ data }) => {
        const tempArr = [];
        tempArr.push('Worldwide');
        for (let i = 0; i < data.length; i++) {
          tempArr.push(data[i].country);
        }
        setCountries(tempArr);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }, []);

  const handleChange = (e) => {
    country(e.target.value);
  };

  return (
    <FormControl variant='outlined'>
      <Select
        style={{
          width: '150px',
          backgroundColor: 'white',
          marginRight: '15px',
        }}
        onChange={handleChange}
        defaultValue='Worldwide'
      >
        {countries.map((country) => {
          return (
            <MenuItem key={Math.random()} value={country}>
              {country}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CountryPicker;

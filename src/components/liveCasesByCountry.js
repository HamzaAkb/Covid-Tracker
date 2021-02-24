import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {} from '../helper functions/helperFunctions';

const LiveCasesByCountry = () => {
  const [item, setItem] = useState([]);

  let i = 0;

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/countries?sort=cases')
      .then(({ data }) => {
        const tempArr = [];
        for (let i = 0; i < data.length; i++) {
          tempArr.push({
            ...tempArr,
            country: data[i].country,
            cases: data[i].cases,
          });
        }
        setItem(tempArr);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }, []);

  return (
    <Table
      style={{ marginTop: '10px', backgroundColor: 'white', width: '90%' }}
    >
      <TableHead>
        <Typography variant='h5' style={{ padding: '20px 10px' }}>
          Live Cases By Country
        </Typography>
      </TableHead>
      <div
        style={{
          height: '400px',
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TableBody>
          {item.map((row) => {
            i = i + 1;
            return i % 2 !== 0 ? (
              <TableRow
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 10px',
                  backgroundColor: '#f3f2f8',
                }}
              >
                <Typography>{row.country}</Typography>
                <Typography>{row.cases}</Typography>
              </TableRow>
            ) : (
              <TableRow
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 10px',
                  backgroundColor: 'white',
                }}
              >
                <Typography>{row.country}</Typography>
                <Typography>{row.cases}</Typography>
              </TableRow>
            );
          })}
        </TableBody>
      </div>
    </Table>
  );
};

export default LiveCasesByCountry;

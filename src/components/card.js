import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';

const CardX = ({ heading, overall, today, color, kOrM }) => {
  return (
    <Grid style={{ marginTop: '10px' }} item xs={4}>
      <Card style={{ width: '95%', backgroundColor: 'white' }}>
        <CardContent>
          <Typography variant='body1'>{heading}</Typography>
          <Typography
            variant='h6'
            style={{
              margin: '10px 0',
              fontSize: '25px',
              color: color,
              fontWeight: 'bold',
            }}
          >
            +{today}k
          </Typography>
          <Typography variant='body2' style={{ fontWeight: 'bold' }}>
            {`${overall}${kOrM}\tTotal`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardX;

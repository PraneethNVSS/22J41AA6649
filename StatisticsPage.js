import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Typography, Container } from '@mui/material';

function StatisticsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get('/stats')
      .then(res => setData(res.data))
      .catch(err => alert('Failed to load statistics'));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Statistics</Typography>
      {data.map((url, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <Typography>
            <strong>Short URL:</strong> http://localhost:3000/{url.shortCode}
          </Typography>
          <Typography>
            <strong>Created:</strong> {new Date(url.createdAt).toLocaleString()}<br />
            <strong>Expires:</strong> {new Date(url.expiry).toLocaleString()}
          </Typography>
          <Typography><strong>Clicks:</strong> {url.clicks.length}</Typography>
          <ul>
            {url.clicks.map((click, j) => (
              <li key={j}>
                {click.timestamp} — {click.referrer} — {click.geo}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
}

export default StatisticsPage;

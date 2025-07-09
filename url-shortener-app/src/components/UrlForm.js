import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import API from '../services/api';
import useLogger from '../middleware/useLogger';

const UrlForm = () => {
  const [inputs, setInputs] = useState([{ url: '', code: '', validity: '' }]);
  const [results, setResults] = useState([]);
  const log = useLogger();

  const handleInputChange = (index, field, value) => {
    const copy = [...inputs];
    copy[index][field] = value;
    setInputs(copy);
  };

  const addRow = () => {
    if (inputs.length < 5) setInputs([...inputs, { url: '', code: '', validity: '' }]);
  };

  const handleSubmit = async () => {
    const payload = inputs.map(input => ({
      longUrl: input.url,
      customCode: input.code || undefined,
      validity: input.validity ? parseInt(input.validity) : 30
    }));

    try {
      const res = await API.post('/shorten', { data: payload });
      setResults(res.data);
      log('URL Shortened', res.data);
    } catch (err) {
      log('Error in shortening URL', err.response?.data || err.message);
      alert('Error: ' + (err.response?.data?.message || 'Invalid request'));
    }
  };

  return (
    <>
      {inputs.map((input, index) => (
        <Grid container spacing={2} key={index} style={{ marginBottom: 10 }}>
          <Grid item xs={12} sm={6}>
            <TextField label="Long URL" fullWidth required
              value={input.url}
              onChange={(e) => handleInputChange(index, 'url', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Custom Code (Optional)" fullWidth
              value={input.code}
              onChange={(e) => handleInputChange(index, 'code', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Validity (min)" type="number" fullWidth
              value={input.validity}
              onChange={(e) => handleInputChange(index, 'validity', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addRow} disabled={inputs.length >= 5}>+ Add More</Button>
      <Button variant="contained" onClick={handleSubmit} style={{ marginLeft: 10 }}>Shorten URLs</Button>

      {results.length > 0 && (
        <>
          <Typography variant="h6" style={{ marginTop: 20 }}>Shortened URLs:</Typography>
          {results.map((r, i) => (
            <div key={i}>
              <a href={`http://localhost:3000/${r.shortCode}`} target="_blank" rel="noreferrer">
                http://localhost:3000/{r.shortCode}
              </a> (expires at {new Date(r.expiry).toLocaleString()})
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default UrlForm;

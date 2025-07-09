import React from 'react';
import UrlForm from '../components/UrlForm';
import { Container, Typography } from '@mui/material';

function ShortenerPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <UrlForm />
    </Container>
  );
}

export default ShortenerPage;

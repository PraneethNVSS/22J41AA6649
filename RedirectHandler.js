import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    alert(`Redirecting for shortcode: ${shortcode}`);
    // Optional: fetch original URL from backend and redirect using window.location
  }, [shortcode]);

  return <h2>Redirecting...</h2>;
}

export default RedirectHandler;

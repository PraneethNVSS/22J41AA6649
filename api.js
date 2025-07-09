import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/api', // Or wherever your backend lives
});

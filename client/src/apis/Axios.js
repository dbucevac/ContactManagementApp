import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:5000/api',
  /* other custom settings */
});

export default Axios;
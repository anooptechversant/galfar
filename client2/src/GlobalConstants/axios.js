import axios from 'axios';

const instance = axios.create({
  baseURL:"http://127.0.0.1:8000", 
  /* baseURL: "https://drdloman.net/test-galfar-server/Server/public", */
});
// Add a request interceptor
/* instance.interceptors.request.use((config) => {
  // Add your common parameter to the request config
  config.params = {
    ...config.params,
    language: 1,
  };
  return config;
}); */
export default instance;
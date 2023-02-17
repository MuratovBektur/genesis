import axios from 'axios';

let token = '';
let baseURL = '';
let retryCount = 0;
const instance = axios.create();

const url = 'https://test.gnzs.ru/oauth/get-token.php';

async function refreshAccessTokenAndBaseUrl() {
  const { data } = await axios.get<{
    access_token: string;
    base_domain: string;
  }>(url, {
    headers: {
      'X-Client-Id': 30878566,
    },
  });
  token = data.access_token;
  baseURL = `https://${data.base_domain}/api/v4/`;
}

instance.interceptors.request.use(
  async function (config) {
    if (!token || !baseURL) {
      await refreshAccessTokenAndBaseUrl();
    }
    if (!config.url.startsWith(baseURL)) {
      config.url = `${baseURL}${config.url}`;
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (config) => config,
  async function (error) {
    console.error(error);
    const originalRequest = error.config;
    if (error.response.status === 401 && retryCount < 5) {
      retryCount++;
      token = '';
      baseURL = '';
      return await instance(originalRequest);
    }
    return Promise.reject(error);
  },
);
export default instance;

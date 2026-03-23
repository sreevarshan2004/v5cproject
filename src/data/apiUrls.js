
export const BASE_URL = 'https://macsinfosolution.com/v5c_api';
export const PROPERTY_URL = `${BASE_URL}/property`;
export const loginurl = `${BASE_URL}/login.php`;
export const addPropertyUrl = `${BASE_URL}/index.php`;
export const updatePropertyUrl = `${BASE_URL}/update.php`;
// Token management
let authToken = localStorage.getItem('authToken') || '';

export const getToken = () => authToken;

export const setToken = (token) => {
  authToken = token;
  localStorage.setItem('authToken', token);
};

export const clearToken = () => {
  authToken = '';
  localStorage.removeItem('authToken');
};

// API helper with token
export const apiRequest = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
    ...options.headers,
  };

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
};

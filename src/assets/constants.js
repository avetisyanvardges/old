let apiUrl;
let apiSocketUrl;
export const INSTAGRAM_ID = '1189010188164331';
export const INSTAGRAM_SECRET = '2edaca74bca3f6b364492c833af1b01d';
export const VK_ID = '7580359';
export const PREFIX = 'https://mapllo.com/';

if (__DEV__) {
  apiSocketUrl = 'https://mapllo.com';
  apiUrl = 'https://mapllo.com/api';
} else {
  apiSocketUrl = 'https://mapllo.com';
  apiUrl = 'https://mapllo.com/api';
}

export {apiUrl, apiSocketUrl};

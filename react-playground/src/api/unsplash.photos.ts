import { BASE_URL, API_ACCESS_TOKEN } from '../shared/constants';
import { mockResponse } from './mock';
import { ApiResponse } from './models';

const httpOptions = {
  method: 'GET',
  headers: {
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${API_ACCESS_TOKEN}`,
  },
};
export const getPhotoList = async (value: string): Promise<ApiResponse | undefined> => {
  try {
    const val = value ? value : '';
    // const URL = `${BASE_URL}/search/photos?query=${val}`;
    // const response = await fetch(URL, httpOptions);
    // const data = await response.json();
    console.log(val);
    return mockResponse;
  } catch (err) {
    console.log(err);
  }
};

export const getOnePhoto = async (id: string) => {
  try {
    const URL = `${BASE_URL}/photos/${id}`;
    const response = await fetch(URL, httpOptions);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

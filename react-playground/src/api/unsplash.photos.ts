import { BASE_URL, API_ACCESS_TOKEN } from '../shared/constants';
import { fetch } from 'cross-fetch';
import { ApiResponse, FullPhotoDTO } from './models';

const httpOptions = {
  method: 'GET',
  headers: {
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${API_ACCESS_TOKEN}`,
  },
};

export const getPhotoList = async (value: string): Promise<ApiResponse | undefined> => {
  try {
    const val = value ? value : 'wolves';
    const URL = `${BASE_URL}/search/photos?query=${val}`;
    console.log('BEFORE fetch list');
    const response = await fetch(URL, httpOptions);
    console.log('AFTER fetch list');
    const status = response.status;
    const statusText = response.statusText;
    const data = await response.json();
    return { ...data, status, statusText };
  } catch (err) {
    console.log(err);
  }
};

export const getOnePhoto = async (id: string | undefined): Promise<FullPhotoDTO | undefined> => {
  try {
    const URL = `${BASE_URL}/photos/${id}`;
    console.log('BEFORE fetch one');
    const response = await fetch(URL, httpOptions);
    console.log('AFTER fetch one');
    const status = response.status;
    const statusText = response.statusText;
    const data = await response.json();
    return { ...data, status, statusText };
  } catch (err) {
    console.log(err);
  }
};

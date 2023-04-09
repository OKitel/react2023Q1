import { BASE_URL, API_ACCESS_TOKEN } from '../shared/constants';
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
    const response = await fetch(URL, httpOptions);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getOnePhoto = async (id: string | undefined): Promise<FullPhotoDTO | undefined> => {
  try {
    const URL = `${BASE_URL}/photos/${id}`;
    const response = await fetch(URL, httpOptions);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

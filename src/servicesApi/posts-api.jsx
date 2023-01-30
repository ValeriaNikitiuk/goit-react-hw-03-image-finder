import axios from 'axios';

// instance - це налаштований axios

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export const searchPost = async (q, _page = 1, per_page) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      per_page: 12,
    },
  });
  return data;
};

export const getAllPosts = async () => {
  const { data } = await instance.get('/');
  return data;
};

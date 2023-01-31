const BASE_URL = `https://pixabay.com/api/`;

const API_KEY = '31921090-27d4ef087e87c171b6f0fd6ec';

function fetchImages(search, page) {
  const url = `${BASE_URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Something went wrong, please try again'));
  });
}

const api = { fetchImages };

export default api;
//

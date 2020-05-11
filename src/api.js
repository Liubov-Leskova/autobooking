const base = 'https://beta.autobooking.com/api/test/v1';
const get = (url) => fetch(base + url, { method: 'GET' })
  .then((res) => res.json())
  .then((res) => res)
  .catch((err) => {
    alert('Something went wrong'); //eslint-disable-line
    console.error(err); //eslint-disable-line
  });

export default {
  getData: () => Promise.allSettled([
    get('/search/terms'),
    get('/search/brands_terms'),
    get('/search/styles'),
  ]),
  parseLink: (link) => get(`/search/parse_link?${link}`),
};

import React, { useEffect, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router';
import API from './api';
import Select from './Select';
import utils from './utils';

const defaultState = {
  loading: false,
  data: {
    services: [],
    brands: [],
    styles: [],
  },
  selected: {
    service: {},
    brand: {},
    style: {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'data_request':
      return {
        ...state,
        loading: true,
      };
    case 'data_success':
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case 'parse_link':
      return {
        ...state,
        selected: action.selected,
      };
    default:
      throw new Error();
  }
}

const Main = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [state, dispatch] = useReducer(reducer, defaultState);
  const parseLink = () => {
    const url = utils.createQueryLink(pathname);
    if (url.length) {
      API.parseLink(url)
        .then((selected) => {
          dispatch({
            type: 'parse_link',
            selected,
          });
        });
    }
  };
  useEffect(() => {
    dispatch({ type: 'data_request' });
    parseLink();
    API.getData()
      .then((res) => {
        const [services, brands, styles] = res.map((i) => i.value.data);
        dispatch({
          type: 'data_success',
          data: {
            services,
            brands,
            styles,
          },
        });
      }); // would like get data only on mount
  }, []); //eslint-disable-line

  const handleChange = (value, type) => {
    history.push(utils.updateURL(value, type, pathname));
  };
  const { loading, data: { services, brands, styles } } = state;
  const { selected: { service, brand, style } } = state;
  return (
    loading
      ? <p>Loading ...</p>
      : (
        <div className="select__row">
          <Select
            onChange={(v) => handleChange(v, 's')}
            defaultValue={service}
            options={services}
            placeholder="Оберіть послугу"
          />
          <Select
            onChange={(v) => handleChange(v, 'b')}
            defaultValue={brand}
            options={brands}
            placeholder="Оберіть бренд"
          />
          <Select
            onChange={(v) => handleChange(v, 'st')}
            defaultValue={style}
            options={styles}
            placeholder="Оберіть стиль"
          />
        </div>
      )
  );
};

export default Main;

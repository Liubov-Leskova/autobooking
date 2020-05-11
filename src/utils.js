const updateURL = (value, type, pathname) => {
  const regexp = new RegExp(`${type}-[\\w-]{1,}`);
  let url = '';
  if (pathname === '/') {
    url = `/${type}-${value}`;
  } else if (!regexp.test(pathname)) {
    url = `${pathname}/${type}-${value}`;
  } else {
    url = pathname.replace(regexp, `${type}-${value}`);
  }
  return url;
};

const createQueryLink = (pathname) => pathname.substr(1)
  .split('/')
  .map((v) => {
    if (v.startsWith('s-')) {
      return `service_slug=${v}`;
    }
    if (v.startsWith('st-')) {
      return `style_slug=${v}`;
    }
    if (v.startsWith('b-')) {
      return `brand_slug=${v}`;
    }
    return null;
  })
  .join('&');

const emptyObject = (obj) => !!Object.keys(obj).length;
export default {
  updateURL,
  createQueryLink,
  emptyObject,
};

export const fetchHtml = async (urlStr: string) => {
  const r = await fetch(urlStr);
  return await r.text();
};

export const getSubUrls = ($: cheerio.Root, urlPrefix: string): string[] => {
  const r = [];
  $('a').each((index, value) => {
    const href = $(value).attr('href');
    console.log(href);

    // when url is absolute path which starts with either http:// or https://
    // - if url is current website, add url to the collection to be crawlled.
    // - if url is external website, ignore it.
    if (href.startsWith(urlPrefix)) {
      r.push(href);
    } else if (href.startsWith('http') || href.startsWith('https')) {
      // external website
      return;
    }

    // ignore '/' and add '/xxx' into the collection, e.g. /page
    if (href.startsWith('/') && href.length > 1) {
      r.push(urlPrefix + href);
    }

    // add 'xxx' into the collection, e.g. page
    if (!href.startsWith('/')) {
      r.push(urlPrefix + '/' + href);
    }
  });
  return r;
};

/**
 * remove trailing slash. e.g. google.com/ => google.com
 * lower case the url. e.g. Google.com => google.com
 */
export const normalizeURL = (url: string): string => {
  url = url.toLowerCase();
  if (url.length > 0 && url.slice(-1) === '/') {
    return url.slice(0, -1);
  }
  return url;
};

export const getUrlPrefix = (url: string): string => {
  const urlObj = new URL(url);
  return `${urlObj.protocol}//${urlObj.host}`;
};

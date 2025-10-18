const paramSeparator: string = '?'
const ERROR_PAGE_URL = '/';

/**
 * ハッシュ値を取得
 * @returns #xxxxx?aaaa=bbbbb&ccccc=123
 */
const getHash = (): string => {
  return window.location.hash;
}

/**
 * 指定したURLにパラメータが存在するか
 * @param url URL
 * @returns 存在するかどうか
 */
const existParam = (url: string): boolean => {
  return url.includes(paramSeparator);
}

/**
 * URLが指定したルートと一致しているかどうか
 * @param routes ルートの配列(/xxxxの配列) 
 * @returns 
 */
export const isContainRoute = (routes: string[]): boolean => {
  const url = getHash();
  if (existParam(url)) {
    return routes.includes(url.split(paramSeparator)[0])
  }
  return routes.includes(url);
}

/**
 * 指定したパラメータの値を返却します
 * @param paramName パラメータ名
 * @returns 
 */
export const getParam = (paramName: string): string => {
  const url = getHash();
  if (!existParam(url)) {
    return '';
  }
  const params = new URLSearchParams(url.split(paramSeparator)[1]);
  return params.get(paramName) || '';
}

export const go = (url:string) => {
  window.location.href = url
}

export const goTop = () => {
  window.location.href = '/';
}

export const goError = (msg:string) => {
  console.error(msg);
  window.location.href = ERROR_PAGE_URL;
}
import axios from 'axios';
import { token } from '../config/URL_PARAM';

export function get({ url, timeout = 0 }: { url: string; timeout?: number }) {
  return axios({
    method: 'get',
    timeout,
    url,
  });
}

export function post({
  url,
  data = {},
  timeout = 0,
  headers = {
    'X-BA-TOKEN': token,
  },
}: {
  url: string;
  data?: object;
  timeout?: number;
  headers?: object;
}) {
  return axios({
    data,
    headers,
    method: 'post',
    timeout,
    url,
  });
}

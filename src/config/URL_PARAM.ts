import * as queryString from 'query-string';
import { ISearchOption } from '../types/ISearchOption';

const urlParam = queryString.parse(location.search);

export const {
  mode = window.self === window.top ? 'mvc' : 'spa',
  servicever = '3',
  accepted,
  failed,
  rejected,
  coursetype,
  hadacceped,
  productid,
  culturecode,
  token,
  studentid,
}: ISearchOption = urlParam;

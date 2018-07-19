import { LEGAL_PARAM } from '../config/CONSTANT';
import * as urlParams from '../config/URL_PARAM';
import { errorHandler } from './handler';

function throwParamError() {
  errorHandler('Parameter passing error', true);
}

function dealParams(
  mode = window.self === window.top ? 'mvc' : 'spa',
  servicever = '3',
  accepted: string,
  failed: string,
  rejected: string,
  productid: string | number | void = throwParamError(),
  culturecode: string | void = throwParamError(),
  token: string | void = throwParamError(),
  studentid: string | number | void = throwParamError(),
) {
  if (
    LEGAL_PARAM.SERVICEVER.indexOf(servicever) === -1 ||
    LEGAL_PARAM.MODE.indexOf(mode) === -1 ||
    (mode === 'mvc' && (!accepted || !failed || !rejected))
  ) {
    throwParamError();
  }
}

export function isLocationParamValid(): boolean {
  const { mode, servicever, accepted, failed, rejected, productid, culturecode, token, studentid } = urlParams;

  try {
    dealParams(mode, servicever, accepted!, failed!, rejected!, productid, culturecode, token, studentid);
    return true;
  } catch (error) {
    return false;
  }
}

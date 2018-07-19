import { culturecode, productid } from './URL_PARAM';

let env = '';
let postfix = 'cn';

if (process.env.NODE_ENV === 'development') {
  env = '-qa';
}
if (process.env.NODE_ENV === 'stage') {
  env = '-staging';
}
if (process.env.LANG === 'cn') {
  postfix = 'cn';
}
if (process.env.LANG === 'en') {
  postfix = 'com';
}

const domain = `https://e1svc${env}.ef.${postfix}/api/v2/PrivacyPolicy/`;

export const url = {
  getPrivacyMsgUrl: `${domain}PrivacyPolicyDocuments/?product=${productid}&cultureCode=${culturecode}`,
  postStudentAgreement: `${domain}StudentPrivacyPolicyAgreement/`,
};

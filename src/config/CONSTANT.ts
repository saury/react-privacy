const constant = {
  ACCEPT: 'accepted',
  DELAY: 8000,
  FAIL: 'failed',
  LEGAL_PARAM: {
    MODE: ['spa', 'mvc', 'ios'],
    SERVICEVER: ['3'],
  },
  REJECT: 'rejected',
};

const { ACCEPT, DELAY, FAIL, LEGAL_PARAM, REJECT } = { ...constant };

export { ACCEPT, DELAY, FAIL, LEGAL_PARAM, REJECT };

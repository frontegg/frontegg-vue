import { FronteggAppOptions } from '@frontegg/types';

const fronteggOptions: FronteggAppOptions =
  // @ts-ignore
  window.CYPRESS_CONFIG ||
  ({
    contextOptions: {
      baseUrl: 'https://app-o1uurvajm1on.stg.frontegg.com',
      // baseUrl: process.env.PUBLIC_URL || process.env.REACT_APP_BASE_URL,
      clientId: '9e23d2c9-b45a-4f6a-a879-1418469b1c89', //process.env.REACT_APP_CLIENT_ID,
    },
    entitlementsOptions: {
      enabled: true,
    },
  } as FronteggAppOptions);


export default fronteggOptions;

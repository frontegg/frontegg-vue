import { FronteggAppOptions } from '@frontegg/types';

const fronteggOptions: FronteggAppOptions =
  // @ts-ignore
  window.CYPRESS_CONFIG ||
  ({
    contextOptions: {
      baseUrl: 'https://test.frontegg.com',
      clientId: '8dc80b14-2599-482c-8cb6-29fd3c8d5448',
    },
  } as FronteggAppOptions);


export default fronteggOptions;

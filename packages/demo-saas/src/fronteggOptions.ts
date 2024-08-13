import { FronteggAppOptions } from '@frontegg/types';

const fronteggOptions: FronteggAppOptions =
  // @ts-ignore
  window.CYPRESS_CONFIG ||
  ({
    contextOptions: {
      baseUrl: 'https://auth.davidantoon.me',
      clientId: 'b6adfe4c-d695-4c04-b95f-3ec9fd0c6cca',
    },
  } as FronteggAppOptions);


export default fronteggOptions;

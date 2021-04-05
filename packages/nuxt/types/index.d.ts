import { PluginOptions } from '@frontegg/vue/interfaces';

export * from '@frontegg/vue';

interface NuxtFronteggInstance {

}

interface NuxtFronteggOptions extends Omit<PluginOptions, 'router'> {

}


declare module '@nuxt/vue-app' {
  interface Context {
    $fronteggApp: NuxtFronteggInstance
  }

  interface NuxtAppOptions {
    $fronteggApp: NuxtFronteggInstance
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $fronteggApp: NuxtFronteggInstance
  }

  interface NuxtAppOptions {
    $fronteggApp: NuxtFronteggInstance
  }

  interface Configuration {
    frontegg?: NuxtFronteggOptions;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $fronteggApp: NuxtFronteggInstance
  }
}

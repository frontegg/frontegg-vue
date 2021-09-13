# Frontegg Vue

## How to use

### 1. Install Frontegg Libraries    
  
  Run the following command to Install Frontegg Vue library

```
npm install @frontegg/vue
```

### 2. Configuration 
   
  Add Frontegg use to the main application

```
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { Frontegg } from '@frontegg/vue';

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
});


Vue.use(Frontegg, {
  contextOptions: {
    baseUrl: 'https://app-na8f2nf315s2.stg.frontegg.com',
  },
  // Replace this with your app logo 👇
  headerImage: 'https://assets.frontegg.com/public-frontegg-assets/acme-logo.svg',
  router,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

  Wrap your application on the `fronteggLoaded` attribute to make sure you have the right context

```
<template>
  <div id="app" v-if="fronteggLoaded">
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

```

### 3. Getting the user context  
Frontegg exposes the user context and the authentication state via a global set of mixins and state mappers. You can access the authentication state via the `mapAuthState` as in the following sample:

```
<template>
  <div id="app" v-if="fronteggLoaded">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>
      Logged in as
      {{ this.authState.user ? this.authState.user.email : "Not logged in" }}
    </p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      ...this.mapAuthState(),
    };
  },
};
</script>
```

### 4. Run the App, Signup & Login  

We are all set. Let's run the application and see Frontegg in action.

```
npm run serve
```

Great, Frontegg is now integrated with your app!

Login and logout routes have been added to your app:

Signup screen will be at http://localhost:8080/account/sign-up

Login screen will be at http://localhost:8080/account/login

If you are already logged in, go to http://localhost:8080/account/logout and log out.

Give it a try by now by signing up & logging in.

Give it a try now!
Open http://localhost:8080/account/sign-up and sign up with your first user.

### 5. Frontegg Admin Portal Integration

In order to allow your end users to control the Security Settings, Profile, Team Management and more, the next step will be to embed the Admin Portal into your application.

For admin portal integration we will import the `AdminPortal` from the `@frontegg/vue` package and use it when clicking on the relevant button

```
<template>
  <div id="app" v-if="fronteggLoaded">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>
      Logged in as
      {{ this.authState.user ? this.authState.user.email : "Not logged in" }}
    </p>
    <button v-on:click="showAdminPortal">Open admin portal</button>
  </div>
</template>

<script>
import { AdminPortal } from "@frontegg/vue";

export default {
  name: "App",
  data() {
    return {
      ...this.mapAuthState(),
    };
  },
  methods: {
    showAdminPortal() {
      AdminPortal.show();
    },
  },
};
</script>
```

### 6. Enjoy!

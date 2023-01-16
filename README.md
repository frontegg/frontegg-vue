<div align="center">
<img src="https://fronteggstuff.blob.core.windows.net/frongegg-logos/logo-transparent.png" alt="Frontegg Logo" width="400" height="90">
<h3 align="center">Frontegg Vue</h3>
  <p align="center">
    Frontegg is a web platform where SaaS companies can set up their fully managed, scalable and brand aware - SaaS features and integrate them into their SaaS portals in up to 5 lines of code.
    <br />
</div>

### 1. Install Frontegg Libraries    
  
  Run the following command to Install Frontegg Vue library

```bash
npm install @frontegg/vue
```

### 2. Configuration 
   
  Add Frontegg to the main application.

```js
import { createApp } from "vue";
import App from "./App.vue";
import { Frontegg } from "@frontegg/vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    { name: "HomePage", path: "/", component: App },
  ],
});

const app = createApp(App).use(router);

app.use(Frontegg, {
  contextOptions: {
    baseUrl: "https://[YOUR_SUBDOMAIN].frontegg.com",
    clientId: '[YOUR_CLIENT_ID]'
  },
   authOptions: {
    // keepSessionAlive: true // Uncomment this in order to maintain the session alive
  },
  hostedLoginBox: true,
  router,
});

app.mount("#app");
```

  Wrap your application on the `fronteggLoaded` attribute to make sure you have the right context

```js
<template>
  <div id="app" v-if="fronteggLoaded">
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

```

### 3. Redirect to login  
Sending your non-authenticated users to the login page is available by calling the loginWithRedirect method.
Authenticated users context will have their state mapped as displayed below.

```js
<template>
  <div id="app" v-if="fronteggLoaded">
    <div v-if="authState.user">
      <span>Logged in as: {{ authState.user.name }}</span>
    </div>
    <div>
      <button v-if="authState.user" v-on:click="logout">Logout</button>
      <button v-if="authState.user" v-on:click="showAccessToken">
        What is my access token?
      </button>
      <button v-if="!authState.user" v-on:click="goToLogin">Login</button>
    </div>
  </div>
</template>

<script>
import {
  useFrontegg,
  ContextHolder,
} from "@frontegg/vue";

export default {
  setup() {
    const { fronteggLoaded, authState, loginWithRedirect, useFronteggAuthGuard } = useFrontegg();
   
    useFronteggAuthGuard(); // auto redirects the user to the login page / application
    
    const goToLogin = () => {
      loginWithRedirect();
    };
    
    const logout = () => {
      const baseUrl = ContextHolder.getContext().baseUrl;
      window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
    };
    
    const showAccessToken = () => {
      alert(authState.user.accessToken);
    };
    
    return {
      fronteggLoaded,
      authState,
      goToLogin,
      logout,
      showAccessToken,
    };
  },
};
</script>
```

### 4. Run the App, Signup & Login  

We are all set. Let's run the application and see Frontegg in action.

```bash
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

```js
<template>
  <div id="app" v-if="fronteggLoaded">
    <button v-on:click="showAdminPortal">Open admin portal</button>
  </div>
</template>

<script>
import { AdminPortal } from "@frontegg/vue";

export default {
  setup() {
    const showAdminPortal = () => {
      AdminPortal.show();
    },
    
    return {
      showAdminPortal
    };
  },
};
</script>
```

### 6. Enjoy!

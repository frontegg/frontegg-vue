import { createApp } from "vue";
import App from "../../frontegg-vue/packages/sanity-check/App.vue";
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
        baseUrl: 'https://app-1p3iny7ql1ng.frontegg.com',
        clientId: 'f7094875-fa3b-48ab-b76f-3598095d2780'
    },
    authOptions: {
        // keepSessionAlive: true // Uncomment this in order to maintain the session alive
    },
    hostedLoginBox: true,
    router,
});

app.mount("#app");

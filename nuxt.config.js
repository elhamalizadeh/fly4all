// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css:[
    '~/assets/css/style.css',
   '~/assets/css/index.css',
   '~/assets/css/style-fly-search.css'
  ],

  //  router: {
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       name: 'About', // Note: Use camelCase for the name
  //       path: '/about/:flights', // Define route with parameter
  //       component: resolve(__dirname, 'pages/about.vue')
  //     });
  //   }
  // }


})

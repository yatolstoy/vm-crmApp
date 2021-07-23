import Vue from 'vue'
import Vuelidate from "vuelidate"
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from './utils/message.plugin'
import Loader from '@/components/app/Loader'
import Paginate from 'vuejs-paginate'
import titlePlugin from './utils/title.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(titlePlugin)
Vue.use(VueMeta)
Vue.filter('localize', localizeFilter)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component("Loader", Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyA65FjBvBD4ssfqzOkxq6v5JRNUze4PXTw",
  authDomain: "studycrm-ea69e.firebaseapp.com",
  databaseURL: "https://studycrm-ea69e.firebaseio.com",
  projectId: "studycrm-ea69e",
  storageBucket: "studycrm-ea69e.appspot.com",
  messagingSenderId: "475606671995",
  appId: "1:475606671995:web:ddd65df2b788e3177c78de"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
  app =  new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})

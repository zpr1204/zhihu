// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vuex from 'vuex'
import swiper from './components/swiper/swipe.vue'
import vueRouter from 'vue-router'
import router from './router/router'

Vue.config.productionTip = false
Vue.component(swiper.name, swiper)
Vue.use(vuex)
Vue.use(vueRouter)
const store = new vuex.Store({
    state: {
        num: 1,
        article: {},
        theme: {},
    },
    mutations: {
        changeNum: (state, n) => state.num = n
    }
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
let dom = document.querySelector('.app-view');
router.afterEach((to, from, next) => {
    if (to.path == '/article') {
        dom.scrollTop = 0;
    } else {
        Vue.nextTick(() => {
            if (to.path == '/theme') {
                store.commit('changeNum', location.href.split('=')[1]);
            }
        });
    }
});
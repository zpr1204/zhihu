import Vue from 'vue'
import Router from 'vue-router'
import home from '../view/home'
import article from '../view/article'
import theme from '../view/theme'
Vue.use(Router)
const router = new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: home
    }, {
        path: '/article',
        name: 'article',
        component: article
    }, {
        path: '/theme',
        name: 'theme',
        component: theme
    }, {
        path: '*',
        redirect: '/'
    }]
})
export default router
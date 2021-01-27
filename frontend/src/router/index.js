import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Board from '../views/Board.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Topic from '../views/Topic.vue'
import UpdatePost from '../views/UpdatePost.vue'
import CreateTopic from '../views/CreateTopic.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/board/:id',
        name: 'Board',
        component: Board
    },
    {
        path: '/topic/:id',
        name: 'Topic',
        component: Topic
    },
    {
        path: '/user/:id',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/post/:id',
        name: 'UpdatePost',
        component: UpdatePost,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/create/topic/:id',
        name: 'CreateTopic',
        component: CreateTopic,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            guest: true
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

        if (localStorage.getItem('token') == null) {
            next({
                name: 'Login',
            })
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('token') == null) {
            next();
        } else {
            next({name: 'Home'});
        }
    } else {
        next()
    }
})
export default router

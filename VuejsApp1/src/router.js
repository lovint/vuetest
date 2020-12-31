import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Login',
        component: (resolve) => require(['@/View/Login.vue'], resolve),
        meta: { requireAuth: false }
    },
        {
        path: '/Index',
        name: 'Index',
        component: (resolve) => require(['@/View/Index.vue'], resolve),
        meta: { requireAuth: false }
        },
        {
            path: '/ListIndex',
            name: 'ListIndex',
            component: (resolve) => require(['@/View/ListIndex.vue'], resolve),
            meta: { requireAuth: false }
        },
        {
            path: '/components/JZBUpload',
            name: 'a-upload',
            component: (resolve) => require(['@/components/JZBUpload.vue'], resolve),
            meta: { requireAuth: false }
        },

    ]
});
export default router;

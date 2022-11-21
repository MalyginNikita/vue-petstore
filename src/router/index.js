import Vue from 'vue';
import VueRouter from 'vue-router';
import MyForm from '../components/MyForm.vue';
import MyMain from '../components/MyMain.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'MyMain',
        component: MyMain,
        props: true,
    },
    {
        path: '/form',
        name: 'MyForm',
        component: MyForm,
        props: true,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;

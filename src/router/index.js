import { createRouter, createWebHistory } from 'vue-router';
import PageBuilder from '@/views/PageBuilder.vue';

const routes = [
    {
        path: '/',
        name: 'pageBuilder',
        component: PageBuilder
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;

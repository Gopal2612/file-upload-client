import { createWebHistory, createRouter } from "vue-router";
import Upload from './components/upload.vue';
import List from './components/list.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Upload,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
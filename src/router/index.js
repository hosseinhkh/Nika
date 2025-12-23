import { createRouter, createWebHistory } from "vue-router";
import StartView from "../views/StartView.vue";
import SceneView from "../views/SceneView.vue";
import NotFound from "../views/NotFound.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "start", component: StartView },
    { path: "/s/:id", name: "scene", component: SceneView, props: true },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

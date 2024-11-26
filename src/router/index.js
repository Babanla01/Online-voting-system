import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginPage.vue";
import Registration from "../views/RegistrationPage.vue";
import Results from "../views/ResultPage.vue";
import Votings from "../views/VotingPage.vue";
import Candidates from "../views/CandidatesView.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "register",
    component: Registration,
  },
  {
    path: "/results",
    name: "results",
    component: Results,
  },
  {
    path: "/votings",
    name: "votings",
    component: Votings,
  },
  {
    path: "/candidates/:id",
    name: "candidates",
    component: Candidates,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

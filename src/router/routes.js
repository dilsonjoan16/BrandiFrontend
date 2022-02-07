import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import ModalidadCursos from "@/pages/ModalidadCursos.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";

import TipoCursos from "@/pages/TipoCursos.vue";
import AreaCursos from "@/pages/AreaCursos.vue";
import Cursos from "@/pages/Cursos.vue";

import Login from "@/pages/ingreso/Login";
import Register from "@/pages/ingreso/Register";
import Recovery from "@/pages/ingreso/Recovery";
import Guard from "@/services/auth";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "modalidad-cursos",
        name: "modalidad-cursos",
        component: ModalidadCursos
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "tipo-cursos",
        name: "tipo-cursos",
        component: TipoCursos
      },
      {
        path: "area-cursos",
        name: "area-cursos",
        component: AreaCursos
      },
      {
        path: "cursos",
        name: "cursos",
        component: Cursos
      }
    ],
    beforeEnter: Guard.auth
  },
  { path: "*", component: NotFound },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/recovery", name: "Recovery", component: Recovery },

];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;

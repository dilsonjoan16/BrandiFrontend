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

// <<<<<<< HEAD
import TipoCursos from "@/pages/TipoCursos.vue";
import AreaCursos from "@/pages/AreaCursos.vue";
import Cursos from "@/pages/Cursos.vue";
import Usuarios from "@/pages/Usuarios.vue";

import ModuloModalidadComun from "@/pages/ModuloComun/ModuloModalidadComun.vue";
import ModuloTipoComun from "@/pages/ModuloComun/ModuloTipoComun.vue";
import ModuloAreaComun from "@/pages/ModuloComun/ModuloAreaComun.vue";
import ModuloCursoComun from "@/pages/ModuloComun/ModuloCursoComun.vue";
// =======
import CrearModalidad from "@/pages/modalidad/CrearModalidad.vue";
import EditarModalidad from "@/pages/modalidad/EditarModalidad.vue";

import CrearTipoCurso from "@/pages/tipoCurso/CrearTipoCurso.vue";
import EditarTipoCurso from "@/pages/tipoCurso/EditarTipoCurso.vue";

import CrearAreaCurso from "@/pages/AreaCurso/CrearAreaCurso.vue";
import EditarAreaCurso from "@/pages/AreaCurso/EditarAreaCurso.vue";

import CrearCurso from "@/pages/Curso/CrearCurso.vue";
import EditarCurso from "@/pages/Curso/EditarCurso.vue";

import CrearUsuario from "@/pages/Usuarios/CrearUsuario.vue";
import EditarUsuario from "@/pages/Usuarios/EditarUsuario.vue";

// >>>>>>> 843746fc5bcc7b8a5c2d8390fe583626e389b7d5

import Login from "@/pages/ingreso/Login";
import Register from "@/pages/ingreso/Register";
import Recovery from "@/pages/ingreso/Recovery";
import Guard from "@/services/auth";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    // redirect: "/dashboard",
    children: [
      {
        path: "modalidad-cursos",
        name: "modalidad-cursos",
        component: ModalidadCursos,
        beforeEnter: Guard.rolC
      },
      {
        path: "perfil",
        name: "perfil",
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
        component: TipoCursos,
        beforeEnter: Guard.rolC
      },
      {
        path: "area-cursos",
        name: "area-cursos",
        component: AreaCursos,
        beforeEnter: Guard.rolC
      },
      {
        path: "cursos",
        name: "cursos",
        component: Cursos,
        beforeEnter: Guard.rolC
      },
      {
        path: "usuarios",
        name: "usuarios",
        component: Usuarios,
        beforeEnter: Guard.rolC
      },
      {
        path: "crear-modalidad",
        name: "CrearModalidad",
        component: CrearModalidad,
        beforeEnter: Guard.rolC
      },
      {
        path: "editar-modalidad",
        name: "EditarModalidad",
        component: EditarModalidad,
        beforeEnter: Guard.rolC
      },
      {
        path: "crear-tipocurso",
        name: "CrearTipoCurso",
        component: CrearTipoCurso,
        beforeEnter: Guard.rolC
      },
      {
        path: "editar-tipocurso",
        name: "EditarTipoCurso",
        component: EditarTipoCurso,
        beforeEnter: Guard.rolC
      },
      {
        path: "crear-areacurso",
        name: "CrearAreaCurso",
        component: CrearAreaCurso,
        beforeEnter: Guard.rolC
      },
      {
        path: "editar-areacurso",
        name: "EditarAreaCurso",
        component: EditarAreaCurso,
        beforeEnter: Guard.rolC
      },
      {
        path: "crear-curso",
        name: "CrearCurso",
        component: CrearCurso,
        beforeEnter: Guard.rolC
      },
      {
        path: "editar-curso",
        name: "EditarCurso",
        component: EditarCurso,
        beforeEnter: Guard.rolC
      },
      {
        path: "crear-usuario",
        name: "CrearUsuario",
        component: CrearUsuario,
        beforeEnter: Guard.rolC
      },
      {
        path: "editar-usuario",
        name: "EditarUsuario",
        component: EditarUsuario,
        beforeEnter: Guard.rolC
      },
      {
        path: "modulo-modalidad-comun",
        name: "ModuloModalidadComun",
        component: ModuloModalidadComun,
        beforeEnter: Guard.rolA
      },
      {
        path: "modulo-tipo-comun",
        name: "ModuloTipoComun",
        component: ModuloTipoComun,
        beforeEnter: Guard.rolA
      },
      {
        path: "modulo-area-comun",
        name: "ModuloAreaComun",
        component: ModuloAreaComun,
        beforeEnter: Guard.rolA
      },
      {
        path: "modulo-curso-comun",
        name: "ModuloCursoComun",
        component: ModuloCursoComun,
        beforeEnter: Guard.rolA
      },

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

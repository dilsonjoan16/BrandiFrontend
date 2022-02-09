<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links" v-if="admin">
        <sidebar-link to="/modalidad-cursos" name="Modalidad de Cursos" icon="ti-receipt"/>
        <sidebar-link to="/tipo-cursos" name="Tipo de Cursos" icon="ti-folder"/>
        <sidebar-link to="/area-cursos" name="Area de Cursos" icon="ti-agenda"/>
        <sidebar-link to="/cursos" name="Cursos" icon="ti-write"/>
        <sidebar-link to="/usuarios" name="Usuarios" icon="ti-user"/>
         <!-- <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt"/> -->
        <!-- <sidebar-link to="/typography" name="Typography" icon="ti-text"/> -->
        <!-- <sidebar-link to="/maps" name="Map" icon="ti-map"/> -->
        <!-- <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2"/> -->
        <!-- <sidebar-link to="/notifications" name="Notifications" icon="ti-bell"/> -->
        <!-- <sidebar-link to="/crear-modalidad" name="Crear Modalidad" icon="ti-pencil-alt2"/>
        <sidebar-link to="/editar-modalidad" name="Editar Modalidad" icon="ti-pencil-alt2"/>
        <sidebar-link to="/crear-tipocurso" name="Crear tipo de Curso" icon="ti-pencil-alt2"/>
        <sidebar-link to="/editar-tipocurso" name="Editar tipo de Curso" icon="ti-pencil-alt2"/>

        <sidebar-link to="/crear-areacurso" name="Crear Area de Curso" icon="ti-pencil-alt2"/>
        <sidebar-link to="/editar-areacurso" name="Editar Area de Curso" icon="ti-pencil-alt2"/>

        <sidebar-link to="/crear-curso" name="Crear Curso" icon="ti-pencil-alt2"/>
        <sidebar-link to="/editar-curso" name="Editar Curso" icon="ti-pencil-alt2"/> -->

      </template>
      <template slot="links" v-if="comun">
        <sidebar-link to="/" name="Modalidad de Cursos" icon="ti-receipt"/>
      </template>
      <!-- //////////////////////////////////////////////////////////////////////////////// -->
      <mobile-menu>
        <li class="nav-item" v-on:click.prevent="logout">
          <a class="nav-link">
            <i class="ti-hand-point-left"></i>
            <p>Logout</p>
          </a>
        </li>
        <!-- <drop-down class="nav-item"
                   title="5 Notifications"
                   title-classes="nav-link"
                   icon="ti-bell">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down> -->
        <li class="nav-item">
          <router-link to="/stats" class="nav-link">
            <i class="ti-user"></i>
            <p>Perfil</p>
          </router-link>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  data(){
    return{
      admin: null,
      comun: null,
      id: localStorage.getItem('us'),
      token: localStorage.getItem('user_token')
    }
  },
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  mounted(){
    this.User()
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    async User(){
      let response = await this.axios.get(`http://127.0.0.1:8000/api/auth/perfil/${this.id}`,{
        headers:{
          'Authorization': `Bearer ${this.token}`
        }
      })
      console.log(response.data)
      if (response.data.usuario.rol == "Admin") {
        this.admin = true
        this.comun = false
      } else {
        if (response.data.usuario.rol == "Comun") {
          this.admin = false
          this.comun = true
        }
      }
    },
    async logout() {
      localStorage.removeItem('user_token');
      localStorage.removeItem('cod');
      localStorage.removeItem('us')
      localStorage.removeItem('ref');
      this.$swal('Salida del sistema exitosa!', 'Usuario deslogueado con exito!', 'OK');
      this.$router.push("/login");
    }
  }
};
</script>

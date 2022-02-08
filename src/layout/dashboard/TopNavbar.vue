<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <form @submit.stop.prevent="logout">
            <button class="nav-link btn btn-link" type="submit">
              <i class="ti-arrow-circle-left"></i>
              <p>Logout</p>
            </button>
            </form>
          </li>
          <!-- <drop-down class="nav-item"
                     title="5 Notifications"
                     title-classes="nav-link"
                     icon="ti-bell">
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down> -->
          <li class="nav-item">
            <router-link to="/perfil" class="nav-link">
              <i class="ti-user"></i>
              <p>
                Perfil
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </div></nav>
</template>
<script>
import axios from 'axios';

export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      token: localStorage.getItem('user_token')
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    async logout() {
      localStorage.removeItem('user_token');
      localStorage.removeItem('cod');
      localStorage.removeItem('us')
      localStorage.removeItem('ref');
      this.$swal('Salida del sistema exitosa!', 'Usuario deslogueado con exito!', 'OK');
      this.$router.push("/login");

      // try {
      //   let response = await axios.post(`http://127.0.0.1:8000/auth/logout`, {
      //   headers: {
      //   'Authorization': `Bearer ${this.token}`
      // }
      //   })
      //   if (response.status == 200) {
      //     this.$swal('Salida del sistema exitosa!', 'Usuario deslogueado con exito!', 'OK');
      //       this.$router.push('/login');
      //   } else {
      //     this.$swal({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Ocurrio un error al momento de salir de sistema! Intentelo nuevamente',
      //     })
      //   }
      // } catch (error) {
      //   this.$swal({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Ocurrio un error al momento de salir de sistema! Intentelo nuevamente',
      //     })
      // }
    }
  }
};
</script>
<style>
</style>

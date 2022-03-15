<template>
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-7 col-md-6">
        <card class="card" title="Crear Usuario">
            <div>
              <form class="form" @submit.stop.prevent="CrearModalidad">

                <div class="row">
                  <div class="col-md-12">
                    <fg-input type="text"
                              label="Nombre del Usuario"
                              placeholder="Nombre"
                              v-model="user.name"
                              id="inputNombre"
                              autocomplete="off">
                    </fg-input>
                  </div>
                </div>

                 <div class="row">
                  <div class="col-md-12">
                    <label for="email">Email del Usuario</label>
                    <input type="email"
                      name="email"
                      id="email"
                      v-model="user.email"
                      autocomplete="off"
                      class="form-control"
                      placeholder="Email"
                      required>
                  </div>
                </div>

                 <div class="row">
                  <div class="col-md-12">
                    <label for="password">Password del Usuario</label>
                    <input type="password"
                      name="password"
                      id="password"
                      minlength="6"
                      maxlength="12"
                      v-model="user.password"
                      autocomplete="off"
                      class="form-control"
                      placeholder="Password">
                  </div>
                </div>

                 <div class="row">
                  <div class="col-md-12">
                    <label for="rol">Rol del Usuario</label>
                    <select name="rol" id="rol" v-model="user.rol" class="form-control">
                      <option disabled value="">Seleccione algun Rol</option>
                      <option value="Admin">Administrador</option>
                      <option value="Comun">Comun</option>
                    </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                     <label for="estado">Estado del Usuario</label>
                    <select name="estado" id="estado" v-model="user.estado" class="form-control">
                      <option disabled value="">Seleccione algun Estado</option>
                      <option value="ACTIVO">Activo</option>
                      <option value="INACTIVO">Inactivo</option>
                    </select>
                  </div>
                </div>

                <div class="text-center">
                  <button class="btn btn-outline-secondary" type="submit" v-if="loader2">crear</button>
                </div>
                <div class="spinner my-auto mx-auto" v-if="loader"></div>
              </form>
            </div>
        </card>
      </div>
    </div>
</template>

<script>
  export default {
  name: 'CrearUsuario',

  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        rol: '',
        estado: '',
      },
      loader: null,
      loader2: true
    }
  },
  methods: {
    async CrearModalidad() {

      this.loader = true
      this.loader2 = false

      const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('user_token'),
            }
      };
      const regla2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;
      if (regla2.test(this.user.password)) {
        await this.axios.post('https://branditechnology.herokuapp.com/api/auth/usuario/crear',this.user, config)
        .then(response => {
          this.user.name = ''
          this.user.email = ''
          this.user.password = ''
          this.user.rol = ''
          this.user.estado = ''
          this.loader = false
          this.loader2 = true
          this.$swal({
                icon: 'success',
                title: 'Creacion exitosa!',
                text: 'Usuario creado con exito!',
          });
          this.$router.push('/usuarios');
        })
        .catch(error => {
          this.loader = false
          this.loader2 = true
          this.$swal({
                title: 'Ocurrio un error!',
                text: 'Valide la informacion suministrada nuevamente!',
                icon: 'info'
          })
        });
      } else {
        this.loader = false
          this.loader2 = true
          this.$swal({
          icon: 'error',
          title: 'Oops... Valida el password!',
          text: 'El formato correcto del password debe ser minimo 6 y maximo 12 caracteres, debe poseer 1 Mayuscula, 1 minuscula, 1 numero y 1 caracter especial como minimo respectivamente!',
          })
      }
    }
  }
};
</script>

<style scoped>

.spinner {
  border: 4px solid #ffffff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #212120;

  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

</style>

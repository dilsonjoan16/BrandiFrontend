<template>
  <div class="row justify-content-center">
    <div class="col-xl-8 col-lg-7 col-md-6">
      <card class="card" title="Editar Usuario">
          <div>
            <form class="form" @submit.stop.prevent="updateProfile">

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
                      >
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
                      <option disabled value="">Rol Actual {{user.rol}}</option>
                      <option value="Admin">Administrador</option>
                      <option value="Comun">Comun</option>
                    </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                     <label for="estado">Estado del Usuario</label>
                    <select name="estado" id="estado" v-model="user.estado" class="form-control">
                      <option disabled value="">Estado Actual {{user.estado}}</option>
                      <option value="ACTIVO">Activo</option>
                      <option value="INACTIVO">Inactivo</option>
                    </select>
                  </div>
                </div>

              <div class="text-center">
                <button class="btn btn-outline-secondary" type="submit" v-if="loader2">Editar</button>
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
  name: 'EditarUsuario',

  data() {
    return {
      id: localStorage.getItem('ref'),
      token: localStorage.getItem('user_token'),
      user: {
        name:'',
        email:'',
        password:'',
        rol:'',
        estado:''
      },
      loader: null,
      loader2: true
    }
  },

  mounted() {
    this.MostrarUsuario()
  },

  methods: {
    async MostrarUsuario()
    {
      let response = await this.axios.get(`http://127.0.0.1:8000/api/auth/perfil/${this.id}`,{
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      console.log(response.data.usuario);
      this.user.name = response.data.usuario.name
      this.user.email = response.data.usuario.email
      this.user.rol = response.data.usuario.rol
      this.user.estado = response.data.usuario.estado
    },

    async updateProfile() {
      console.log(this.user);
      this.loader = true
      this.loader2 = false

      const regla2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;
      if (this.user.password == "" || this.user.password == null) {

        try {
          console.log(this.user);
          let response = await this.axios.put(`http://127.0.0.1:8000/api/auth/usuario/modificar/admin/${this.id}`,this.user,{
          headers:{
          "Authorization": `Bearer ${this.token}`
          }
        })
        // console.log(response.data);
        this.$swal({
              icon: 'success',
              title: 'Modificacion exitosa!',
              text: 'Perfil de usuario modificado con exito!',
        });
        this.$router.push('/usuarios')
        this.loader = false
        this.loader2 = true
        } catch (error) {
          this.$swal({
          icon: 'info',
          title: 'Oops...',
          text: 'Ocurrio un error, valida la informacion nuevamente!',
          })
          this.loader = false
          this.loader2 = true
        }
      }else{

        if (regla2.test(this.user.password)) {
          try {
          let response = await this.axios.put(`http://127.0.0.1:8000/api/auth/usuario/modificar/admin/${this.id}`,this.user,{
          headers:{
          "Authorization": `Bearer ${this.token}`
          }
        })
        console.log(response.data);
        this.$swal({
              icon: 'success',
              title: 'Modificacion exitosa!',
              text: 'Perfil de usuario modificado con exito!',
        });
        this.loader = false
        this.loader2 = true
          } catch (error) {
            this.$swal({
          icon: 'info',
          title: 'Oops...',
          text: 'Ocurrio un error, valida la informacion nuevamente!',
          })
          this.loader = false
          this.loader2 = true
        }
      }
       else {
        this.$swal({
          icon: 'error',
          title: 'Oops... Valida el password!',
          text: 'El formato correcto del password debe ser minimo 6 y maximo 12 caracteres, debe poseer 1 Mayuscula, 1 minuscula, 1 numero y 1 caracter especial como minimo respectivamente!',
          })
          this.loader = false
          this.loader2 = true
        }
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

<template>
  <card class="card" title="Edit Profile">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-12 col-lg-10 mx-auto">
            <fg-input type="text"
                      label="Rol del usuario"
                      :disabled="true"
                      placeholder="Rol"
                      v-model="user.rol">
            </fg-input>
          </div>
          <br>
          <!-- <div class="col-md-3">

            <fg-input type="text"
                      label="Username"
                      placeholder="Username"
                      v-model="user.username">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="email"
                      label="Username"
                      placeholder="Email"
                      v-model="user.email">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="First Name"
                      placeholder="First Name"
                      v-model="user.firstName">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      v-model="user.lastName">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="Address"
                      placeholder="Home Address"
                      v-model="user.address">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="City"
                      placeholder="City"
                      v-model="user.city">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Country"
                      placeholder="Country"
                      v-model="user.country">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="number"
                      label="Postal Code"
                      placeholder="ZIP Code"
                      v-model="user.postalCode">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>About Me</label>
              <textarea rows="5" class="form-control border-input"
                        placeholder="Here can be your description"
                        v-model="user.aboutMe">

              </textarea>
            </div>
          </div>
        </div> -->
          <div class="col-md-12 col-lg-10 mx-auto">
            <fg-input type="text"
                      label="Nombre del usuario"
                      placeholder="Nombre"
                      v-model="user.name">
            </fg-input>
          </div>
        <br>
          <div class="col-md-12 col-lg-10 mx-auto">
            <fg-input type="text"
                      label="Correo electronico"
                      placeholder="Correo"
                      v-model="user.email">
            </fg-input>
          </div>
        <br>
          <div class="col-md-12 col-lg-10 mx-auto">
            <label for="password">
              Password del usuario
            </label>
            <input class="form-control"
                   type="password"
                   name="password"
                   id="password"
                   minlength="6"
                   maxlength="12"
                   placeholder="Password"
                   v-model="user.password">
          </div>
        <br>
        <!-- <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="Rol del usuario"
                      placeholder="Rol"
                      v-model="user.rol">
            </fg-input>
          </div>
        </div> -->
          <div class="col-md-12 col-lg-10 mx-auto">
            <label for="estado">Estado del usuario</label>
            <select  v-model="user.estado" name="estado" id="estado" class="form-control">
              <option disabled value="">Estado Actual {{user.estado}}</option>
              <option value="">ACTIVO</option>
              <option value="">INACTIVO</option>
            </select>
          </div>
        <br>
      </div>
        <div class="text-center">
          <p-button type="outline-secondary"
                    round
                    v-if="loader2"
                    @click.native.prevent="updateProfile">
            Modificar Perfil
          </p-button>
          <div class="spinner my-auto mx-auto" v-if="loader"></div>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      token: localStorage.getItem('user_token'),
      id: localStorage.getItem('us'),
      loader:null,
      loader2:true,
      user: {
        name:'',
        email:'',
        password:'',
        rol:'',
        estado:''
      }
    };
  },
  mounted(){
    this.usuario()
  },
  methods: {
    async usuario(){
      let response = await this.axios.get(`http://127.0.0.1:8000/api/auth/perfil/${this.id}`,{
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      this.user.name = response.data.usuario.name
      this.user.email = response.data.usuario.email
      this.user.rol = response.data.usuario.rol
      this.user.estado = response.data.usuario.estado
      // console.log(response.data.usuario);

    },
    async updateProfile() {
      // console.log(this.user);
      this.loader = true
      this.loader2 = false

      const regla2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;
      if (this.user.password == "" || this.user.password == null) {

        try {
          console.log(this.user);
          let response = await this.axios.put(`http://127.0.0.1:8000/api/auth/usuario/modificar/${this.id}`,this.user,{
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
      }else{

        if (regla2.test(this.user.password)) {
          try {
          let response = await this.axios.put(`http://127.0.0.1:8000/api/auth/usuario/modificar/${this.id}`,this.user,{
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
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #333333;

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

<template>
<div class="contenedor">
 	<form class="form-signin my-auto mx-auto" @submit.stop.prevent="submit">
    <div class="container p-4">
      <h1 class="h3 mb-3 font-weight-normal text-center"></h1>

      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="login.email" type="email" id="inputEmail" class="form-control text-white" placeholder="Ingrese el email" maxlength="100" required autocomplete="off" autofocus>

      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="login.password" type="password" id="inputPassword" class="form-control text-white" placeholder="Ingrese el password" minlength="6" maxlength="12" autocomplete="off" required>

      <p v-if="error" class="error">Has introducido mal el email o la contraseña.</p>

      <button class="btn btn-lg btn-outline-light btn-block" type="submit" v-if="loader2">Ingresar</button>
      <br>
      <hr>
    <div class="spinner my-auto mx-auto" v-if="loader"></div>
      <router-link to="/register" v-if="loader2" class="text-white" id="link">
        Registrarme
      </router-link>
      <br>
      <router-link to="/recovery" v-if="loader2" class="text-white" id="link">
        Olvido de password
      </router-link>
     </div>
    </form>
</div>
</template>

<script>
	export default {
		name: 'Login',

		data() {
			return {
				login: {
					email: '',
					password: '',
				},
				error: false,
        loader:null,
        loader2:true
			}
		},

		// created() {
		// 	localStorage.removeItem('user_token');
		// },

		methods: {
			async submit() {
        this.loader = true
        this.loader2 = false

          await this.axios.post(`http://127.0.0.1:8000/api/auth/login`, this.login)
          .then(response => {
            localStorage.setItem('user_token', response.data.token.access_token);
            if (response.data.usuario.rol == "Admin") {
              this.$router.push('/modalidad-cursos');
            } else {
              // this.$router.push('/')
            }
          })
          .catch(error => {
            this.loader = false
            this.loader2 = true
            this.error = true;
          })

          // this.register.password = ''
          // this.loader = false
          // this.loader2 = true
          // this.$swal({
          // icon: 'error',
          // title: 'Oops... Valida el password!',
          // text: 'El formato correcto del password debe ser minimo 6 y maximo 12 caracteres, debe poseer 1 Mayuscula, 1 minuscula, 1 numero y 1 caracter especial como minimo respectivamente!',
          // })

			},
		},
	};
</script>

<style>
	.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.contenedor{
background: #ff00cc;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #333399, #ff00cc);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #333399, #ff00cc); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
height: 100vh;
width: 100%;
}
.container{
  margin-top: 50%;
  margin-bottom: 50%;
  /* border-width: 15px;
  border-radius: 30px; */
}
#inputEmail{
background: none;
}
#inputEmail::placeholder{
  color:white;
}
#inputPassword{
background: none;
}
#inputPassword::placeholder{
  color:white;
}
#link{
  text-decoration: none;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #ff00cc;

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

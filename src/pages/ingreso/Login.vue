<template>
 	<form class="form-signin" @submit.stop.prevent="submit">
      <h1 class="h3 mb-3 font-weight-normal text-center">Please sign in</h1>

      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="login.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>

      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="login.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>

      <p v-if="error" class="error">Has introducido mal el email o la contraseña.</p>

      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
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
				error: false
			}
		},

		// created() {
		// 	localStorage.removeItem('user_token');
		// },

		methods: {
			async submit() {
				await this.axios.post(`http://127.0.0.1:8000/api/auth/login`, this.login)
				.then(response => {
					localStorage.setItem('user_token', response.data.access_token);
					this.$router.push('/dashboard'); 
				})
				.catch(error => {
					this.error = true;
				})
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
</style>

<template>
	<form class="form-signin" @submit.stop.prevent="submit">
      <h1 class="h3 mb-3 font-weight-normal text-center">Please sign up</h1>

      <label for="inputText" class="sr-only">User Name</label>
      <input v-model="register.name" type="text" id="inputUser" class="form-control" placeholder="User Name" required autofocus>

      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="register.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>

      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="register.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>

      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
</template>

<script>
	export default{
		name: 'Register',

		data() {
			return {
				register: {
					name: '',
					email: '',
					password: '',
				}
			}
		},

		methods: {
			async submit() {
				await this.axios.post(`http://127.0.0.1:8000/api/auth/register`, this.register)
				.then(response => {
					// this.$swal('!Usuario Registrado!');
					this.$router.push('/login'); 
				})
				.catch(error => {
					console.log(error);
				})
			},
		},
	};
</script>

<style>
	
</style>
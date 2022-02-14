export default {
	auth(to, from, next) {
		const token = localStorage.getItem('user_token');
		if(!token){
			next('/login');
		}
		next();
	},

	rolC(to, from, next) {
		const rol = localStorage.getItem('rol');
		if(rol == "Comun"){
			next('/modulo-modalidad-comun');
		} 
		next();
	},

	rolA(to, from, next) {
		const rol = localStorage.getItem('rol');
		if(rol == "Admin"){
			next('/modalidad-cursos');
		} 
		next();
	}
}
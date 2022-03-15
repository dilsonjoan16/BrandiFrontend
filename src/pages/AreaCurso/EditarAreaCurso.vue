<template>
  <div class="row justify-content-center">
    <div class="col-xl-8 col-lg-7 col-md-6">
      <card class="card" title="Editar Area de Curso">
          <div>
            <form class="form" @submit.stop.prevent="EditarAreaCurso">

                <div class="row">
                  <div class="col-md-12">
                    <fg-input type="text"
                              label="Nombre del Area de Curso"
                              placeholder="Nombre"
                              v-model="area.nombre"
                              id="inputNombre">
                    </fg-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <label for="Estado">Estado del Area de Curso</label>
                    <select
                      name="Estado"
                      id="Estado"
                      class="form-control"
                      v-model="area.estado">
                      <option disabled value="">Seleccione algun Estado</option>
                      <option value="ACTIVO">Activo</option>
                      <option value="INACTIVO">Inactivo</option>
                      </select>
                  </div>
                </div>

              <div class="row">
                  <div class="col-md-12">
                    <label for="tipo">Tipo del Curso</label>
                     <select
                        name="tipo"
                        id="tipo"
                        class="form-control"
                        required
                        v-model="area.tipo_id"
                      >
                        <option disabled value="">{{tipoCursoActual}}</option>
                        <option v-for="t in tipoCursos" :key="t.id" v-bind:value="t.id">{{
                          t.nombre
                        }}</option>
                      </select>
                  </div>
                </div>

              <div class="text-center">
                <button class="btn btn-outline-secondary" type="submit" v-if="loader2">editar</button>
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
  name: 'EditarAreaCurso',

  data() {
    return {
      token: localStorage.getItem('user_token'),
      id: localStorage.getItem('ref'),
      tipoCursos:[],
      tipoCursoActual: null,
      area: {
        tipo_id: Number,
        nombre: '',
        estado: '',
      },
      loader: null,
      loader2: true
    }
  },

  mounted() {
    this.MostrarAreaCurso()
    this.TipoCursos()
  },

  methods: {
    async TipoCursos(){
      let response = await this.axios.get(`https://branditechnology.herokuapp.com/api/auth/tipo/cursos`, {
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      // console.log(response.data);
      this.tipoCursos = response.data.tipoActivo
    },

    //funcion para mostrar en la vista los datos del area de curso
    async MostrarAreaCurso() {
      //hay que pasarle la ruta con get
      await this.axios.get(`https://branditechnology.herokuapp.com/api/auth/area/cursos/ver/${this.id}`,{
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      .then(response => {
        const {tipo_id,nombre,estado} = response.data.area
        this.area.tipo_id = tipo_id
        this.area.nombre = nombre
        this.area.estado = estado
        this.tipoCursoActual = response.data.area.tipo_de_curso.nombre
      })
      .catch(error => {
        console.log(error)
      })
    },

    //actualizar area
    async EditarAreaCurso() {
      this.loader = true
      this.loader2 = false

      const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('user_token'),
            }
      };

      //hay que pasarle la ruta con el id
      await this.axios.put(`https://branditechnology.herokuapp.com/api/auth/area/cursos/modificar/${this.id}`,this.area, config)
      .then(response => {
        this.loader = false
        this.loader2 = true
        this.$router.push('/area-cursos')
        localStorage.removeItem('ref')
        this.$swal({
              icon: 'success',
              title: 'Modificacion exitosa!',
              text: 'Area de Curso modificada con exito!',
        });
      })
      .catch(error => {
        this.loader = false
        this.loader2 = true
        this.$swal({
              title: 'Ocurrio un error!',
              text: 'Valide la informacion suministrada nuevamente!',
              icon: 'info'
        })
      })
    }
  }

};
</script>

<style>
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

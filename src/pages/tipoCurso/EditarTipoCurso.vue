<template>
  <div class="row justify-content-center">
    <div class="col-xl-8 col-lg-7 col-md-6">
      <card class="card" title="Editar Tipo de Curso">
          <div>
            <form class="form" @submit.stop.prevent="EditarTipoCurso">

                <div class="row">
                  <div class="col-md-12">
                    <fg-input type="text"
                              label="Nombre del Tipo de Curso"
                              placeholder="Nombre"
                              v-model="tipo.nombre"
                              id="inputNombre">
                    </fg-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <label for="Estado">Estado del Tipo de Curso</label>
                    <select
                      name="Estado"
                      id="Estado"
                      class="form-control"
                      v-model="tipo.estado">
                      <option disabled value="">Seleccione algun Estado</option>
                      <option value="ACTIVO">Activo</option>
                      <option value="INACTIVO">Inactivo</option>
                      </select>
                  </div>
                </div>

              <div class="row">
                  <div class="col-md-12">
                    <label for="modalidad">Modalidad del Curso</label>
                     <select
                        name="modalidad"
                        id="modalidad"
                        class="form-control"
                        required
                        v-model="tipo.modalidad_id"
                      >
                        <option disabled value="">{{modalidadActual}}</option>
                        <option v-for="m in modalidad" :key="m.id" v-bind:value="m.id">{{
                          m.nombre
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
  name: 'EditarTipoCurso',

  data() {
    return {
      token: localStorage.getItem('user_token'),
      id: localStorage.getItem('ref'),
      modalidad:[],
      modalidadActual: null,
      tipo: {
        modalidad_id: Number,
        nombre: '',
        estado: '',
      },
      loader: null,
      loader2: true
    }
  },

  mounted() {
    this.MostrarTipoCurso()
    this.ModalidadCursos()
  },

  methods: {

    async ModalidadCursos(){
      let response = await this.axios.get(`https://branditechnology.herokuapp.com/api/auth/modalidad/cursos`, {
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      // console.log(response.data);
      this.modalidad = response.data.modalidadActiva
    },

    //funcion para mostrar en la vista los datos del tipo de curso
    async MostrarTipoCurso() {
      //hay que pasarle la ruta con get
      await this.axios.get(`https://branditechnology.herokuapp.com/api/auth/tipo/cursos/ver/${this.id}`,{
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      .then(response => {
        const {modalidad_id,nombre,estado} = response.data.tipo
        this.tipo.modalidad_id = modalidad_id
        this.tipo.nombre = nombre
        this.tipo.estado = estado
        this.modalidadActual = response.data.tipo.modalidad_de_curso.nombre
      })
      .catch(error => {
        console.log(error)
      })
    },

    //actualizar tipo
    async EditarTipoCurso() {
      this.loader = true
      this.loader2 = false

      const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('user_token'),
            }
      };

      //hay que pasarle la ruta con el id
      await this.axios.put(`https://branditechnology.herokuapp.com/api/auth/tipo/cursos/modificar/${this.id}`,this.tipo, config)
      .then(response => {
        this.loader = false
        this.loader2 = true
        this.$swal({
              icon: 'success',
              title: 'Modificacion exitosa!',
              text: 'Tipo de Curso modificado con exito!',
        });
        this.$router.push('/tipo-cursos')
        localStorage.removeItem('ref')
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

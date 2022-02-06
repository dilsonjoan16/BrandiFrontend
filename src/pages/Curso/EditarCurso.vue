<template>
  <div class="row justify-content-center">
    <div class="col-xl-8 col-lg-7 col-md-6">
      <card class="card" title="Editar Curso">
          <div>
            <form class="form" @submit.stop.prevent="EditarCurso">

              <div class="row">
                  <div class="col-md-12">
                    <fg-input type="number"
                              label="Id de Area de Curso"
                              placeholder="Id"
                              v-model="curso.area_id"
                              id="inputModalidad">
                    </fg-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <fg-input type="text"
                              label="Nombre del Curso"
                              placeholder="Nombre"
                              v-model="curso.nombre"
                              id="inputNombre">
                    </fg-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <fg-input type="text"
                              label="Estado del Curso"
                              placeholder="Estado"
                              v-model="curso.estado"
                              id="inputEstado">
                    </fg-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <fg-input type="number"
                              label="Duracion del Curso"
                              placeholder="Estado"
                              v-model="curso.duracion"
                              id="inputEstado">
                    </fg-input>
                  </div>
                </div>

              <div class="text-center">
                <button class="btn btn-info" type="submit" v-if="loader2">guardar</button>
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
  name: 'EditarCurso',  

  data() {
    return {
      curso: {
        area_id: '',
        nombre: '',
        estado: '',
        duracion: ''
      },
      loader: null,
      loader2: true
    }
  },

  mounted() {
    this.MostrarCurso()
  },

  methods: {
    //funcion para mostrar en la vista los datos del curso
    async MostrarCurso() {
      //hay que pasarle la ruta con get
      await this.axios.get()
      .then(response => {
        const {area_id,nombre,estado,duracion} = response.data
        this.curso.area_id = tipo_id
        this.curso.nombre = nombre
        this.curso.estado = estado
        this.curso.duracion = duracion
      })
      .catch(error => {
        console.log(error)
      })
    },

    //actualizar curso
    async EditarCurso() {
      this.loader = true
      this.loader2 = false

      const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('user_token'),
            }
      };

      //hay que pasarle la ruta con el id
      await this.axios.put('',this.curso, config)
      .then(response => {
        this.loader = false
        this.loader2 = true
        this.$swal({
              icon: 'success',
              title: 'Modificacion exitosa!',
              text: 'Curso modificado con exito!',
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
  border: 4px solid #75c7ff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #75c7ff;

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
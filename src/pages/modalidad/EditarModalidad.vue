<template>
  <div class="row justify-content-center">
    <div class="col-xl-8 col-lg-7 col-md-6">
      <card class="card" title="Editar Modalidad">
          <div>
            <form class="form" @submit.stop.prevent="EditarModalidad">

              <div class="row">
                <div class="col-md-12">
                  <fg-input type="text"
                            label="Nombre de Modalidad"
                            placeholder="Nombre"
                            v-model="modalidad.nombre"
                            id="inputNombre">
                  </fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <fg-input type="text"
                            label="Estado de Modalidad"
                            placeholder="Estado"
                            v-model="modalidad.estado"
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
  name: 'EditarModalidad',  

  data() {
    return {
      modalidad: {
        nombre: '',
        estado: '',
      },
      loader: null,
      loader2: true
    }
  },

  mounted() {
    this.MostrarModalidad()
  },

  methods: {
    //funcion para mostrar en la vista los datos de la modalidad
    async MostrarModalidad() {
      //hay que pasarle la ruta con get
      await this.axios.get()
      .then(response => {
        const {nombre,estado} = response.data
        this.modalidad.nombre = nombre
        this.modalidad.estado = estado
      })
      .catch(error => {
        console.log(error)
      })
    },

    //actualizar modalidad
    async EditarModalidad() {
      this.loader = true
      this.loader2 = false

      const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('user_token'),
            }
      };

      //hay que pasarle la ruta con el id
      await this.axios.put('',this.modalidad, config)
      .then(response => {
        this.loader = false
        this.loader2 = true
        this.$swal({
              icon: 'success',
              title: 'Modificacion exitosa!',
              text: 'Modalidad modificada con exito!',
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
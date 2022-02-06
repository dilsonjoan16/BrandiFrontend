<template>
  <div class="row justify-content-center">
    <div class="col-xl-8 col-lg-7 col-md-6">
      <card class="card" title="Editar Area de Curso">
          <div>
            <form class="form" @submit.stop.prevent="EditarAreaCurso">

              <div class="row">
                  <div class="col-md-12">
                    <fg-input type="number"
                              label="Id de Tipo de Curso"
                              placeholder="Id"
                              v-model="area.tipo_id"
                              id="inputModalidad">
                    </fg-input>
                  </div>
                </div>

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
                    <fg-input type="text"
                              label="Estado del Area de Curso"
                              placeholder="Estado"
                              v-model="area.estado"
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
  name: 'EditarAreaCurso',  

  data() {
    return {
      area: {
        tipo_id: '',
        nombre: '',
        estado: '',
      },
      loader: null,
      loader2: true
    }
  },

  mounted() {
    this.MostrarAreaCurso()
  },

  methods: {
    //funcion para mostrar en la vista los datos del area de curso
    async MostrarAreaCurso() {
      //hay que pasarle la ruta con get
      await this.axios.get()
      .then(response => {
        const {tipo_id,nombre,estado} = response.data
        this.area.tipo_id = tipo_id
        this.area.nombre = nombre
        this.area.estado = estado
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
      await this.axios.put('',this.area, config)
      .then(response => {
        this.loader = false
        this.loader2 = true
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
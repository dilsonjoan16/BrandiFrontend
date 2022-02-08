<template>
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-7 col-md-6">
        <card class="card" title="Crear Modalidad">
            <div>
              <form class="form" @submit.stop.prevent="CrearModalidad">

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
                  <button class="btn btn-outline-secondary" type="submit" v-if="loader2">crear</button>
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
  name: 'CrearModalidad',

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
  methods: {
    async CrearModalidad() {

      this.loader = true
      this.loader2 = false

      const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('user_token'),
            }
      };

      await this.axios.post('http://127.0.0.1:8000/api/auth/modalidad/cursos/crear',this.modalidad, config)
      .then(response => {
        this.modalidad.nombre = ''
        this.modalidad.estado = ''
        this.loader = false
        this.loader2 = true
        this.$swal({
              icon: 'success',
              title: 'Creacion exitosa!',
              text: 'Modalidad creada con exito!',
        });
        this.$router.push('/modalidad-cursos');
      })
      .catch(error => {
        this.loader = false
        this.loader2 = true
        this.$swal({
              title: 'Ocurrio un error!',
              text: 'Valide la informacion suministrada nuevamente!',
              icon: 'info'
        })
      });
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

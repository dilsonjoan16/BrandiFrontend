<template>
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-7 col-md-6">
        <card class="card" title="Crear Curso">
            <div>
              <form class="form" @submit.stop.prevent="CrearCurso">

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
                    <label for="descripcion">Descripcion del Curso</label>
                    <textarea
                      name="descripcion"
                      id="descripcion"
                      cols="30"
                      rows="1"
                      placeholder="Descripcion"
                      v-model="curso.descripcion"
                    >
                    </textarea>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <fg-input type="text"
                              label="Duracion del Curso"
                              placeholder="Duracion"
                              v-model="curso.duracion"
                              id="inputEstado"
                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                    ></fg-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <fg-input type="text"
                              label="Precio del Curso"
                              placeholder="Precio $"
                              v-model="curso.precio"
                              id="precio"
                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                    ></fg-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <label for="area">Area del Curso</label>
                     <select
                        name="area"
                        id="area"
                        class="form-control"
                        required
                        v-model="curso.area_id"
                      >
                        <option disabled value="">Area</option>
                        <option v-for="a in areaCursos" :key="a.id" v-bind:value="a.id">{{
                          a.nombre
                        }}</option>
                      </select>
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
  name: 'CrearCurso',

  data() {
    return {
      token: localStorage.getItem('user_token'),
      areaCursos: [],
      curso: {
        area_id: Number,
        nombre: '',
        estado: '',
        descripcion: '',
        duracion: '',
        precio: ''
      },
      loader: null,
      loader2: true
    }
  },
  mounted(){
    this.AreaCursos()
  },
  methods: {

  async AreaCursos(){
     let response = await this.axios.get(`http://127.0.0.1:8000/api/auth/area/cursos`, {
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      // console.log(response.data);
      this.areaCursos = response.data.areaActiva
    },

    async CrearCurso() {

      this.loader = true
      this.loader2 = false

      const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('user_token'),
            }
      };

      await this.axios.post('http://127.0.0.1:8000/api/auth/cursos/crear',this.curso, config)
      .then(response => {
        this.curso.area_id = ''
        this.curso.nombre = ''
        this.curso.estado = ''
        this.curso.duracion = ''
        this.curso.precio = ''
        this.loader = false
        this.loader2 = true
        this.$swal({
              icon: 'success',
              title: 'Creacion exitosa!',
              text: 'Curso creado con exito!',
        });
        this.$router.push('/cursos')
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

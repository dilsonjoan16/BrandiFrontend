<template>
  <div class="row justify-content-center">
    <div class="col-xl-8 col-lg-7 col-md-6">
      <card class="card" title="Editar Curso">
          <div>
            <form class="form" @submit.stop.prevent="EditarCurso">

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
                    <fg-input type="number"
                              label="Duracion del Curso"
                              placeholder="Estado"
                              v-model="curso.duracion"
                              id="inputEstado">
                    </fg-input>
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
                        <option disabled value="">{{areaActual}}</option>
                        <option v-for="a in areaCursos" :key="a.id" v-bind:value="a.id">{{
                          a.nombre
                        }}</option>
                      </select>
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
        token: localStorage.getItem('user_token'),
        id: localStorage.getItem('ref'),
        areaActual: null,
        areaCursos: [],
        area_id: Number,
        nombre: '',
        estado: '',
        descripcion: '',
        duracion: Number,
        precio: Number
      },
      loader: null,
      loader2: true
    }
  },

  mounted() {
    this.MostrarCurso()
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

    //funcion para mostrar en la vista los datos del curso
    async MostrarCurso() {
      //hay que pasarle la ruta con get
      await this.axios.get(`http://127.0.0.1:8000/api/auth/cursos/ver/${this.id}`,{
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      })
      .then(response => {
        const {area_id,nombre,estado,descripcion,duracion,precio} = response.data.curso
        this.curso.area_id = area_id
        this.curso.nombre = nombre
        this.curso.estado = estado
        this.curso.descripcion = descripcion
        this.curso.duracion = duracion
        this.curso.precio = precio
        this.areaActual = response.data.area.tipo_de_curso.nombre
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
      await this.axios.put(`http://127.0.0.1:8000/api/auth/cursos/modificar/${this.id}`,this.curso, config)
      .then(response => {
        this.loader = false
        this.loader2 = true
        this.$swal({
              icon: 'success',
              title: 'Modificacion exitosa!',
              text: 'Curso modificado con exito!',
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

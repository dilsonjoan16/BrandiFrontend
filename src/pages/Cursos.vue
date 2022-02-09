<template>
  <div class="row">

    <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
             <table class="table" :class="tableClass">
              <thead>
              <slot name="columns">
                <th>Id</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Descripcion</th>
                <th>Duracion</th>
                <th>Precio</th>
                <th>Area del Curso</th>
                <th>Fecha</th>
                <th>Crear <span style="cursor: pointer" class="ti-plus" v-on:click.prevent="crear"></span></th>
              </slot>
              </thead>
              <tbody>
              <tr v-for="(item, index) in data" :key="index">
                <slot :row="item">
                  <td>{{item.id}}</td>
                  <td>{{item.nombre}}</td>
                  <td>{{item.estado}}</td>
                  <td>{{item.descripcion}}</td>
                  <td>{{item.duracion}} Hrs</td>
                  <td>{{item.precio}} $</td>
                  <td>{{item.area_de_curso.nombre}}</td>
                  <td>{{item.created_at.split("T")[0]}}</td>
                  <td>
                    <div >
                      <span class="ti-pencil mx-3" style="cursor: pointer" v-on:click.prevent="editar(item.id)"></span>
                      <span class="ti-na mx-3" style="cursor: pointer" v-on:click.prevent="eliminar(item.id)"></span>
                      </div>
                  </td>
                </slot>
              </tr>
              </tbody>
            </table>
          </div>
        </card>
      </div>
  </div>
</template>
// <script>

import axios from 'axios'
export default {
  components: {


  },
    data() {
      return {
      token: localStorage.getItem('user_token'),
      columns: ["Id","Nombre","Estado","Fecha","",""],
      data: []
      };
    },
  created(){
    axios.get(`http://127.0.0.1:8000/api/auth/cursos`,{
      headers:{
        'Authorization': `Bearer ${this.token}`
      }
    }).then((result) => {
      console.log(result);
      this.data = result.data.cursoGeneral
    }).catch(error => {
      console.log(error);
    })
  },
  props: {
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    async crear(){
      this.$router.push('/crear-curso');
    },
    async editar(id){
      localStorage.setItem("ref", id)
      this.$router.push('/editar-curso')
    },
    async eliminar(id){
      try{
      let response = await axios.delete(`http://127.0.0.1:8000/api/auth/cursos/eliminar/${id}`,{
        headers:{
          'Authorization': `Bearer ${this.token}`
        }
      })
      if (response.status == 200) {
        this.$swal({
              icon: 'success',
              title: 'Modalidad desactivada con exito!',
              text: 'La modalidad seleccionada fue desactivada con exito! Ya no sera renderizada al publico hasta su proxima activacion',
          })
      }
      }catch(error){
        this.$swal({title: 'Ocurrio un error!',text: 'Valide la accion nuevamente!',icon: 'info'})
      }
    },
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    }
  },

};
</script>
<style>
</style>

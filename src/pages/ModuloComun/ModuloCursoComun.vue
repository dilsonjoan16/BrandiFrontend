<template>
  <div class="row">
    <div class="rotor" style="cursor: pointer" v-on:click.prevent="volver">
      <span class="ti-arrow-left"></span>
      <span class="mx-1">Volver</span>
    </div>
      <div class="col-12">
        <card class="card-plain" title="Cursos disponibles">
          <div class="table-full-width table-responsive">
             <table class="table" :class="tableClass">
              <thead>
              <slot name="columns">
                <!-- <th>Id</th> -->
                <th>Nombre</th>
                <!-- <th>Estado</th> -->
                <th>Descripcion</th>
                <th>Duracion</th>
                <th>Precio</th>
                <th>Area del Curso</th>
                <!-- <th>Fecha</th> -->
                <!-- <th>Crear <span style="cursor: pointer" class="ti-plus" v-on:click.prevent="crear"></span></th> -->
              </slot>
              </thead>
              <tbody>
              <tr v-for="d in data" :key="d.id">
                <slot :row="d">
                  <!-- <td>{{item.id}}</td> -->
                  <td>{{d.nombre}}</td>
                  <!-- <td>{{item.estado}}</td> -->
                  <td>{{d.descripcion}}</td>
                  <td>{{d.duracion}} Hrs</td>
                  <td>{{d.precio}} $</td>
                  <td>{{d.area_de_curso.nombre}}</td>
                  <!-- <td>{{item.created_at.split("T")[0]}}</td> -->

                  <!-- <td class="icon-container"> -->
                  <td>
                    <span class="ti-shopping-cart-full" style="cursor: pointer" v-if="loader2" v-on:click.prevent="comprar(d.id)"></span>
                    <div class="spinner my-auto mx-auto" v-if="loader"></div>
                    <!-- <div > -->
                      <!-- <span class="ti-pencil mx-3" style="cursor: pointer" v-on:click.prevent="editar(item.id)"></span> -->
                      <!-- <span class="ti-na mx-3" style="cursor: pointer" v-on:click.prevent="eliminar(item.id)"></span> -->
                      <!-- </div> -->
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
<script>

import axios from 'axios'
export default {
  components: {


  },
    data() {
      return {
      loader:null,
      loader2: true,
      id: localStorage.getItem('a'),
      us: localStorage.getItem('us'),
      token: localStorage.getItem('user_token'),
      columns: ["Id","Nombre","Estado","Fecha","",""],
      data: []
      };
    },
  created(){
    localStorage.removeItem('c')
    axios.get(`https://branditechnology.herokuapp.com/api/auth/area/cursos/ver/${this.id}`,{
      headers:{
        'Authorization': `Bearer ${this.token}`
      }
    }).then((result) => {
      // console.log(result);
      this.data = result.data.area.curso
      console.log(this.data)
    }).catch(error => {
      // console.log(error);
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
    // async crear(){
    //   this.$router.push('/crear-curso');
    // },
    // async editar(id){
    //   localStorage.setItem("ref", id)
    //   this.$router.push('/editar-curso')
    // },
    // async eliminar(){
    //   try{
    //   let response = await axios.delete(`http://127.0.0.1:8000/api/auth/modalidad/cursos/eliminar/${id}`,{
    //     headers:{
    //       'Authorization': `Bearer ${this.token}`
    //     }
    //   })
    //   if (response.status == 200) {
    //     this.$swal({
    //           icon: 'success',
    //           title: 'Modalidad desactivada con exito!',
    //           text: 'La modalidad seleccionada fue desactivada con exito! Ya no sera renderizada al publico hasta su proxima activacion',
    //       })
    //   }
    //   }catch(error){
    //     this.$swal({title: 'Ocurrio un error!',text: 'Valide la accion nuevamente!',icon: 'info'})
    //   }
    // },
    async volver(){
      this.$router.push('/modulo-area-comun')
    },
    async comprar(id){
      this.$swal({
      title: 'Desea confirmar la compra de este articulo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Rechazar`,
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)'
    }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.loader = true
      this.loader2 = false
      try {
        
      this.axios.get(`https://branditechnology.herokuapp.com/api/auth/cursos/compra/${id}/${this.us}`,{
        headers:{
          "Authorization": `Bearer ${this.token}`
        }
      }).then(response => {
      if (response.status == 200) {
      this.loader = false
      this.loader2 = true
      this.$swal('Compra confirmada!', 'La informacion del producto fue enviada a su correo! Solo queda que algun Administrador verifique el pago y su producto estara listo en nuestra Sucursal mas cercana!', 'success')
      } else {
      this.loader = false
      this.loader2 = true
      this.$swal('Ocurrio un error inesperado!', 'Se le recomienda probar nuevamente, en caso se persistir el problema debe reportarlo a algun administrador', 'info')
      }
      })
      } catch (error) {
      this.loader = false
      this.loader2 = true
      this.$swal('Ocurrio un error inesperado!', 'Se le recomienda probar nuevamente, en caso se persistir el problema debe reportarlo a algun administrador', 'info')
      }
    } else if (result.isDenied) {
      this.$swal('Accion de compra rechazada con exito!', '', 'info')
    }
    })
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
<style scoped>
.rotor{
  margin-left: 90%;
}

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

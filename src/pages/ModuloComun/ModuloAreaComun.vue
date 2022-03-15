<template>
  <div class="row">
    <!-- <div class="row justify-content-center"> -->
      <!-- <div class=""> -->
        <div class="rotor" style="cursor: pointer" v-on:click.prevent="volver">
            <span class="ti-arrow-left"></span>
            <span class="mx-1">Volver</span>
        </div>
        <card class="card mx-auto col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Tipo de los Cursos">
          <card class="card col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" v-for="d in data" :key="d.id">
              <div id="carta">
                  <thead>
                    <slot name="tipo">
                      <th>
                        Tipo:
                      </th>
                    </slot>
                  </thead>
                  <hr>
                  <tbody>
                    <slot name="tipos">
                      <div class="icon-container" style="cursor: pointer" v-on:click.prevent="area(d.id)">
                        <span id="letra" class="icon-name"> {{d.nombre}}</span>
                        <span class="ti-arrow-right"></span>
                      </div>
                    </slot>
                  </tbody>
                  <div class="spinner my-auto mx-auto" v-if="loader"></div>
              </div>
          </card>
        </card>
      <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
             <table class="table" :class="tableClass">
              <thead>
              <slot name="columns">
                <th>Id</th>
                <th>Nombre</th>
                <th>Estado</th>
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
          <div class="spinner my-auto mx-auto" v-if="loader"></div>
        </card>
      </div> -->
    <!-- Stats cards -->
    <!-- <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div> -->

    <!-- Charts -->
    <!-- <div class="row">

      <div class="col-12">
        <chart-card title="Users behavior"
                    sub-title="24 Hours performance"
                    :chart-data="usersChart.data"
                    :chart-options="usersChart.options">
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="Email Statistics"
                    sub-title="Last campaign performance"
                    :chart-data="preferencesChart.data"
                    chart-type="Pie">
          <span slot="footer">
            <i class="ti-timer"></i> Campaign set 2 days ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Bounce
            <i class="fa fa-circle text-warning"></i> Unsubscribe
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="2015 Sales"
                    sub-title="All products including Taxes"
                    :chart-data="activityChart.data"
                    :chart-options="activityChart.options">
          <span slot="footer">
            <i class="ti-check"></i> Data information certified
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Tesla Model S
            <i class="fa fa-circle text-warning"></i> BMW 5 Series
          </div>
        </chart-card>
      </div>

    </div> -->

  </div>
</template>
// <script>
// import { StatsCard, ChartCard } from "@/components/Cards";
// import Chartist from 'chartist';
import axios from 'axios'
export default {
  components: {
    // StatsCard,
    // ChartCard

  },
    data() {
      return {
      loader: null,
      id: localStorage.getItem('t'),
      token: localStorage.getItem('user_token'),
      columns: ["Id","Nombre","Estado","Fecha","",""],
      data: []
      };
    },
  created(){
    localStorage.removeItem('a')
    axios.get(`https://branditechnology.herokuapp.com/api/auth/tipo/cursos/ver/${this.id}`,{
      headers:{
        'Authorization': `Bearer ${this.token}`
      }
    }).then((result) => {
      // console.log(result);
      this.data = result.data.tipo.area_de_curso
    }).catch(error => {
      // console.log(error);
    })
  },
  props: {
    // columns: Array,
    // data: Array,
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
    //   this.$router.push('/crear-modalidad');
    // },
    // async editar(id){
    //   localStorage.setItem("ref", id)
    //   this.$router.push('/editar-modalidad')
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
    async area(id){
      this.loader = true
      localStorage.setItem('a', id);
      this.$router.push('/modulo-curso-comun')
    },
    async volver(){
      this.$router.push('/modulo-tipo-comun')
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
#carta{
  transition: 0.5s;
}
#carta::hover{
  background-color: rgba(244,243,239, 0.5);
}
.letra{
  font-size: 18px;
  margin-right: 7px !important;
}
</style>

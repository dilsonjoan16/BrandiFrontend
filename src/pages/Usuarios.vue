<template>
  <div class="row">

    <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
             <table class="table" :class="tableClass">
              <thead>
              <slot name="columns">
                <!-- <th v-for="column in columns" :key="column">{{column}}</th> -->
                <th>Id</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Crear <span style="cursor: pointer" class="ti-plus" v-on:click.prevent="crear"></span></th>
              </slot>
              </thead>
              <tbody>
              <tr v-for="(item, index) in data" :key="index">
                <slot :row="item">
                  <td>{{item.id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.email}}</td>
                  <td>{{item.rol}}</td>
                  <td>{{item.estado}}</td>
                  <td>{{item.created_at.split("T")[0]}}</td>
                  <td>
                    <div >
                      <span class="ti-pencil mx-3" style="cursor: pointer" v-on:click.prevent="editar(item.id)"></span>
                      <span class="ti-na mx-3" style="cursor: pointer" v-on:click.prevent="eliminar(item.id)"></span>
                      </div>
                  </td>
                  <!-- <td v-for="(column, index) in columns"
                      :key="index"
                      v-if="hasValue(item, column)">
                    {{itemValue(item, column)}}
                  </td> -->
                </slot>
              </tr>
              </tbody>
            </table>
          </div>
        <div class="spinner my-auto mx-auto" v-if="loader"></div>
      </card>
    </div>
    <!--Stats cards-->
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

    <!--Charts-->
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
// import { StatsCard, ChartCard } from "@/components/index";
// import Chartist from 'chartist';
// import axios from 'axios'
export default {
  components: {
    // StatsCard,
    // ChartCard

  },
    data() {
      return {
      loader: null,
      token: localStorage.getItem('user_token'),
      columns: ["Id","Nombre","Estado","Fecha","",""],
      data: []
      };
    },
  created(){
    this.axios.get(`https://branditechnology.herokuapp.com/api/auth/usuarios`,{
      headers:{
        'Authorization': `Bearer ${this.token}`
      }
    }).then((result) => {
      // console.log(result);
      this.data = result.data.user
      // console.log(this.data);
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
    async crear(){
      this.$router.push('/crear-usuario');
    },
    async editar(id){
      localStorage.setItem("ref", id)
      this.$router.push('/editar-usuario')
    },
    async eliminar(id){
      this.loader = true
      try{
      let response = await this.axios.delete(`https://branditechnology.herokuapp.com/api/auth/usuario/eliminar/${id}`,{
        headers:{
          'Authorization': `Bearer ${this.token}`
        }
      })
      if (response.status == 200) {
        this.$swal({
          icon: 'success',
              title: 'Usuario desactivado con exito!',
              text: 'El usuario seleccionado fue desactivado con exito! Ya no sera admitido en el sistema hasta su proxima activacion',
          })
          this.loader = false
      }
      }catch(error){
        this.$swal({title: 'Ocurrio un error!',text: 'Valide la accion nuevamente!',icon: 'info'})
        this.loader = false
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
<style scoped>
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

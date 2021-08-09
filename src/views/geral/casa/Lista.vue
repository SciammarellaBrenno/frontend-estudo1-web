<template>
  <master-page icone="mdi-home" titulo="Casa" subTitulo="Lista das casas.">
      
    <v-row class="toolbar" align="center">
      <v-text-field v-model="search" label="Pesquisa rápida" class="mx-2" clearable single-linehide-details @change="Atualizar()"/>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn fab small depressed="" color="primary" class="mr-2" @click="Atualizar()" v-on="on"><v-icon>mdi-refresh</v-icon></v-btn>
        </template>
        <span>Atualizar</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn fab small depressed color="primary" class="mr-2" v-on="on" @click="AbrirDialogCadastro()"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <span>Nova Casa</span>
      </v-tooltip>
    </v-row>

    <v-data-table id="tabela" :headers="headers" :items="lista" :options.sync="options" :server-items-length="totalLista" :loading="loading" :footer-props="{ showFirstLastPage: true}" class="elevation-1">

      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon small @click="AbrirDialogCadastro(item)" v-on="on">mdi-pencil</v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon small @click="Excluir(item)" v-on="on">mdi-delete</v-icon>
          </template>
          <span>Excluir</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <cadastro-casa v-model="dialogCadastro" :item="item" @fechou="dialogCadastro = false" @salvou="Atualizar()"/>

  </master-page>
</template>

<script lang="ts">
import { CasaService } from '@/core/services/geral';
import { Casa } from '@/core/models/geral';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class ListaVeiculo extends Vue {
  search: any = '';
  loading: boolean = false;
  dialogCadastro: boolean = false;
  totalLista: number = 0;
  lista: any[] = [];
  options: any = {
    itemsPerPage: 15
  };
  headers: any[] = [
    { text: '', value: 'actions',sortable: false },
    { text: 'Nome', value: 'nome' },
    { text: 'Quantidade Pessoas', value: 'quantidadePessoas' },
  ];
  item = new Casa();
  service = new CasaService();
  sessionApp: any;

  @Watch('options', { deep: true })
  Atualizar(){
    const { page, itemsPerPage, sortBy, sortDesc, search, columns } = this.options;
    this.loading = true;

    this.service.Listar(page, itemsPerPage, sortBy, sortDesc, this.search, this.headers, undefined, "UsuarioCasas").then(
      res => {
        this.lista = res.data.items;
        this.totalLista = res.data.count;
      },
      err => {
        console.log(err.response.data);
      }
    )
    .finally(() => (this.loading = false));
  }

  mounted(){
    this.sessionApp = JSON.parse(localStorage.sessionApp);
  }

  AbrirDialogCadastro(item?: Casa){
    if(item){
      this.service.ObterPorId(item.id, "Mensagens, UsuarioCasas").then(
        res=>{
          this.item = new Casa(res.data);
          this.dialogCadastro = true;
        },
        err => {
          console.log(err.response.data);
        }
      )
    }
    else{
      this.item = new Casa();
      this.item.adminId = 1;
      this.dialogCadastro = true;
    }
  }

    Excluir(item: Casa){
        this.service.Excluir(item.id).then(
            res => {
                if (res.status == 200){
                    this.Atualizar();
                    return res.data;
                }
            },
            err => {
                console.log(err.response.data);
            }
        )
    }
}
</script>
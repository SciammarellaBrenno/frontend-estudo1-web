<template>
  <v-app>
    <v-app-bar app color="primary white--text" height="70">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
        <h3>FRONTEND ESTUDO 1 WEB</h3>
        <v-spacer/>
        <v-menu offset-y transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon class="px-10">
              <v-avatar dark color="toolbar">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>USUÁRIO</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon><v-icon>mdi-lock-reset</v-icon></v-list-item-icon>
              <v-list-item-title>Alterar Senha</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary width="300">
      <v-list nav dense>        
        <v-subheader>MENU</v-subheader>
        <v-list-item-group active-class="blue-grey--text text--accent-4">
          <v-list-item to="/"><v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon><v-list-item-content><v-list-item-title>Principal</v-list-item-title></v-list-item-content></v-list-item>
          <v-list-item to="/casa"><v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon><v-list-item-content><v-list-item-title>Casa</v-list-item-title></v-list-item-content></v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" @click="Logout()">SAIR</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-container class="pb-12 pt-10 mt-12" fluid>
      <div v-if="icone" class="d-flex mb-3">
        <div class="d-flex pl-3">
          <v-avatar color="white" size="50" class="elevation-2">
            <v-icon size="30" color="primary">{{ icone }}</v-icon>
          </v-avatar>
        </div>
        <div class="pl-3">
          <h2 class="font-weight-medium">{{ titulo }}</h2>
          <small>{{ subTitulo }}</small>
        </div>
      </div>
      <slot/>
    </v-container>

    <v-footer color="primary" app>
      <div class="font-weight-regular body-2 white--text">FRONTEND ESTUDO 1</div>
      <div class="flex-grow-1"></div>
      <div class="font-weight-regular body-2 white--text">&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

  </v-app>    
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class MasterPage extends Vue {

        @Prop() private icone!: string;
        @Prop() private titulo!: string;
        @Prop() private subTitulo!: string;

        drawer = false;
        active = false;
    }
</script>

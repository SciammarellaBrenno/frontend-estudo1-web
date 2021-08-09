<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
              <v-form @submit.prevent="Autenticar()">
                <v-card class="elevation-1">
                  <v-toolbar color="primary" dark flat>
                      <v-toolbar-title><v-icon>mdi-lock</v-icon> Controle de Acesso</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                      <v-text-field label="Login" prepend-icon="mdi-account" v-model="acesso.login"/>
                      <v-text-field :type="showPassword ? 'text' : 'password'" label="Senha" v-model="acesso.senha" prepend-icon="mdi-form-textbox-password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"/>
                  </v-card-text>
                  <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn type="submit" color="secondary" :loading="loading">Entrar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AutenticadorService }  from '@/core/services/geral';

@Component
export default class Login extends Vue {
  hidePassword: boolean = true;
  loading: boolean = false;
  showPassword: boolean = false;
  acesso: {login: string, senha: string} = {
    login: '',
    senha: ''
  };
  fieldRules: any[] = [
    (v: any) => !!v || 'Campo obrigatório',
  ]
  service = new AutenticadorService();

  Autenticar(){
    this.loading = true;

    this.service.AutenticarUsuario(this.acesso)
      .then(res => {
        localStorage.setItem('sessionApp', JSON.stringify(res.data));
        this.$router.push({ name: 'home' });
      }, 
      err => {
        localStorage.clear();
      }).finally(() => this.loading = false);

  }
}
</script>
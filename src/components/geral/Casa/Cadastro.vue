<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="Close()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Cadastro Casa</v-toolbar-title>
                <v-spacer/>
                <v-toolbar-items>
                    <v-btn dark text @click="Salvar()" :disabled="!valid">Salvar</v-btn>
                </v-toolbar-items>
            </v-toolbar>
                <v-card-text class="mt-3">
                <v-form ref="form" v-model="valid" lazy-validation>          
                    <v-row>
                        <v-col cols="12" sm="10" md="11">
                            <v-text-field v-model="item.nome" label="Nome" :rules="fieldRules" dense outlined/>
                        </v-col>
                        <v-col cols="12" sm="2" md="1" align-self="center">
                            <v-switch color="primary" v-model="item.ativo" dense label="Ativo" style="margin-top: -10px"/>
                        </v-col>
                    </v-row>
                    <v-data-table :headers="headerMensagem" :items="item.mensagens" :items-per-page="-1" hide-default-footer class="elevation-1"> 
                        <template v-slot:top>
                        <v-card flat>
                            <v-row>
                                <v-col cols="12" sm="11" md="11"></v-col>
                                <v-col cols="12" sm="1" md="1">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn fab small depressed color="primary" class="mb-2" dark v-on="on" @click="AbrirDialogBase()">
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Nova Mensagem</span>
                                    </v-tooltip>
                                </v-col>
                            </v-row>
                        </v-card>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon small @click="AbrirDialogMensagem(item)" v-on="on" :disabled="item.excluido">mdi-pencil</v-icon>
                                </template>
                                <span>Editar</span>
                            </v-tooltip>
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon small @click="ExcluirMensagem(item)" v-on="on" :disabled="item.excluido">mdi-delete</v-icon>
                                </template>
                                <span>Excluir</span>
                            </v-tooltip>
                        </template>
                        <template v-slot:[`item.arquivo`]="{ item }">
                            <v-chip close>{{item.arquivo}}</v-chip>
                        </template>
                    </v-data-table>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import jiff from 'jiff';
import { Casa } from "@/core/models/geral";
import { CasaService } from "@/core/services/geral";

@Component
export default class CadastroCasa extends Vue {
    @Prop() private item!: Casa;
    @Prop() private value!: string;

    itemOriginal!: Casa;
    service = new CasaService();
    valid = true;
    dialog = false;
    fieldRules: any[] = [(v: any) => !!v || "Campo obrigatório"];
    grupos: any[] = [];
    tecnologias: any[] = [];
    unidadeMedidas: any[] = [];
    $refs!: {
        form: HTMLFormElement
    }
    headerMensagem: any[] = [
        { text: '', value:'actions',sortable: false },
        { text: 'Texto', value: 'texto' },
        { text: 'Arquivo', value: 'arquivo' },
    ];

    @Watch('item')
    Item() {
        if (this.$refs.form) {
            this.$refs.form.resetValidation();
        }
    }

    @Watch("value")
    Value() {
        this.dialog = this.value ? true : false;
        if (this.dialog){
            this.itemOriginal = jiff.clone(this.item)
        }
    }

    @Watch("dialog")
    Dialog() {
        if (!this.dialog) {
        this.$emit("fechou");
        }
    }

    beforeUpdate(){
        if (!this.dialog){
            this.$emit('fechou');
        }
    }

    Salvar() {
        if (this.$refs.form.validate()) {
        let pacthModel = jiff.diff(this.itemOriginal,this.item,false);
        (this.item.id > 0 ? this.service.Salvar(pacthModel, this.item.id) : this.service.Salvar(this.item)).then(
            res => {
                this.$emit("salvou");
                this.Close();
            },
            err => {
                console.log(err.response.data);
            });
        }
    }

    Close() {
        this.dialog = false;
    }
}
</script>
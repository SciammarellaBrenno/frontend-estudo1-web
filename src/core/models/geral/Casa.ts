import { Usuario, Mensagem, UsuarioCasa } from ".";

export class Casa implements Shared.IEntity{

    id: number = 0;
    nome: string = '';
    dataHoraCriacao: string = '';
    adminId: number = 0;
    admin!: Usuario;
    ativo: boolean = false;
    usuarioCasas: UsuarioCasa[] = [];
    mensagens: Mensagem[] = [];


    constructor(model?: Casa){

        if(!model)
            return;

        this.id = model.id;
        this.nome = model.nome;
        this.dataHoraCriacao = model.dataHoraCriacao;
        this.adminId = model.adminId;
        this.admin = model.admin;
        this.ativo = model.ativo;
        this.usuarioCasas = model.usuarioCasas;
        this.mensagens = model.mensagens;
    }
}
export class Usuario implements Shared.IEntity{

    id: number = 0;
    login: string = '';
    senha: string = '';
    dataHoraCriacao: string = '';
    nome: string = '';
    foto: any = null;
    ativo: boolean = false;
    

    constructor(model?: Usuario){

        if(!model)
            return;

        this.id = model.id;
        this.login = model.login;
        this.senha = model.senha;
        this.dataHoraCriacao = model.dataHoraCriacao;
        this.nome = model.nome;
        this.foto = model.foto;
        this.ativo = model.ativo;
    }
}
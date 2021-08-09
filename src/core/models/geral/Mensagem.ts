import { Casa } from ".";

export class Mensagem implements Shared.IEntity{

    id: number = 0;
    casaId: number = 0;
    casa!: Casa;
    texto: string = '';
    arquivo: string = '';

    constructor(model?: Mensagem){

        if(!model)
            return;

        this.id = model.id;
        this.casaId = model.casaId;
        this.casa = model.casa;
        this.texto = model.texto;
        this.arquivo = model.arquivo;
    }
}
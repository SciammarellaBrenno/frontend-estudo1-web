import { Casa } from ".";

export class UsuarioCasa{

    usuarioId: number = 0;
    casaId: number = 0;
    casa!: Casa;

    constructor(model?: UsuarioCasa){

        if(!model)
            return;

        this.usuarioId = model.usuarioId;
        this.casaId = model.casaId;
        this.casa = model.casa;
    }
}
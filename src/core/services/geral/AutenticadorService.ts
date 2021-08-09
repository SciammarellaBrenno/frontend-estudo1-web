import {http} from '@/core/ApiConfig';
   
export class AutenticadorService {

    private _nomeControle = 'autenticador';

    public async AutenticarUsuario(usuario: any){
        return await http.post(`${this._nomeControle}/usuario`, usuario);
    }
}
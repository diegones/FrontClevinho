import { Endereco } from "./endereco.model";

export class Cliente{

    public id: number;


    constructor(
        public nome: String,
        public cpf: String,
        public login: String,
        public senha: String,
        public enderecos: Endereco[]
    
    ){}

}
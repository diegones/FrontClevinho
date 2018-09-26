import { Cliente } from "./cliente.models";

export class Endereco {

    
    public cliente: Cliente;
    
    constructor(
        public logradouro: String,
        public numero: Number,
        public complemento: String,
        public cidade: String,
        public pais: String,
        public cep: String

    ){}
}
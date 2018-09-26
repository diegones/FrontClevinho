import { Component, OnInit } from '@angular/core';
import { HttpClienteService } from '../Cliente/httpcliente.service';
import { Cliente } from '../modelos/cliente.models';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Endereco } from '../modelos/endereco.model';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [HttpClienteService]
})
export class ClienteComponent implements OnInit {

  public endereco: Endereco[] = []

  public qtdEnd : number
  
  cliente : Cliente[] =[]

  public clienteHold : Cliente = new Cliente('','','','',[])

  public formulario : FormGroup

  public formularioCadastro : FormGroup = new FormGroup({

  
    'nome' : new FormControl(null),
    'cpf' : new FormControl(null),
    'login' : new FormControl(null),
    'senha' : new FormControl(null),
    'logradouro' : new FormControl(null),
    'numero' : new FormControl(null),
    'complemento' : new FormControl(null),
    'cidade' : new FormControl(null),
    'pais' : new FormControl(null),
    'cep' : new FormControl(null)

  })  

  constructor(private clienteService : HttpClienteService) { }

  ngOnInit() {
    this.listarClientes()

    this.formulario =  new FormGroup({

      'nome' : new FormControl(null),
      'cpf' : new FormControl(null),
      'login' : new FormControl(null),
      'senha' : new FormControl(null)
      

    })
  }

  public listarClientes() : void{
    this.clienteService.getClientes().subscribe(
      (lista: Cliente[]) => {
        this.cliente = lista
        console.log('lista clientes: ', this.cliente)
    })
  }

  public cadastrarCliente() : void {
    let endereco : Endereco = new Endereco(

      this.formularioCadastro.value.logradouro,
      this.formularioCadastro.value.numero,
      this.formularioCadastro.value.complemento,
      this.formularioCadastro.value.cidade,
      this.formularioCadastro.value.pais,
      this.formularioCadastro.value.cep)

      this.endereco.push( endereco )

  

      let cliente: Cliente = new Cliente(

        this.formularioCadastro.value.nome,
        this.formularioCadastro.value.cpf,
        this.formularioCadastro.value.login,
        this.formularioCadastro.value.senha,
        this.endereco

      )
      //adiciona cliente na lista que é exibida na tela
      this.cliente.push(cliente)
      
      //adiciona cliente na base de dados
      this.clienteService.addCliente(cliente).subscribe(
        (resposta: any) => console.log(resposta)
      )
  }

  public cadastrarNovoEndereco() : void {

    let endereco : Endereco = new Endereco(

      this.formularioCadastro.value.logradouro,
      this.formularioCadastro.value.numero,
      this.formularioCadastro.value.complemento,
      this.formularioCadastro.value.cidade,
      this.formularioCadastro.value.pais,
      this.formularioCadastro.value.cep

    )

    endereco.cliente = this.clienteHold
  }

  public carregarCliente(cliente: Cliente) : void {
    this.clienteHold = cliente

    this.qtdEnd = cliente.enderecos.length

    console.log(this.qtdEnd)
  }

  public updateCliente(cliente: Cliente) : void {let buscaCliente = this.cliente.find((c: Cliente) => c.id === cliente.id )

    console.log('cliente antes: ', buscaCliente);

    if(this.formulario.value.nome !== null) buscaCliente.nome = this.formulario.value.nome
     if(this.formulario.value.cpf !== null) buscaCliente.cpf = this.formulario.value.cpf
     if(this.formulario.value.login !== null) buscaCliente.login = this.formulario.value.login

    this.formulario.value.nome = null
     this.formulario.value.cpf = null
     this.formulario.value.login = null

    this.clienteService.updateCliente(cliente).subscribe(()=> alert('Cliente ID =' + cliente.id + ' atualizado!'))

    console.log('cliente depois: ', buscaCliente)
  }

  public deleteCliente(cliente: Cliente) : void {
    this.clienteService.deleteCliente(cliente).subscribe(
      () => this.listarClientes(),
      () => alert('Cliente deletado com sucesso!')
    )
  }

}
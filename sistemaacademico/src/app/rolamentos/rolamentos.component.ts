import { Component, OnInit } from '@angular/core';
import { HttpRolamentoService } from '../Rolamento/httprolamento.service';
import { Rolamento } from '../Rolamento/rolamento.component';

@Component({
  selector: 'app-rolamentos',
  templateUrl: './rolamentos.component.html',
  styleUrls: ['./rolamentos.component.css'],
  providers: [HttpRolamentoService]
})
export class RolamentosComponent implements OnInit {

  rolamentos : Rolamento[] =[]

  rolamento : Rolamento = new Rolamento('','')

  constructor(private rolamentoService : HttpRolamentoService) { }

  ngOnInit() {
    this.listarRolamentos()
  }

  public listarRolamentos() : void{
    this.rolamentoService.getRolamentos().subscribe(
      (lista: Rolamento[]) => {
        this.rolamentos = lista
        console.log('lista rolamentos: ', this.rolamentos)
    })
  }

  public cadasatrarRolamento() : void {
    this.rolamentos.push(this.rolamento)
    this.rolamentoService.addRolamento(this.rolamento).subscribe((resposta: String) => console.log(console)
    )
  }

  public carregarRolamento(rolamento: Rolamento) : void {
    console.log('rolamento carregado: ', rolamento )
    this.rolamento = rolamento
  }

  public updateRolamento(rolamento: Rolamento) : void {
    this.rolamentoService.updateRolamento(this.rolamento).subscribe()
  }

  public deleteRolamento(rolamento: Rolamento) : void {
    this.rolamentoService.deleteRolamento(rolamento).subscribe(
      () => this.listarRolamentos(),
      () => alert('Rolamento deletado com sucesso!')
    )
  }

}

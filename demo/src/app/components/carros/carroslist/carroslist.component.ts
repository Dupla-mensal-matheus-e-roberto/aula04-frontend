import { Component, EventEmitter, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from 'src/app/models/carro';
import { CarroService } from 'src/app/services/carro.service';

@Component({
  selector: 'app-carroslist',
  templateUrl: './carroslist.component.html',
  styleUrls: ['./carroslist.component.scss']
})
export class CarroslistComponent {

  retorno = new EventEmitter<Carro>();

  lista: Carro[] = [];

  carroSelecionadoParaEdicao: Carro = new Carro();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  carroService = inject(CarroService);

  constructor(){

    this.listAll();
  }

  listAll(){
    this.carroService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  exemploErro() {

    this.carroService.exemploErro().subscribe({
      next: lista => { // QUANDO DÁ CERTO
        this.lista = lista;
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  adicionar(modal : any){
    this.carroSelecionadoParaEdicao = new Carro();
 
    this.modalService.open(modal, {size: 'sm'});
  }

  editar(modal: any, carro: Carro, indice: number) {
    this.carroSelecionadoParaEdicao = Object.assign({}, carro);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'sm'});
  }

  deletar(carro: Carro){
    this.carroService.delete(carro.id).subscribe({
      next: carro =>{
        this.lista = this.lista.filter(c => c.id !== carro.id);
        this.retorno.emit(carro);
      },
      error: erro =>{
        alert("Erro, olhar no console");
        console.log(erro);
      }
    });
  }

  addOuEditarCarro(carro: Carro) {
    this.listAll();

    this.modalService.dismissAll();
  }
}

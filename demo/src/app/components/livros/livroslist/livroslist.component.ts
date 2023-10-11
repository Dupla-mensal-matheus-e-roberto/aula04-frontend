import { Component, EventEmitter, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livroslist',
  templateUrl: './livroslist.component.html',
  styleUrls: ['./livroslist.component.scss']
})
export class LivroslistComponent {

  retorno = new EventEmitter<Livro>();

  lista: Livro[] = [];

  livroSelecionadoParaEdicao: Livro = new Livro();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  livroService = inject(LivroService);

  constructor(){

    this.listAll();
  }

  listAll(){
    this.livroService.listAll().subscribe({
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

    this.livroService.exemploErro().subscribe({
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
    this.livroSelecionadoParaEdicao = new Livro();
 
    this.modalService.open(modal, {size: 'sm'});
  }

  editar(modal: any, livro: Livro, indice: number) {
    this.livroSelecionadoParaEdicao = Object.assign({}, livro);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'sm'});
  }

  deletar(livro: Livro){
    this.livroService.delete(livro.id).subscribe({
      next: livro =>{
        this.lista = this.lista.filter(l => l.id !== livro.id);
        this.retorno.emit(livro);
      },
      error: erro =>{
        alert("Erro, olhar no console");
        console.log(erro);
      }
    });
  }

  addOuEditarLivro(livro: Livro) {
    this.listAll();

    this.modalService.dismissAll();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../model';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRegister();
  }

  name: string = '';
  cep: string = '';
  editSelect: number = -1;

  registerList: Address | any= [];

  updateRegister(id: number, name: string) {
    let data = {"user":{
      "name": this.name,
      "code": this.cep
    }}

    if(confirm(`Deseja mesmo alterar o registro do(a) ${name}?`)) {
      this.registerService.updateRegisters(data, id).subscribe({
        next: res => {
          this.getRegister();
          alert('Alteração concluída');
        },
        error: error => {
          alert('Não foi possível concluir a alteração!')
        }
      });
    }
  }

  getRegister() {
    this.registerService.getRegisters().subscribe({
      next: res => {
        this.registerList = res;
      }
    });
  }

  deleteRegister(id: number, name: string) {
    if(confirm(`Deseja mesmo deletar o cadastro do(a) ${name}?`)) {
      this.registerService.deleteRegister(id).subscribe({
        next: res => {
          this.getRegister();
          alert('Deleção concluída!');
        },
        error: error => {
          alert("Não foi possível completar a deleção");
        }
      });
    }
  }

  edit(id: number) {
    this.editSelect = id;
  }

  closeEdit() {
    this.editSelect = -1;
  }

  alterRouter() {
    this.router.navigate(['form']);
  }

}

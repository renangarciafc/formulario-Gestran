import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '../model';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent {

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {
  }

  registerList:Address[] | any = [];

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]),
    code: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    district: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    number: new FormControl(null, [Validators.required]),
    complement: new FormControl(null, [Validators.required])
  });

  register() {
    /* Fiz minha própria validação pelo validator não estar funcionando corretamente,
    provavelmente pela forma que eu manipulei o formulário, mas por eu não querer prolongar
    muito o teste validei por conta própria */
    if(
      /* this.registerForm.valid */
      this.registerForm.value.name != null &&
      this.registerForm.value.name.length < 50 &&
      this.registerForm.value.name.length >= 5 &&
      this.registerForm.value.code != null &&
      this.registerForm.value.city != null &&
      this.registerForm.value.district != null &&
      this.registerForm.value.street != null &&
      this.registerForm.value.number != null &&
      this.registerForm.value.complement != null
    ) {

      this.registerList = new Address(
        this.registerForm.value.name,
        String(this.registerForm.value.code),
        this.registerForm.value.city,
        this.registerForm.value.district,
        this.registerForm.value.street,
        String(this.registerForm.value.number),
        this.registerForm.value.complement
      );

      this.registerService.addRegisters(this.registerList).subscribe({
        next: res => {
          console.log(res);
          alert('Cadastro concluído');
          this.router.navigate(['']);
        },
        error: error => {
          console.log(error);
          alert('Não foi possível fazer o cadastro!');
        }
      });
    }
    else {
      alert('Preecha todos os campos corretamente!');
    }
  }

  searchAddress() {
    this.registerService.searchCep(this.registerForm.value.code).subscribe({
      next: res => {
        this.registerForm.patchValue({city: res.localidade});
        this.registerForm.patchValue({street: res.logradouro});
        this.registerForm.patchValue({complement: res.complemento});
        this.registerForm.patchValue({district: res.bairro});
      },
      error: error => {
        alert("CEP invalido!")
      }
    })
  }

}

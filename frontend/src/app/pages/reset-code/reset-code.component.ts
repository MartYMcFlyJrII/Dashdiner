import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.css']
})
export class ResetCodeComponent {
  resetCodeForm = this.formBuilder.group({
    code: ['',[Validators.required, Validators.pattern(/^\d{4}$/)]],
  });
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private globalService: GlobalService, private router: Router, private formBuilder:FormBuilder) {}

  get code() { return this.resetCodeForm.controls.code; }
  resetCode() {
    if (this.resetCodeForm.valid) {
      const code = (document.getElementById('code') as HTMLInputElement).value;
      const reset_code = sessionStorage.getItem('reset_code');
      // El código es válido, puedes realizar alguna acción aquí.
      if(reset_code){
        const reset_code_obj = JSON.parse(reset_code);
        if(reset_code_obj.codigo==code){
          alert("Código correcto");
          this.router.navigateByUrl('/new-password');
          
        }else{
          alert("Código incorrecto");
        }
      }else{
        alert("Código incorrecto");
      }
      
    } else {
      // El código no es válido o no se proporcionó, muestra un mensaje de error.
      this.code.markAsTouched();
    }
  }
}


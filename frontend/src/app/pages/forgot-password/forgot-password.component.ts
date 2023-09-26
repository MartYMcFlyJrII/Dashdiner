import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service'; // Ajusta la ruta adecuada
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  forgotPasswordForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
  });
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private globalService: GlobalService, private router: Router, private formBuilder:FormBuilder) {}


  forgotPassword(){
    if(this.forgotPasswordForm.valid){
      const correo= (document.getElementById('email') as HTMLInputElement).value;
      this.globalService.forgotPassword(correo).subscribe(response => {
        console.log(response.codigoboolean);
        if(response.codigoboolean){
          alert("Se ha enviado un correo con su nueva contraseña");
          this.router.navigateByUrl('/reset-code');
        }
        else{
          alert("No existe el usuario");
        }
      });   
    }else{
      this.forgotPasswordForm.markAllAsTouched();
      alert("Datos incorrectos");

    }  
  }
  get email() { return this.forgotPasswordForm.controls.email; }

}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form! : FormGroup;
  showPassword: Boolean = false;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      nik: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil menambahkan data bank baru!", "success")
  }

  changeVisibilityPassword() {

    this.showPassword = !this.showPassword;
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid){
      return;
    }

    const data = {
      nik: this.f['nik'].value,
      password: this.f['password'].value,
    }

    this.authService.login(data).subscribe((data) => {
      this.authService.saveToken(data.token);
      this.authService.saveUser(data.user);

      console.log("Sign In Success");

      this.successAlert();

      this.router.navigate(['/']);
    }, (err) => {
     if (err.status === 401) {
       Swal.fire("Gagal!", "NIK atau Password salah!", "error")
     } else {
        Swal.fire("Gagal!", "Terjadi kesalahan pada server!", "error")
     }

     this.submitted = false;
     this.f['password'].setValue('');
    }, () => {
      this.submitted = false;
    })

  }


}

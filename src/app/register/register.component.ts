import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthenService } from 'src/service/authen.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: any = this.fb.group({
    // phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    yourName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {
    validator: this.passwordMatchValidator
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenService
  ) {}

  register() {
    const user = {
      fullname: this.registerForm.value.yourName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.authService.registerUser(user).subscribe(res => {
      console.log('🏍️ ~ res: ', res)
    }, (err) => {
      console.log('🏍️ ~ err: ', err)
    })
  }

  registerWithGoogle() {

  }

  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }
}


import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/_services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() cancelLogin = new EventEmitter();
  model: any = {}
  loginForm: FormGroup;

  constructor(public accountService: AccountService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm(); 
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(10)]],
    })

    this.loginForm.controls['password'].valueChanges.subscribe(() => {
    })
    
  }

  matchValues(matchTo: string): ValidatorFn {
    return(control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
      ? null : {isMatching: true}
    }
  }

  login(){
    this.accountService.login(this.loginForm.value).subscribe(response => {
      this.router.navigateByUrl('/books');
    }, error => {
      console.log(error);
      
    })
  }

  cancel() {
    this.cancelLogin.emit(false);
  }

}

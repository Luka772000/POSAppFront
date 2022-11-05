
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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

  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(this.model.username, Validators.required),
      password: new FormControl(this.model.password, Validators.required),
    })
  }


  login() {
    console.log(this.model)
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/home')
      window.setTimeout(function () { location.reload() }, 0)

    }, error => {
      console.log(error.error);
      
    })
  };

  matchValues(matchTo: string): ValidatorFn {
    return(control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
      ? null : {isMatching: true}
    }
  }

  cancel() {
    this.cancelLogin.emit(false);
  }

}

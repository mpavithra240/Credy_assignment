import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from '../services/data-sharing.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: any = '';
  password: any = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private rest: RestService, private data: DataSharingService,) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  login() {
    var logIn = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }
   
    if(logIn.username == '' || logIn.password == '') {
      this.toastr.error('Username and password are Mandatory fields');
    }
    console.log("LOGIN", logIn)
    var data = {
      url: "https://demo.credy.in/api/v1/usermodule/login/",
      params: logIn
    }
    this.rest.loginPost(data).subscribe((res: any) => {
      console.log(res)

      if(res.is_success == true) {
        this.router.navigate(['movies']);
        res.data.loginUser = logIn.username;
        this.data.setLogin(res.data);
      } else {
        this.toastr.error(res.error.message);
      }
      
    },
      err => {
        this.toastr.error(err.error);
      });
  }

}

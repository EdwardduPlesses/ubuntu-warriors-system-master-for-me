import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  invalidLogin!: boolean;
  users: any = [];

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    //checks if user is logged in (has a valid token): if true does not require login, else login page loaded
    this.authService.isUserAuthenticated();
  }

  // validateUser() {
  //   this.http.get(`${API_URL}/User/GetAllUsers`)
  //     .subscribe(results => {
  //       this.users = results;

  //       for (let user of this.users) {
  //         try {
  //           if (this.loginForm.value.password == user.UserHashedPassword && this.loginForm.value.email == user.UserEmail) {
  //             this.router.navigate(["/users"]);
  //           }
  //         } catch (error) {
  //           this.router.navigate(["/"]);
  //         }
  //       }
  //     })
  // }

  async loginUser(loginForm: any) {
    const credentials = {
      email: loginForm.value.email,
      password: loginForm.value.password
    }

    await this.authService.LoginUser(credentials)
  }

}
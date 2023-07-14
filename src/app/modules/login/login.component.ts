import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  email_address: string = "";
  password: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onSignIn(form: NgForm) {
    if (!form.valid) {
      console.log(form, 'form');
      this.isLoading = true;
      let authenticationDetails = new AuthenticationDetails({
        Username: this.email_address,
        Password: this.password,
      });
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      };

      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.email_address, Pool: userPool };
      var cognitoUser = new CognitoUser(userData);

      console.log(authenticationDetails);
      console.log(poolData);
      console.log(cognitoUser);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log(result);
          this.router.navigate(["tables"])
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
        },
      });
    }
    console.log(form, 'out form');
  }
}

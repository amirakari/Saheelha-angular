import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from './user.service';
import {Utilisateur} from '../Model/Utilisateur';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  utilisateurs: Utilisateur[];
  siteKey: string;
  theme: string;
   aFormGroup: FormGroup;
  errorMessage = '';
  message = '';
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private loginService: LoginService,
              private router: Router,
              private http: HttpClient) {
    this.siteKey = '6LfcvH0aAAAAAJHHlhuW547XmFI6Mz4oga1Z_k3h';
  }

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }
  addUtilisateur(formulaire: NgForm){
    this.userService.addUtilisateur(formulaire.value).subscribe(
      (response) => {
        console.log(formulaire);
      },
      (error) => {
        this.errorMessage = 'probleme de connexion à votre serveur';
        console.log(error);
      }
    );

  }
  login(credentials){
    this.loginService.login(credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.access_token);
        this.message = '';
        this.router.navigate(['acceuil']);
      },
      (error) => {
        console.log(error);
      }
  );
  }
}
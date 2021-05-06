import { Component, OnInit } from '@angular/core';
import {LoginService} from '../utilisateur/login.service';
import {Router} from '@angular/router';
import {Utilisateur} from '../Model/Utilisateur';
import {AffService} from '../utilisateur/profilutilisateur/aff.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: Utilisateur;
  status: boolean;
  constructor(public loginService: LoginService,
              private profiluserservice: AffService,
              private router: Router) { }

  ngOnInit(): void {
    this.profiluserservice.getUtilisateur().subscribe(
      (user) => {this.user = user;
                 console.log(this.user);
                 if (this.user.type === 'user'){
        this.status = false;
      }else {
        this.status = true;
      }
      },
      (error) => {alert(`erreur d'accés à l'api`);
                  console.log(error); }
    );
  }
logout(){
    this.loginService.logout();
}
login(){
  const link = ['login'];
  this.router.navigate(link);
}
}

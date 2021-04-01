import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProduitBoutiqueService} from '../boutique/produit-boutique/produit-boutique.service';
import {DetailsProduitService} from './details-produit.service';
import {Produit} from '../Model/Produit';
import {NgForm} from '@angular/forms';
import {CommentaireService} from './commentaire.service';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {
  @Input() boutique: Produit;
  val: number;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private listeService: DetailsProduitService,
              private commentaireService: CommentaireService, ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.listeService.getBoutique(params.id).subscribe(
          (boutique) => { this.boutique = boutique;
                          console.log(this.boutique); }
        );
      });
    console.log(this.val);
  }
  addCommentaire(Ajouterboutique: NgForm){
    this.commentaireService.addBoutique(Ajouterboutique.value).subscribe(
      (response) => {
        console.log(Ajouterboutique);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

import { Component, OnInit, EventEmitter, Output, Renderer, ElementRef,
                    ViewChild } from '@angular/core';
import { Lettre } from './../lettre/lettre';
import { ChevaletService } from './chevalet.service';

@Component({
  selector: 'chevalet-jeu',
  template: `<div #chevaletElement id="leChevalet" (keydown)="gererTouchesClavier($event.key)" 
        (keydown.Tab)="gererTab($event)"
                (click)="focusChevalet" tabindex="-1">
    <table id="tableauChevalet">
    <td *ngFor="let lettre of lettres; let i = index" class="lettreChevalet"
                               [ngClass]="{'caracteresEnRouge':posLettreChoisie === i}"> 
    <div id="caractereLettre"> {{lettre.getLettre()}} </div>
    <div id="valeurPointsLettre"> {{lettre.getValeurPoints()}} </div>
    </td>
    </table>
  </div>`,
  styles: [` .caracteresEnRouge{
    color: darkred;
}
   #tableauChevalet{
    border: 3px solid black;
    border-collapse: collapse;   
    width: 500px;
    height: 25px; 
    position: relative;
    left: 8%;
   }
   .lettreChevalet{
    background-color: #C4BDA1;
    border: 1px solid black;
    width: 71px;
    cursor: pointer;
   }
   #caractereLettre{
    font-size: 180%;
    font-weight: bold;
   }
   #valeurPointsLettre{
     text-align: right;
     font-size: 120%;
   }
   #leChevalet{
     width: 50%;
   }
   
   `]
})

export class ChevaletComponent implements OnInit{
  public connection;
  public lettres : Lettre[];  // Les lettres sur le chevalet du joueur.
  public posLettreChoisie : number;
  public nbrLettresChevalet: number;

  @Output() tabEstAppuye: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild('chevaletElement') elementChevalet: ElementRef;
  constructor(public chevaletService : ChevaletService, public renderer: Renderer) {
    this.lettres = [];
  }

  ngOnInit() : void {
    this.nbrLettresChevalet = 0;
    this.lettres = null;
    this.connection = this.chevaletService.getLettres().subscribe(nouvelleLettres => {
    this.lettres = nouvelleLettres;
     console.log("chevalet: " + this.lettres);
    });
  }

  gererTouchesClavier(touche: string){
    // si c'est une lettre.
    if (touche.match(/[a-z]/i) && touche.length === 1){
      this.choixLettre(touche);
    }
    else if (touche === "ArrowLeft" && this.posLettreChoisie !== undefined){
      this.deplacementGauche();
    }
    else if (touche === "ArrowRight" && this.posLettreChoisie !== undefined){
      this.deplacementDroit();
    }
  }

  gererTab(event: Event){
    event.preventDefault();
    this.tabEstAppuye.emit();
  }

  choixLettre(touche: string){
    let toucheMasjuscule = touche.toUpperCase();
    if (this.posLettreChoisie === undefined){
      this.posLettreChoisie = this.trouverPosPremier(toucheMasjuscule);
    }
    else if (toucheMasjuscule !== this.lettres[this.posLettreChoisie].getLettre()){
      this.posLettreChoisie = this.trouverPosPremier(toucheMasjuscule);
    }
    else{
      this.posLettreChoisie = this.trouverPosProchain(toucheMasjuscule);
    }
  }

  trouverPosPremier(lettre: string): number{
    let estTrouve = false;
    let positionTrouvee = undefined;
    for (let i = 0; i < this.lettres.length && !estTrouve; i++){
      if (this.lettres[i].getLettre() === lettre){
        positionTrouvee = i;
        estTrouve = true;
      }
    }
    return positionTrouvee;
  }

  trouverPosProchain(lettre: string): number{
    let positionParcours = this.posLettreChoisie;
    let casesAParcourir = this.lettres.length;
    let nouvellePosition = undefined;
    while (casesAParcourir > 0){
      if (this.lettres[positionParcours].getLettre() === lettre)
      {
        nouvellePosition = positionParcours;
      }
      if (positionParcours === this.lettres.length - 1){
        positionParcours = 0;
      }
      else{
        positionParcours++;
      }
      casesAParcourir--;
    }
    return nouvellePosition;
  }

  deplacementGauche(){
    if (this.posLettreChoisie > 0){
    let temp = this.lettres[this.posLettreChoisie];
    this.lettres[this.posLettreChoisie] = this.lettres[this.posLettreChoisie - 1];
    this.lettres[this.posLettreChoisie - 1] = temp;
    this.posLettreChoisie--;
  }
  else{
      let temp = this.lettres[this.posLettreChoisie];
      this.lettres[this.posLettreChoisie] = this.lettres[this.lettres.length - 1];
      this.lettres[this.lettres.length - 1] = temp;
      this.posLettreChoisie = this.lettres.length - 1;
  }
  }

  deplacementDroit(){
    if (this.posLettreChoisie < this.lettres.length - 1){
      let temp = this.lettres[this.posLettreChoisie];
      this.lettres[this.posLettreChoisie] = this.lettres[this.posLettreChoisie + 1];
      this.lettres[this.posLettreChoisie + 1] = temp;
      this.posLettreChoisie++;
    }
    else{
      let temp = this.lettres[this.posLettreChoisie];
      this.lettres[this.posLettreChoisie] = this.lettres[0];
      this.lettres[0] = temp;
      this.posLettreChoisie = 0;
    }
  }

  focusChevalet(){
    this.renderer.invokeElementMethod(this.elementChevalet.nativeElement, 'focus');
  }
}


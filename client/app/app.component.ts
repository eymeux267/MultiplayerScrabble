import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketIOService } from './SocketIOService/socketIOService';
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent implements OnInit {
  private connection;
  public partieCommencee : boolean;
  public nbrDeJoueurs : number;
  public nom : string;
  public nomConfirmer : boolean;
  public tabDeChevaletEstAppuye: boolean;
  public tabDeBoiteEstAppuye: boolean;
  public chevaletEstSelectionne: boolean;
  public partieFinie : boolean ;
  public socket: SocketIOClient.Socket;
  public estASonTour: boolean;
  public joueurQuiEstASonTour: string;
  public roomId: string;

  constructor(private socketIOService: SocketIOService) {
    this.estASonTour = false;
    this.partieFinie = false ;
    this.partieCommencee = false;
    this.nomConfirmer = false;
    this.tabDeChevaletEstAppuye = false;
    this.chevaletEstSelectionne = false;
    this.socket = socketIOService.socket;
    this.roomId = "";
    this.listenEndOfTurn();
    this.listenFirstTurnPlayer();
  }
  ngOnInit() : void {
            this.connection = this.gererFinPartie().subscribe(fin => {
            this.partieFinie = true;
        });
  }

  onConfirm(partieCommencee : boolean) {
    this.partieCommencee = partieCommencee;
  }

  getName(nom: string) {
    this.nom = nom;
    this.nomConfirmer = true;
    console.log('Le nom usager: ' + this.nom);
    console.log("nom confirmer:" + this.nomConfirmer);
    console.log("partieEstCommence" + this.partieCommencee);
  }

  gererTabDeChevalet(){
    document.getElementById("textarea").focus();
  }

  gererTabDeBoite(){
    document.getElementById("leChevalet").focus();
  }

  gererFinPartie(): Observable<string> {
   let observable = new Observable(observer => {
        this.socket.on('fin-partie', (gagnant: string) => {
        alert("Fin de partie. Le gagnant est: " + gagnant);
        this.partieFinie = true ;
        this.quitterPartie();
     });
   });
   return observable;
  }

  nouvellePartie() {
    this.estASonTour = false;
    this.joueurQuiEstASonTour = "";
    this.roomId = "";
    this.partieCommencee = false;
    this.partieFinie = false;
    this.tabDeChevaletEstAppuye = false;
    this.chevaletEstSelectionne = false;
    this.quitterPartie();
    this.gererTabDeChevalet();
  }

  listenEndOfTurn(): void{
      this.socket.on('fin-du-tour', (nomJoueur, roomId) => {
        console.log("Le tour est fini: " + nomJoueur);
        console.log("roomId du tour fini: " + roomId);
        console.log("this.roomId: " + this.roomId);
        if (this.roomId === roomId && this.partieCommencee){
          console.log("Je entre");
        this.joueurQuiEstASonTour = nomJoueur;
        if (this.nom === nomJoueur){
          this.estASonTour = true;
          console.log("cest ton tour");
        }
        else{
          this.estASonTour = false;
          console.log("cest pas ton tour");
        }
      }
     });
  }

  listenFirstTurnPlayer(): void{
       this.socket.on('debut-premier-tour', (nomJoueur, roomId) => {
        console.log("premier tour de : " + nomJoueur);
         console.log("room id : " + roomId);
         console.log("this.roomid avant:" + this.roomId);
        if (this.roomId === "" && this.partieCommencee){
          console.log("je set les shit dans first tour");
          this.joueurQuiEstASonTour = nomJoueur;
          if (nomJoueur === this.nom){
            this.estASonTour = true;
          }
          else{
            this.estASonTour = false;
          }
          this.roomId = roomId;
          console.log("this.roomid apres:" + this.roomId);
        }
     });
  }

  quitterPartie() : void {
    this.socket.emit('remove-user');
  }
}

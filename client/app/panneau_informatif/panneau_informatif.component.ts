import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { Usager } from "./../usager/usager";
import { CountdownTimerComponent } from './../timer/countdown-timer.component';
import { PanneauInformatifService } from './panneau_informatif.service';

@Component({
  selector: 'panneau-informatif',
  templateUrl: './app/panneau_informatif/panneau_informatif.component.html',
  styleUrls: ['./app/panneau_informatif/panneau_informatif.component.css']
})

export class PanneauInformatifComponent implements OnInit {
  @ViewChild(CountdownTimerComponent) chrono: CountdownTimerComponent;

  @Input() public nbrDeJoueurs: number;
  @Input() public estASonTour: boolean;
  @Input() public joueurQuiEstASonTour: string;

  private nbLettresReserveConnection;
  private tableauJoueursConnection;
  tableauJoueurs: Usager[];
  nbrLettresReserve: number;

  constructor(private panneauInformatifService: PanneauInformatifService) {
    this.tableauJoueurs = [];
  }

  ngOnInit() {
    this.nbLettresReserveConnection = this.panneauInformatifService.getNombreLettresReserve()
    .subscribe(nbrLettresReserve => {
      this.nbrLettresReserve = nbrLettresReserve;
    });

    this.tableauJoueursConnection = this.panneauInformatifService.getTableauJoueurs()
    .subscribe(tableauJoueurs => {
      this.tableauJoueurs = tableauJoueurs;
    });
  }
}

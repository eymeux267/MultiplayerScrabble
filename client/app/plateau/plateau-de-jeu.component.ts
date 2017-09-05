import { Component, OnInit } from '@angular/core';
import { PlateauService } from './plateau.service';
import { PLATEAU } from './cases-plateau';

@Component({
  selector: 'plateau-de-jeu',
  templateUrl: './app/plateau/plateau-de-jeu.component.html',
  styleUrls: ['./app/plateau/plateau-de-jeu.component.css']
})

export class PlateauJeuComponent implements OnInit{
    plateau: any;
    private identificationLignes: any;

    constructor(private plateauService: PlateauService) {
        this.identificationLignes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
    }

    ngOnInit(): void {
        this.getPlateau();
    }

    getPlateau() : void {
        this.plateau = PLATEAU;
    }
}


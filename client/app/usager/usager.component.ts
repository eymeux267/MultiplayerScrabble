import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { UsagerService } from './usager.service';
import { Usager } from './usager';

@Component({
  selector: 'entrez-nom',
  templateUrl: './app/usager/usager.component.html',
  styleUrls: ['./app/usager/usager.component.css']
})

export class UsagerComponent implements OnDestroy {
  @Output() sendName = new EventEmitter<string>();
   private usager : Usager;
   public isValid : boolean;
   public confirmed : boolean;

  constructor(private usagerService : UsagerService) {
    this.isValid = false;
    this.confirmed = false;
    this.usager = {name : "", score : 0, nbLettreChevalet : 0};
  }

  confirmer(newName : string) {
    this.confirmed = true;

    if (newName !== undefined && newName !== "") {
      console.log('Nom usager: ' + newName);
      this.usager.name = newName;
      this.usagerService.ajouterUsager(this.usager).then((response : boolean) => {
        this.isValid = response;
        if (this.isValid) {
          this.sendName.emit(this.usager.name);
        }
      });
    }
    else {
      this.isValid = false;
    }
  }

  ngOnDestroy() {
    this.usagerService.disconnect(this.usager);
  }
}


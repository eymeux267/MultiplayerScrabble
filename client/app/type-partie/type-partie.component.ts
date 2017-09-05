import { Component, EventEmitter, Output } from '@angular/core';
import { TypePartieService } from './type-partie.service';

@Component({
    selector: 'type-partie',
    templateUrl: './app/type-partie/type-partie.component.html',
    styleUrls: ['./app/type-partie/type-partie.component.css']
})
export class TypePartieComponent {
    @Output() confirmGameType = new EventEmitter<Boolean>();
    private partieConfirmee : boolean;

    constructor(private typePartieService: TypePartieService) {
        this.partieConfirmee = false;
    }

    confirmer2joueurs() {
        this.typePartieService.joinTwoPlayerRoom();
        this.partieConfirmee = true;
        this.confirmGameType.emit(this.partieConfirmee);
    }

    confirmer3joueurs() {
        this.typePartieService.joinThreePlayerRoom();
        this.partieConfirmee = true;
        this.confirmGameType.emit(this.partieConfirmee);
    }

    confirmer4joueurs() {
        this.typePartieService.joinFourPlayerRoom();
        this.partieConfirmee = true;
        this.confirmGameType.emit(this.partieConfirmee);
    }
}

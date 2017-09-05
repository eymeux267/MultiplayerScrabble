import { Component, OnInit, OnDestroy,
                                EventEmitter, Output, AfterViewInit } from '@angular/core';
import { BoiteComService } from './boite_communication.service';
import { Message } from './../message/message';
import { MENU } from './../message/menu';

@Component({
    selector: 'boite-de-communication',
    templateUrl: './app/boite_communication/boite_communication.component.html',
    styleUrls: ['./app/boite_communication/boite_communication.component.css']
})

export class BoiteCommunicationComponent implements OnInit, OnDestroy, AfterViewInit {
    private connection;
    public textMessage : string;
    private messages : Message[];
    private menuMessage : Message;

    @Output() tabEstAppuye: EventEmitter<null> = new EventEmitter<null>();

    constructor(private boiteComService : BoiteComService) {
        this.messages = [];
        this.menuMessage = MENU[0];
    }

    envoyer() : void {
        let commande : Message;
        if (this.textMessage !== undefined && this.textMessage !== null) {
            if (this.textMessage === '!aide') {
                this.pushCommande(this.menuMessage);
            }
            else {
                if (this.textMessage[0] === '!') {
                    commande = { name: 'Commande', text: this.textMessage, estCommande: true };
                    this.pushCommande(commande);
                }
                console.log('Le message envoyer: ' + this.textMessage);
                this.boiteComService.envoyerMessage(this.textMessage);
            }
        }
    }

    ngOnInit() : void {
        this.connection = this.boiteComService.getMessages().subscribe(message => {
            this.messages.push(message);
        });
    }

    ngAfterViewInit(): void{
        document.getElementById("textarea").focus();
    }

    ngOnDestroy() : void {
        this.connection.unsubscribe();
    }

    pushCommande(message : Message) {
        this.messages.push(message);
    }

    gererTouchesClavier(event: Event){
         event.preventDefault();
         this.tabEstAppuye.emit();
    }
}

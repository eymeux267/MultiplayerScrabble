import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketIOService } from './../SocketIOService/socketIOService';
import { Message } from './../message/message';

@Injectable()
export class BoiteComService {
    private socket: SocketIOClient.Socket;

    constructor(private socketIOService: SocketIOService) {
        this.socket = socketIOService.socket;
    }

    envoyerMessage(message: string): void {
        if (this.isACommand(message)) {
            let messageSeparer = message.split(" ");
            let commande = messageSeparer[0];

            let attributs = messageSeparer[1];
            for (let i = 2; i < messageSeparer.length; i++) {
                attributs += " " + messageSeparer[i];
            }
            console.log(attributs);

            this.socket.emit('command', commande, attributs);
        }
        else {
            this.socket.emit('message', message);
        }
    }

    getMessages(): Observable<Message> {
        let observable = new Observable(observer => {
            this.socket.on('message', (text: string, userName: string) => {
                console.log("Nouveau message recue de : " + userName);
                let message: Message = { name: userName, text: text, estCommande: false };
                observer.next(message);
            });
           /* this.socket.on('fin-partie', () => {

                alert("c finit bro");
            });*/
        });
        return observable;
    }

    isACommand(message: string): boolean {
        if (message[0] === "!") {
            return true;
        }
        else {
            return false;
        }
    }

}


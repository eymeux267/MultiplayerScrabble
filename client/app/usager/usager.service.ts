import { Injectable } from '@angular/core';
import { Usager } from './usager';
import { SocketIOService } from './../SocketIOService/socketIOService';

@Injectable()
export class UsagerService {
  private socket : SocketIOClient.Socket;

  constructor(private socketIOService : SocketIOService) {
    this.socket = socketIOService.socket;
  }

  ajouterUsager(user: Usager) : Promise<boolean> {
    this.socket.emit('add-user', user.name);

    return new Promise<boolean>((resolve, reject) => {
      this.socket.on('response', (response : boolean) => {
        console.log('Reponse pour ajouter usager: ' + response);
        resolve(response);
      });
    });
  }

  disconnect(user : Usager) : void {
    this.socket.emit('disconnect');
    this.socket.disconnect();
  }
}

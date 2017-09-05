import { Injectable } from '@angular/core';
import { SocketIOService } from './../SocketIOService/socketIOService';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimerService {
  private socket : SocketIOClient.Socket;
  private estASonTour: boolean;
  private finTourAEteEnvoye: boolean;

  constructor(private socketIOService : SocketIOService) {
    this.socket = socketIOService.socket;
    this.finTourAEteEnvoye = false;
  }

  setEstASonTour(estASonTour: boolean){
    this.estASonTour = estASonTour;
  }

  setFinTourAEteEnvoye(finTourAEteEnvoye: boolean){
    this.finTourAEteEnvoye = finTourAEteEnvoye;
  }

  getTime() : Observable<string> {
    let observable = new Observable(observer => {
        this.socket.on('time', (newTime : string) => {
          if (newTime === "0:00:01:00" && this.estASonTour && !this.finTourAEteEnvoye){
            this.socket.emit("fin-tour"); // si le boy est a son tour.
            this.finTourAEteEnvoye = true;
          }
          observer.next(newTime);
        });
          this.socket.on("fin-de-tour-du-joueur" , () => {
          if (this.estASonTour && !this.finTourAEteEnvoye){
          this.socket.emit("fin-tour");
          this.finTourAEteEnvoye = true;
          }
        });
    });
    return observable;
  }
}

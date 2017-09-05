import { Time } from "./time";
import { TimerService } from "./timerService";
import timeConst = require('./time-const');
const dureeTour = 30000;

export class Timer {
  public display : string;
  public roomID : string;
  private started : boolean;
  private timeCounter : number;
  private initialTime : number;
  private time : Time;
  private timerService : TimerService;

  constructor(serverio : SocketIO.Server, roomID : string) {
    this.roomID = roomID;
    this.started = false;
    this.initialTime = dureeTour;
    this.timeCounter = dureeTour;
    this.time = new Time(this.timeCounter);
    this.timerService = new TimerService(serverio);
  }

  start(roomID : string, nomJoueur : string) : void {
    this.started = true;
    this.timer(roomID, nomJoueur);
  }

  stop() : void {
    this.started = false;
    console.log("stop est appeler");
  }

  reset(roomID : string, nomJoueur : string) : void {
    console.log("reset est appeler dans " + this.roomID); // ICI EST LE PROBLEME.
    if (roomID === this.roomID){
      this.started = false;
      this.timeCounter = this.initialTime;
      this.time = new Time(this.initialTime);
      this.display = this.time.toString();
      setTimeout(() => {this.start(roomID, nomJoueur); }, 1000);
    }
  }

  getTime() : Time {
    return this.time;
  }

  timer(roomID : string, nomJoueur : string) : void {
    if (this.started === true) {
      setTimeout(() => {
        //anti-rebond (lorsqu'on reset pendant que le timer roule)
        if (this.started === true) {
          if (this.timeCounter > 0) {
            this.timeCounter -= 100;
            this.time.update(this.timeCounter);

            this.display = this.time.toString();
            this.timerService.emitTime(this.display, roomID, nomJoueur);
            this.timer(roomID, nomJoueur);

          } else {
            this.started = false;
          }
        }
      }, 1000);
    }
  }
}

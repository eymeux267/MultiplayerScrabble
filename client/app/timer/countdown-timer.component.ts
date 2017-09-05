import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { TimerService } from "./timer.service";

@Component({
  selector: 'countdown-timer-element',
  templateUrl: './app/timer/countdown-timer.component.html',
})
export class CountdownTimerComponent implements OnInit, OnChanges, OnDestroy {
  public time: string;
  public connection;
  public timerCacher: boolean;
  @Input() estASonTour: boolean;

  constructor(private timerService : TimerService) {
    this.timerCacher = false;
  }

  ngOnInit() : void {
    this.connection = this.timerService.getTime().subscribe(newTime => {
      this.time = newTime;
    });
  }

  ngOnDestroy() : void {
    console.log("Jappel on destroy du timer");
    this.timerService.setFinTourAEteEnvoye(false);
    window.location.reload(true);
  }

  ngOnChanges(): void{
    this.timerService.setEstASonTour(this.estASonTour);
    if (this.estASonTour){
        this.timerService.setFinTourAEteEnvoye(false);
      }
  }

  cacherTimer(): void {
    this.timerCacher = true;
  }

  montrerTimer(): void {
    this.timerCacher = false;
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UsagerComponent } from './usager/usager.component';
import { PlateauJeuComponent } from './plateau/plateau-de-jeu.component';
import { ChevaletComponent } from './chevalet/chevalet.component';
import { BoiteCommunicationComponent } from './boite_communication/boite_communication.component';
import { PanneauInformatifComponent } from './panneau_informatif/panneau_informatif.component';
import { TypePartieComponent } from './type-partie/type-partie.component';
import { CountdownTimerComponent } from './timer/countdown-timer.component';

import { PlateauService } from './plateau/plateau.service';
import { PanneauInformatifService } from './panneau_informatif/panneau_informatif.service';
import { ChevaletService } from './chevalet/chevalet.service';
import { UsagerService } from './usager/usager.service';
import { BoiteComService } from './boite_communication/boite_communication.service';
import { TypePartieService } from './type-partie/type-partie.service';
import { SocketIOService } from './SocketIOService/socketIOService';
import { TimerService } from './timer/timer.service';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule
    ],
  declarations: [
    AppComponent,
    UsagerComponent,
    PlateauJeuComponent,
    ChevaletComponent,
    BoiteCommunicationComponent,
    PanneauInformatifComponent,
    TypePartieComponent,
    CountdownTimerComponent,
    UsagerComponent,
    ],
  bootstrap:    [ AppComponent ],
  providers: [ PlateauService, PanneauInformatifService, UsagerService,
               BoiteComService, TypePartieService, SocketIOService, ChevaletService,
               TimerService ]
})
export class AppModule { }

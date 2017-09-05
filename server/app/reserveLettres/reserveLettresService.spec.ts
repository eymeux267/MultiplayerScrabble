import { expect } from 'chai';
import { Lettre } from './../listeLettres/lettre';
import { ListeUsagers } from './../listeUsagers/listeUsagers';
import * as socket from 'socket.io';
import * as http from 'http';
import { Application } from './../app';
import { ReserveLettresService } from './reserveLettresService';

describe('Classe Plateau', () => {
    let listeUsagers: ListeUsagers;
    const application: Application = Application.bootstrap();


    // Configuration du port d'écoute
    const appPort = normalizePort(process.env.PORT || '3002');
    application.app.set('port', appPort);
    let server = http.createServer(application.app);

    let io = socket(server);
    let reserveLettresService: ReserveLettresService = new ReserveLettresService(io, listeUsagers);

    io.sockets.on('connection', function (socket) {
      console.log("socket connecte");
  });

     it(`La methode ajustementScoreFinPartie(): devrait ajuster le score des joueurs a la fin de la partie, donc
          enlever les points des joueurs qui ne sont pas a leur tour et ajouter a celui qui est a son tour`, () => {
            listeUsagers = new ListeUsagers();
          listeUsagers.addUsager("charbel", "1");
          listeUsagers.addUsager("saad", "2");

          listeUsagers.ajouterLettre("1", "A");
          listeUsagers.ajouterLettre("1", "B");
          listeUsagers.ajouterLettre("1", "C");
          listeUsagers.ajouterLettre("1", "D");

          listeUsagers.ajouterLettre("2", "Z");
          listeUsagers.ajouterLettre("2", "A");
          listeUsagers.ajouterLettre("2", "A");
          listeUsagers.ajouterLettre("2", "D");


          reserveLettresService = new ReserveLettresService(null, listeUsagers);
          let usagers = listeUsagers.getTableauListeUsagers();
          usagers[0].aSonTour = true;
          usagers[1].aSonTour = false;
          usagers[0].ordre = 2;
          usagers[1].ordre = 1;
          usagers[0].score = 100;
          usagers[1].score = 100;
          reserveLettresService.ajustementScoreFinPartie(usagers);

          expect(usagers[0].score).to.be.equal(91);

    });

      it(`La methode calculerNbrLettres(): Compte le nbr de lettres dans un tableau`, () => {

          let lettres: Lettre[] = [];
          lettres.push(new Lettre("A"));
          lettres.push(new Lettre("B"));
          lettres.push(new Lettre(null));

          reserveLettresService = new ReserveLettresService(null, listeUsagers);

          let nbrLettres = reserveLettresService.calculerNbrLettres(lettres);

          expect(nbrLettres).to.be.equal(2);

          lettres.push(new Lettre("C"));
          lettres.push(new Lettre("C"));
          lettres.push(new Lettre(null));
          nbrLettres = reserveLettresService.calculerNbrLettres(lettres);

          expect(nbrLettres).to.be.equal(4);
    });

});

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) {return val; }
  else if (port >= 0) {return port; }
  else {return false; }
}

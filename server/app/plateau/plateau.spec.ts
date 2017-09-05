import { expect } from 'chai';
import { Plateau } from './plateau';
import { Pos } from './../pos/pos';
import { ListeUsagers } from './../listeUsagers/listeUsagers';
import * as socket from 'socket.io';
import * as http from 'http';
import { Application } from './../app';

describe('Classe Plateau', () => {

    let test1: Plateau;
    let listeUsagers: ListeUsagers;
    const application: Application = Application.bootstrap();

    // Configuration du port d'écoute
    const appPort = normalizePort(process.env.PORT || '3002');
    application.app.set('port', appPort);
    let server = http.createServer(application.app);
    let io = socket(server);

    it(`test de la methode mettreMotPlateau(): Met le mot dans le plateau`, () => {
        test1 = new Plateau("1", listeUsagers, io);
        let mot = 'A';
        test1["mettreMotPlateau"](mot, new Pos(4, 4), true);
        expect(test1["plateau"][4][4].getLettre().getLettre()).to.be.equal('A');
    });

    it(`test de la methode insererMot(): Fait toutes les verification necessaire et insere un mot`, () => {
        listeUsagers = new ListeUsagers();
        listeUsagers.addUsager("George", "1");
        listeUsagers.setASonTour("1", true);
        listeUsagers.setUserRoomID("1", "1");
        listeUsagers.ajouterLettre("1", "A");
        listeUsagers.ajouterLettre("1", "L");
        listeUsagers.ajouterLettre("1", "E");
        listeUsagers.ajouterLettre("1", "R");
        listeUsagers.ajouterLettre("1", "T");
        listeUsagers.ajouterLettre("1", "E");

        test1 = new Plateau("1", listeUsagers, io);
        let motJuste = 'ALERTE';
        let motInJuste = 'FAKE_WORD';

        let resultatInsertion = expect(test1.insererMot(motJuste, "e8v", "1")).to.be.true;
        if (resultatInsertion.is.true) {
            expect(test1["plateau"][4][7].getLettre().getLettre()).to.be.equal('A');
            expect(test1["plateau"][5][7].getLettre().getLettre()).to.be.equal('L');
            expect(test1["plateau"][6][7].getLettre().getLettre()).to.be.equal('E');
            expect(test1["plateau"][7][7].getLettre().getLettre()).to.be.equal('R');
            expect(test1["plateau"][8][7].getLettre().getLettre()).to.be.equal('T');
            expect(test1["plateau"][9][7].getLettre().getLettre()).to.be.equal('E');
        }

        expect(test1["insererMot"](motInJuste, "a9v", "1")).to.be.false;

    });

    it(`test de la methode insererMot(): Fait toutes les verification necessaire et insere un mot`, () => {
        listeUsagers = new ListeUsagers();
        listeUsagers.addUsager("George", "1");
        listeUsagers.setASonTour("1", true);
        listeUsagers.setUserRoomID("1", "1");
        listeUsagers.ajouterLettre("1", "A");
        listeUsagers.ajouterLettre("1", "L");
        listeUsagers.ajouterLettre("1", "E");
        listeUsagers.ajouterLettre("1", "R");
        listeUsagers.ajouterLettre("1", "T");
        listeUsagers.ajouterLettre("1", "E");

        test1 = new Plateau("1", listeUsagers, io);
        let mot = 'ALERTE';

        test1.insererMot(mot, "e8v", "1");

        let lettres = test1.getLettresPlateau();
        expect(lettres[4][7].getLettre()).to.be.equal('A');
        expect(lettres[5][7].getLettre()).to.be.equal('L');
        expect(lettres[6][7].getLettre()).to.be.equal('E');
        expect(lettres[7][7].getLettre()).to.be.equal('R');
        expect(lettres[8][7].getLettre()).to.be.equal('T');
        expect(lettres[9][7].getLettre()).to.be.equal('E');

        expect(lettres[10][10]).to.be.null;
    });
});

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) {return val; }
  else if (port >= 0) {return port; }
  else {return false; }
}

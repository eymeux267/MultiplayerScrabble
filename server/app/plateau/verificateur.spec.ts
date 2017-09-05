import { expect } from 'chai';
import { Plateau } from './plateau';
import { Lettre } from './../listeLettres/lettre';
import { Pos } from './../pos/pos';
import { ListeUsagers } from './../listeUsagers/listeUsagers';
import * as socket from 'socket.io';
import * as http from 'http';
import { Application } from './../app';
import { Verificateur } from './verificateur';
import { Case } from './../plateau/case';

describe('Classe Plateau', () => {
    const VERTICAL = false;
    const HORIZONTAL = true;
    const MOT = 0;

    let plateau: Plateau;
    let listeUsagers: ListeUsagers;
    const application: Application = Application.bootstrap();

    // Configuration du port d'écoute
    const appPort = normalizePort(process.env.PORT || '3002');
    application.app.set('port', appPort);
    let server = http.createServer(application.app);
    let io = socket(server);

    it(`test de la methode verifierMotDictionnaire(): Verifie si le mot est dans le dictionnaire`, () => {
        listeUsagers = new ListeUsagers();
        plateau = new Plateau("1", listeUsagers, io);
        let verificateur = new Verificateur(plateau.getPlateauTableau(), listeUsagers, "1", io);
        let motJuste = "SALUT";
        let motInjuste = "ABCDE";
        expect(verificateur["verifierMotDictionnaire"](motJuste)).to.be.true;
        expect(verificateur["verifierMotDictionnaire"](motInjuste)).to.be.false;
    });

    it(`test de la methode verifierMotJoueur(): Verifie si le mot est dans la liste de lettres du Joueur`, () => {
        listeUsagers = new ListeUsagers();
        listeUsagers.addUsager("George", "1");
        listeUsagers.setASonTour("1", true);
        listeUsagers.setUserRoomID("1", "1");
        listeUsagers.ajouterLettre("1", "A");
        listeUsagers.ajouterLettre("1", "B");
        listeUsagers.ajouterLettre("1", "C");
        let pos = new Pos(0, 0);
        let orientation = HORIZONTAL;
        plateau = new Plateau("1", listeUsagers, io);
        let verificateur = new Verificateur(plateau.getPlateauTableau(), listeUsagers, "1", io);
        let motJuste = "ABC";
        let motInjuste = "ABCD";
        expect(verificateur["verifierMotJoueur"](motJuste, pos, orientation)).to.be.true;
        expect(verificateur["verifierMotJoueur"](motInjuste, pos, orientation)).to.be.false;
    });

    it(`test de la methode verifierMotPlateau(): Verifie si le mot est ne depasse pas les limitesdu plateau`, () => {
        plateau = new Plateau("1", listeUsagers, io);
        let verificateur = new Verificateur(plateau.getPlateauTableau(), listeUsagers, "1", io);
        expect(verificateur["verifierMotPlateau"]("salut", new Pos(4, 4), HORIZONTAL)).to.be.true;
        expect(verificateur["verifierMotPlateau"]("A", new Pos(5, 4), HORIZONTAL)).to.be.true;
        expect(verificateur["verifierMotPlateau"]("hi", new Pos(14, 14), VERTICAL)).to.be.false;
    });

    it(`test de la methode bonnePremiereInsertion(): verifie que la premiere insertion passe par la 
             case etoile au milieu`, () => {
        plateau = new Plateau("1", listeUsagers, io);
        let verificateur = new Verificateur(plateau.getPlateauTableau(), listeUsagers, "1", io);

        expect(verificateur["bonnePremiereInsertion"]("salut", new Pos(4, 4), HORIZONTAL)).to.be.false;
        expect(verificateur["bonnePremiereInsertion"]("salut", new Pos(7, 6), HORIZONTAL)).to.be.true;
        expect(verificateur["bonnePremiereInsertion"]("h", new Pos(7, 6), HORIZONTAL)).to.be.false;
        expect(verificateur["bonnePremiereInsertion"]("h", new Pos(7, 7), HORIZONTAL)).to.be.true;
        expect(verificateur["bonnePremiereInsertion"]("ha", new Pos(5, 7), VERTICAL)).to.be.false;
        expect(verificateur["bonnePremiereInsertion"]("hah", new Pos(5, 7), VERTICAL)).to.be.true;
        expect(verificateur["bonnePremiereInsertion"]("haha", new Pos(5, 8), VERTICAL)).to.be.false;
        expect(verificateur["bonnePremiereInsertion"]("hahahah", new Pos(0, 7), VERTICAL)).to.be.false;
        expect(verificateur["bonnePremiereInsertion"]("hahahaha", new Pos(0, 7), VERTICAL)).to.be.true;
    });

    it(`test de la methode plateauEstVide(): verifie que le plateau est vide`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);
        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);
        expect(verificateur["plateauEstVide"]()).to.be.true;
        nouveauPlateau.getPlateauTableau()[8][8].setLettre(new Lettre("a"));
        expect(verificateur["plateauEstVide"]()).to.be.false;
    });

    it(`test de la methode verifierPremiereInsertionMilieu(): appelle la methode bonnePremiereInsertion()
            seulement si le plateau est vide`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);
        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);
        expect(verificateur["verifierPremiereInsertionMilieu"]("salut", new Pos(4, 4), HORIZONTAL)).to.be.false;
        nouveauPlateau.getPlateauTableau()[8][8].setLettre(new Lettre("a"));
        expect(verificateur["verifierPremiereInsertionMilieu"]("salut", new Pos(4, 4), HORIZONTAL)).to.be.true;
    });

    it(`test de la methode verifierCaseToucheAuMoinsUneAutreLettre(): verifie que la case touche au moins une autre 
        lettre sur le plateau`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);

        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);
        // Ne fait pas la verification si le plateau est vide.
        nouveauPlateau.getPlateauTableau()[8][8].setLettre(new Lettre("a"));
        nouveauPlateau.getPlateauTableau()[8][9].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[8][10].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[8][11].setLettre(new Lettre("o"));

        expect(verificateur["verifierCaseToucheAuMoinsUneAutreLettre"](new Pos(4, 4), HORIZONTAL)).to.be.false;
        expect(verificateur["verifierCaseToucheAuMoinsUneAutreLettre"](new Pos(8, 7), HORIZONTAL)).to.be.true;
        expect(verificateur["verifierCaseToucheAuMoinsUneAutreLettre"](new Pos(9, 10), VERTICAL)).to.be.true;

        expect(verificateur["verifierCaseToucheAuMoinsUneAutreLettre"](new Pos(5, 11), VERTICAL)).to.be.false;
        expect(verificateur["verifierCaseToucheAuMoinsUneAutreLettre"](new Pos(8, 12), VERTICAL)).to.be.true;
    });

    it(`test de la methode verifierMotToucheAuMoinsUneAutreLettre(): verifie que le mot touche au moins une autre 
        lettre sur le plateau`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);

        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);
        // Ne fait pas la verification si le plateau est vide.
        expect(verificateur["verifierMotToucheAuMoinsUneAutreLettre"]("salut", new Pos(4, 4), HORIZONTAL)).to.be.true;
        nouveauPlateau.getPlateauTableau()[8][8].setLettre(new Lettre("a"));
        nouveauPlateau.getPlateauTableau()[8][9].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[8][10].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[8][11].setLettre(new Lettre("o"));

        expect(verificateur["verifierMotToucheAuMoinsUneAutreLettre"]("salut", new Pos(4, 4), HORIZONTAL)).to.be.false;
        expect(verificateur["verifierMotToucheAuMoinsUneAutreLettre"]("h", new Pos(9, 7), HORIZONTAL)).to.be.false;
        expect(verificateur["verifierMotToucheAuMoinsUneAutreLettre"]("ha", new Pos(9, 7), HORIZONTAL)).to.be.true;

        expect(verificateur["verifierMotToucheAuMoinsUneAutreLettre"]("ha", new Pos(5, 11), VERTICAL)).to.be.false;
        expect(verificateur["verifierMotToucheAuMoinsUneAutreLettre"]("hah", new Pos(5, 11), VERTICAL)).to.be.true;
    });

    it(`test de la methode getPosColDuDebutDuMotHorizontal(): Quand on insere horizontalement, on retourne
            a la position initiale du mot forme horizontalement sur le plateau`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);

        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);

        expect(verificateur["getPosColDuDebutDuMotHorizontal"](4, 4,
                     nouveauPlateau.getPlateauTableau())).to.be.equal(4);
        expect(verificateur["getPosColDuDebutDuMotHorizontal"](6, 4,
                     nouveauPlateau.getPlateauTableau())).to.be.equal(4);

        nouveauPlateau.getPlateauTableau()[8][8].setLettre(new Lettre("a"));
        nouveauPlateau.getPlateauTableau()[8][9].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[8][10].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[8][11].setLettre(new Lettre("o"));

        expect(verificateur["getPosColDuDebutDuMotHorizontal"](8, 12,
                     nouveauPlateau.getPlateauTableau())).to.be.equal(8);
    });

    it(`test de la methode getPosRowDuDebutDuMotVertical(): Quand on insere horizontalement, on retourne
            a la position initiale du mot forme horizontalement sur le plateau`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);

        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);

        expect(verificateur["getPosRowDuDebutDuMotVertical"](4, 4,
                     nouveauPlateau.getPlateauTableau())).to.be.equal(4);
        expect(verificateur["getPosRowDuDebutDuMotVertical"](4, 6,
                     nouveauPlateau.getPlateauTableau())).to.be.equal(4);

        nouveauPlateau.getPlateauTableau()[8][8].setLettre(new Lettre("a"));
        nouveauPlateau.getPlateauTableau()[9][8].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[10][8].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[11][8].setLettre(new Lettre("o"));

        expect(verificateur["getPosRowDuDebutDuMotVertical"](12, 8,
                     nouveauPlateau.getPlateauTableau())).to.be.equal(8);
    });
     it(`motPresent s'assure que le mot est disponible dans la liste passer en argument`, () => {
        listeUsagers = new ListeUsagers();
        listeUsagers.addUsager("George", "1");
        listeUsagers.setASonTour("1", true);
        listeUsagers.setUserRoomID("1", "1");
        listeUsagers.ajouterLettre("1", "A");
        listeUsagers.ajouterLettre("1", "B");
        listeUsagers.ajouterLettre("1", "C");

        let myArr : Lettre[] = [];
        myArr.push(new Lettre("A"));
        myArr.push(new Lettre("A"));

        let nouveauPlateau = new Plateau("1", listeUsagers, io);
        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);
        expect(verificateur.motPresent(myArr, "AA")).to.be.true;
    });
     it(`motPresent donne a * la valeur dont l'usager a besoin`, () => {
        listeUsagers = new ListeUsagers();
        listeUsagers.addUsager("George", "1");
        listeUsagers.setASonTour("1", true);
        listeUsagers.setUserRoomID("1", "1");
        listeUsagers.ajouterLettre("1", "*");
        listeUsagers.ajouterLettre("1", "*");
        listeUsagers.ajouterLettre("1", "*");
        listeUsagers.ajouterLettre("1", "*");
        listeUsagers.ajouterLettre("1", "*");

        let myArr : Lettre[] = [];
        myArr.push(new Lettre("*"));
        myArr.push(new Lettre("*"));
        myArr.push(new Lettre("*"));
        myArr.push(new Lettre("*"));
        myArr.push(new Lettre("*"));

        let nouveauPlateau = new Plateau("1", listeUsagers, io);
        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);
        expect(verificateur.motPresent(myArr, "Salut")).to.be.true;
    });
    it(`motPresent update le chevalet apres validation`, () => {
        listeUsagers = new ListeUsagers();
        listeUsagers.addUsager("George", "1");
        listeUsagers.setASonTour("1", true);
        listeUsagers.setUserRoomID("1", "1");
        listeUsagers.ajouterLettre("1", "S");
        listeUsagers.ajouterLettre("1", "A");
        listeUsagers.ajouterLettre("1", "*");
        listeUsagers.ajouterLettre("1", "L");
        listeUsagers.ajouterLettre("1", "U");
        listeUsagers.ajouterLettre("1", "T");

        let myArr : Lettre[] = [];
        myArr.push(new Lettre("*"));
        myArr.push(new Lettre("*"));
        myArr.push(new Lettre("*"));
        myArr.push(new Lettre("*"));
        myArr.push(new Lettre("*"));

        let nouveauPlateau = new Plateau("1", listeUsagers, io);
        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);
        verificateur.motPresent(myArr, "Salut");
        expect(listeUsagers.getLettres("1")).to.not.be.null;
    });

    it(`test de la methode getPosRowDuDebutDuMotVertical(): Quand on insere horizontalement, on retourne
            a la position initiale du mot forme horizontalement sur le plateau`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);

        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);

        expect(verificateur["getPosRowDuDebutDuMotVertical"](4, 4,
                     nouveauPlateau.getPlateauTableau())).to.be.equal(4);
        expect(verificateur["getPosRowDuDebutDuMotVertical"](4, 6,
                     nouveauPlateau.getPlateauTableau())).to.be.equal(4);

        nouveauPlateau.getPlateauTableau()[8][8].setLettre(new Lettre("a"));
        nouveauPlateau.getPlateauTableau()[9][8].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[10][8].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[11][8].setLettre(new Lettre("o"));

        expect(verificateur["getPosRowDuDebutDuMotVertical"](12, 8,
                     nouveauPlateau.getPlateauTableau())).to.be.equal(8);
    });

    it(`test de la methode ajouterMotHorizontal(): On donne la position du debut du mot, et la methode
            devrait le parcourir horizontalement et l'ajouter a la liste des nouveaux mots formes`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);

        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);

        nouveauPlateau.getPlateauTableau()[8][8].setLettre(new Lettre("a"));
        nouveauPlateau.getPlateauTableau()[8][9].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[8][10].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[8][11].setLettre(new Lettre("o"));

        verificateur["ajouterMotHorizontal"](8, 8, nouveauPlateau.getPlateauTableau());
        nouveauPlateau.getPlateauTableau()[8][12].setLettre(new Lettre("s"));
        verificateur["ajouterMotHorizontal"](8, 8, nouveauPlateau.getPlateauTableau());
        expect(verificateur.getNouveauxMotsCrees()[0][MOT]).to.be.equal("allo");
        expect(verificateur.getNouveauxMotsCrees()[1][MOT]).to.be.equal("allos");
    });

    it(`test de la methode ajouterMotVertical(): On donne la position du debut du mot, et la methode
            devrait le parcourir horizontalement et l'ajouter a la liste des nouveaux mots formes`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);

        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);

        nouveauPlateau.getPlateauTableau()[8][8].setLettre(new Lettre("a"));
        nouveauPlateau.getPlateauTableau()[9][8].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[10][8].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[11][8].setLettre(new Lettre("o"));

        verificateur["ajouterMotVertical"](8, 8, nouveauPlateau.getPlateauTableau());
        nouveauPlateau.getPlateauTableau()[12][8].setLettre(new Lettre("s"));
        verificateur["ajouterMotVertical"](8, 8, nouveauPlateau.getPlateauTableau());
        expect(verificateur.getNouveauxMotsCrees()[0][MOT]).to.be.equal("allo");
        expect(verificateur.getNouveauxMotsCrees()[1][MOT]).to.be.equal("allos");
    });

    it(`test de la methode mettreNouvellesLettresPlateau(): Elle doit placer le nouveau mot sur le 
         plateau quon lui donne en parametre.`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);

        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);

        let plateauAvecNouvellesLettres: Array<Array<Case>> = [];
        for (let i = 0; i < nouveauPlateau.getPlateauTableau().length; i++){
            let ligne = [];
            for (let j = 0; j < plateau.getPlateauTableau().length; j++){
                ligne.push(Object.create(plateau.getPlateauTableau()[i][j]));
            }
            plateauAvecNouvellesLettres.push(ligne);
        }
        verificateur["mettreNouvellesLettresPlateau"]("hello", new Pos(8, 8),
                                 HORIZONTAL, plateauAvecNouvellesLettres);
        expect(plateauAvecNouvellesLettres[8][8].getLettre().getLettre()).to.be.equal("h");
        expect(plateauAvecNouvellesLettres[8][9].getLettre().getLettre()).to.be.equal("e");
        expect(plateauAvecNouvellesLettres[8][10].getLettre().getLettre()).to.be.equal("l");
        expect(plateauAvecNouvellesLettres[8][11].getLettre().getLettre()).to.be.equal("l");
        expect(plateauAvecNouvellesLettres[8][12].getLettre().getLettre()).to.be.equal("o");
    });

    it(`test de la methode trouverNouveauxMotsFormes(): Doit trouver les nouveaux mots formes lors dune 
        insertion dans le plateau et les mettre dans lattribut nouveauxMotsFormes. (cas de mot simple)`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);

        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);

        verificateur["trouverNouveauxMotsFormes"]("salut", new Pos(7, 7), HORIZONTAL);
        expect(verificateur.getNouveauxMotsCrees()[0][MOT]).to.be.equal("salut");
        expect(verificateur.getNouveauxMotsCrees().length).to.be.equal(1);
    });

    it(`test de la methode trouverNouveauxMotsFormes(): Doit trouver les nouveaux mots formes lors dune 
        insertion dans le plateau et les mettre dans lattribut nouveauxMotsFormes. (cas de plusieurs mots)`, () => {
        let nouveauPlateau = new Plateau("1", listeUsagers, io);

        let verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);

        nouveauPlateau.getPlateauTableau()[8][8].setLettre(new Lettre("a"));
        nouveauPlateau.getPlateauTableau()[8][9].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[8][10].setLettre(new Lettre("l"));
        nouveauPlateau.getPlateauTableau()[8][11].setLettre(new Lettre("o"));

        verificateur["trouverNouveauxMotsFormes"]("ne", new Pos(9, 8), VERTICAL);
        expect(verificateur.getNouveauxMotsCrees()[0][MOT]).to.be.equal("ane");
        expect(verificateur.getNouveauxMotsCrees().length).to.be.equal(1);

        nouveauPlateau.getPlateauTableau()[9][8].setLettre(new Lettre("n"));
        nouveauPlateau.getPlateauTableau()[10][8].setLettre(new Lettre("e"));

        verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);
        verificateur["trouverNouveauxMotsFormes"]("sauce", new Pos(11, 8), HORIZONTAL);

        expect(verificateur.getNouveauxMotsCrees()[0][MOT]).to.be.equal("sauce");
        expect(verificateur.getNouveauxMotsCrees()[1][MOT]).to.be.equal("anes");
        expect(verificateur.getNouveauxMotsCrees().length).to.be.equal(2);

        nouveauPlateau.getPlateauTableau()[11][8].setLettre(new Lettre("s"));
        nouveauPlateau.getPlateauTableau()[11][9].setLettre(new Lettre("a"));
        nouveauPlateau.getPlateauTableau()[11][10].setLettre(new Lettre("u"));
        nouveauPlateau.getPlateauTableau()[11][11].setLettre(new Lettre("c"));
        nouveauPlateau.getPlateauTableau()[11][12].setLettre(new Lettre("e"));

        verificateur = new Verificateur(nouveauPlateau.getPlateauTableau(), listeUsagers, "1", io);
        verificateur["trouverNouveauxMotsFormes"]("lima", new Pos(8, 9), VERTICAL);

        expect(verificateur.getNouveauxMotsCrees()[0][MOT]).to.be.equal("lima");
        expect(verificateur.getNouveauxMotsCrees()[1][MOT]).to.be.equal("ni");
        expect(verificateur.getNouveauxMotsCrees()[2][MOT]).to.be.equal("em");
        expect(verificateur.getNouveauxMotsCrees().length).to.be.equal(3);

    });
});

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) {return val; }
  else if (port >= 0) {return port; }
  else {return false; }
}

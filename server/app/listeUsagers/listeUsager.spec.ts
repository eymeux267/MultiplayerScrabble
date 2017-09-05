import { expect } from 'chai';
import { ListeUsagers } from './../listeUsagers/listeUsagers';

describe('ListeUsagers' , () => {

    it(`addUsager() ajoute bien un usager a la liste`, () => {
       let listeUsager: ListeUsagers = new ListeUsagers();
       listeUsager.addUsager("Saad", "1");
       listeUsager.addUsager("tv", "2");
       listeUsager.addUsager("oli", "3");
       listeUsager.addUsager("sd", "4");
       let tableauRetourne = listeUsager.getTableauListeUsagers();
       expect(tableauRetourne.length).to.be.equal(4);
       expect(tableauRetourne[0].name).to.be.equal("Saad");
       expect(tableauRetourne[1].name).to.be.equal("tv");
       expect(tableauRetourne[2].name).to.be.equal("oli");
       expect(tableauRetourne[3].name).to.be.equal("sd");
    });

     it(`removeUsager() enleve bien un usager a la liste`, () => {
       let listeUsager: ListeUsagers = new ListeUsagers();
       listeUsager.addUsager("Saad", "1");
       listeUsager.addUsager("tv", "2");
       listeUsager.addUsager("oli", "3");
       listeUsager.addUsager("sd", "4");

       listeUsager.removeUsager("2");
       let tableauRetourne = listeUsager.getTableauListeUsagers();
       expect(tableauRetourne.length).to.be.equal(3);
       let contientTv = false;
       for (let i of tableauRetourne){
           if (i.name === "tv"){
              contientTv = true;
           }
       }
       expect(contientTv).to.be.false;
    });

    it(`ajouterLettre() ajoute bien la lettre a l'usager`, () => {
       let listeUsager: ListeUsagers = new ListeUsagers();
       listeUsager.addUsager("Saad", "1");
       listeUsager.addUsager("tv", "2");
       listeUsager.addUsager("oli", "3");
       listeUsager.addUsager("sd", "4");

       listeUsager.ajouterLettre("2", "L");
       let tableauRetourne = listeUsager.getTableauListeUsagers();
       expect(tableauRetourne[listeUsager.findUsagerIndex("2")].listeLettres.isLettrePresent("L")).to.be.equal(true);
    });


    it(`confirmerUserName() confirme bien que le nom est contenu dans la liste`, () => {
       let listeUsager: ListeUsagers = new ListeUsagers();
       listeUsager.addUsager("Saad", "1");
       listeUsager.addUsager("tv", "2");
       listeUsager.addUsager("oli", "3");
       listeUsager.addUsager("sd", "4");

       expect(listeUsager.confirmUserName("Saad")).to.be.equal(true);
       expect(listeUsager.confirmUserName("tv")).to.be.equal(true);
       expect(listeUsager.confirmUserName("oli")).to.be.equal(true);
       expect(listeUsager.confirmUserName("sd")).to.be.equal(true);
       expect(listeUsager.confirmUserName("manel")).to.be.equal(false);
    });

    it(`findUsagerIndex() trouve le bon index`, () => {
       let listeUsager: ListeUsagers = new ListeUsagers();
       listeUsager.addUsager("Saad", "1");
       listeUsager.addUsager("tv", "2");
       listeUsager.addUsager("oli", "3");
       listeUsager.addUsager("sd", "4");

       expect(listeUsager.findUsagerIndex("1")).to.be.equal(0);
       expect(listeUsager.findUsagerIndex("2")).to.be.equal(1);
       expect(listeUsager.findUsagerIndex("3")).to.be.equal(2);
       expect(listeUsager.findUsagerIndex("4")).to.be.equal(3);
    });

    it(`removeLettre() enleve bien la lettre de l'usager`, () => {
       let listeUsager: ListeUsagers = new ListeUsagers();
       listeUsager.addUsager("Saad", "1");
       listeUsager.addUsager("tv", "2");
       listeUsager.addUsager("oli", "3");
       listeUsager.addUsager("sd", "4");

       expect(listeUsager.confirmUserName("Saad")).to.be.equal(true);
       expect(listeUsager.confirmUserName("tv")).to.be.equal(true);
       expect(listeUsager.confirmUserName("oli")).to.be.equal(true);
       expect(listeUsager.confirmUserName("sd")).to.be.equal(true);
       expect(listeUsager.confirmUserName("manel")).to.be.equal(false);
    });

    it(`findUsagerIndex() trouve le bon index`, () => {
       let listeUsager: ListeUsagers = new ListeUsagers();
       listeUsager.addUsager("Saad", "1");
       listeUsager.addUsager("tv", "2");
       listeUsager.addUsager("oli", "3");
       listeUsager.addUsager("sd", "4");

       listeUsager.ajouterLettre("2", "L");
       let tableauRetourne = listeUsager.getTableauListeUsagers();
       expect(tableauRetourne[listeUsager.findUsagerIndex("2")].listeLettres.isLettrePresent("L")).to.be.equal(true);

       listeUsager.removeLettre("2", "L");
       expect(tableauRetourne[listeUsager.findUsagerIndex("2")].listeLettres.isLettrePresent("L")).to.be.equal(false);
    });


});


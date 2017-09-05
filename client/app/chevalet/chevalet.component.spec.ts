
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { expect } from 'chai';

import { ChevaletComponent } from './chevalet.component';
import { ChevaletService } from './chevalet.service';
import { Lettre } from './../lettre/lettre';

  const TAILLECHEVALET = 7;
  const NOMBRELETTRESALPHABET = 26;
  let valeursLettres = new Map<string, number>([
      ['A', 1],
      ['B', 3],
      ['C', 3],
      ['D', 2],
      ['E', 1],
      ['F', 4],
      ['G', 2],
      ['H', 4],
      ['I', 1],
      ['J', 8],
      ['K', 10],
      ['L', 1],
      ['M', 2],
      ['N', 1],
      ['O', 1],
      ['P', 3],
      ['Q', 8],
      ['R', 1],
      ['S', 1],
      ['T', 1],
      ['U', 1],
      ['V', 4],
      ['W', 10],
      ['X', 10],
      ['Y', 10],
      ['Z', 10]
  ]);

  let alphabet: string[] = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                             'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                             'U', 'V', 'W', 'X', 'Y', 'Z' ];
  const lettreK : Lettre = new Lettre('K', valeursLettres.get('K'));
  const lettreO : Lettre = new Lettre('O', valeursLettres.get('O'));
describe('ChevaletComponent (templateUrl)', () => {


  let comp: ChevaletComponent;
  let fixture: ComponentFixture<ChevaletComponent>;

  let tableauLettre : Lettre[] = [];
  valeursLettres.forEach((valeur : number, lettre : string) => {
    tableauLettre.push(new Lettre(lettre, valeur));
  });

  let chevaletServiceStub = {
    getLettres() : Observable<Array<Lettre>>{
      let observable = new Observable(observer => {
        let chevalet : Array<Lettre> = [];
        for (let i = 0; i < TAILLECHEVALET; i++){
          chevalet.push(tableauLettre[randomNumber(NOMBRELETTRESALPHABET - 1)]);
        }
        observer.next(chevalet);
      });

      return observable;
    }
  };

  it(`Test de méthode de test: exclureAlphabet devrait enlever le contenu du chevalet de l'alphabet`, () => {
    let chevaletTest : string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    let caracteresNonPresents : string[] = exclureAlphabet(chevaletTest);
    expect(caracteresNonPresents.length).to.be.equal(NOMBRELETTRESALPHABET - TAILLECHEVALET);
    for (let lettre of chevaletTest){
      expect(caracteresNonPresents.indexOf(lettre)).to.be.lessThan(0);
    }
  });

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
       declarations: [ ChevaletComponent ],
       providers:    [ {provide: ChevaletService, useValue: chevaletServiceStub } ]
    })
    .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {

    fixture = TestBed.createComponent(ChevaletComponent);
    comp = fixture.componentInstance;
    require("chai").use(require("sinon-chai"));
  });

  it(`Si une lettre appuyée n'est pas dans le chevalet, rien ne devrait être sélectionné`, () => {

    let chevaletTest : Lettre[];
    fixture.detectChanges();
    chevaletTest = comp.lettres;
    let caracteresChevalet : string[] = getChars(chevaletTest);
    let caracteresNonPresents : string[] = exclureAlphabet(caracteresChevalet);

    for (let toucheTest of caracteresNonPresents) {
      comp.gererTouchesClavier(toucheTest.charAt(0));
      fixture.detectChanges();
      expect(comp.posLettreChoisie).to.be.equal(undefined);
    }
  });

  it(`Si une lettre appuyée est dans le chevalet, elle devrait être sélectionnée`, () => {

    let chevaletTest : Lettre[];
    fixture.detectChanges();
    chevaletTest = comp.lettres;
    let caracteresChevalet : string[] = getChars(chevaletTest);

    for (let toucheTest of caracteresChevalet) {
      comp.gererTouchesClavier(toucheTest.charAt(0));
      fixture.detectChanges();
      let positionChoisie = comp.posLettreChoisie;
      let lettreChoisie : Lettre = comp.lettres[positionChoisie];
      expect(lettreChoisie).to.be.equal(chevaletTest[positionChoisie]);
    }
  });

  it(`S'il y a plusieurs fois la même lettre dans le chevalet, elles devraient être choisies séquentiellement`, () => {
    let chevaletTest : Lettre[] = [lettreK, lettreO, lettreK, lettreO, lettreO, lettreK, lettreK];
    fixture.detectChanges();
    comp.lettres = chevaletTest;
    let caracteresChevalet : string[] = getChars(chevaletTest);

    for (let toucheTest of caracteresChevalet) {
      comp.gererTouchesClavier(toucheTest.charAt(0));
      fixture.detectChanges();
      let positionChoisie = comp.posLettreChoisie;
      let lettreChoisie : Lettre = comp.lettres[positionChoisie];
      expect(lettreChoisie).to.be.equal(chevaletTest[positionChoisie]);
    }
  });

  it(`Les touches de déplacement ne devraient pas changer le chevalet si aucune lettre n'est sélectionnée`, () => {
    let chevaletAttendu : Lettre[] = [lettreO, lettreK, lettreK, lettreK, lettreK, lettreK, lettreK];
    let chevaletTest : Lettre[] = [lettreO, lettreK, lettreK, lettreK, lettreK, lettreK, lettreK];
    //self-test d'égalité, les deux chevalets devraient être égaux
    expect(chevaletTest).to.be.deep.equal(chevaletAttendu);

    fixture.detectChanges();
    comp.lettres = chevaletTest;

    comp.gererTouchesClavier("ArrowLeft");
    fixture.detectChanges();
    expect(comp.lettres).to.be.deep.equal(chevaletAttendu);

    comp.gererTouchesClavier("ArrowRight");
    comp.gererTouchesClavier("ArrowRight");
    fixture.detectChanges();
    expect(comp.lettres).to.be.deep.equal(chevaletAttendu);

  });

  it(`Les touches de déplacement devraient déplacer la lettre sélectionnée sur le chevalet`, () => {
    let chevaletAttendu : Lettre[];
    let chevaletTest : Lettre[] = [lettreO, lettreK, lettreK, lettreK, lettreK, lettreK, lettreK];

    fixture.detectChanges();
    comp.lettres = chevaletTest;

    comp.gererTouchesClavier('O');
    comp.gererTouchesClavier("ArrowRight");
    comp.gererTouchesClavier("ArrowRight");
    fixture.detectChanges();
    chevaletAttendu = [lettreK, lettreK, lettreO, lettreK, lettreK, lettreK, lettreK];
    expect(comp.lettres).to.be.deep.equal(chevaletAttendu);

    comp.gererTouchesClavier("ArrowLeft");
    fixture.detectChanges();
    chevaletAttendu = [lettreK, lettreO, lettreK, lettreK, lettreK, lettreK, lettreK];
    expect(comp.lettres).to.be.deep.equal(chevaletAttendu);

  });

  it(`La lettre sélectionnée devrait aller à la fin ou au début du chevalet quand elle est à une extrémitée`, () => {
    let chevaletAttendu : Lettre[];
    let chevaletTest : Lettre[] = [lettreO, lettreK, lettreK, lettreK, lettreK, lettreK, lettreK];

    fixture.detectChanges();
    comp.lettres = chevaletTest;

    comp.gererTouchesClavier('O');
    comp.gererTouchesClavier("ArrowLeft");
    fixture.detectChanges();
    chevaletAttendu = [lettreK, lettreK, lettreK, lettreK, lettreK, lettreK, lettreO];
    expect(comp.lettres).to.be.deep.equal(chevaletAttendu);

    comp.gererTouchesClavier("ArrowRight");
    fixture.detectChanges();
    chevaletAttendu = [lettreO, lettreK, lettreK, lettreK, lettreK, lettreK, lettreK];
    expect(comp.lettres).to.be.deep.equal(chevaletAttendu);
  });

  it(`Test exhaustif simulant un nombre arbitraire de déplacements à droite`, () => {
    let chevaletTest : Lettre[] = [lettreO, lettreK, lettreK, lettreK, lettreK, lettreK, lettreK];
    let positionAttendue = 0;
    let nombreDeplacements = 101;

    fixture.detectChanges();
    comp.lettres = chevaletTest;

    comp.gererTouchesClavier('O');
    for (let i = 0; i < nombreDeplacements; i ++){
      comp.gererTouchesClavier("ArrowRight");
    }
    fixture.detectChanges();
    positionAttendue = nombreDeplacements % TAILLECHEVALET;
    expect(comp.lettres[positionAttendue]).to.be.equal(lettreO);
  });

  it(`Test exhaustif simulant un nombre arbitraire de déplacements à gauche`, () => {
    let chevaletTest : Lettre[] = [lettreO, lettreK, lettreK, lettreK, lettreK, lettreK, lettreK];
    let positionAttendue = 0;
    let nombreDeplacements = 151;

    fixture.detectChanges();
    comp.lettres = chevaletTest;

    comp.gererTouchesClavier('O');
    for (let i = 0; i < nombreDeplacements; i ++){
      comp.gererTouchesClavier("ArrowLeft");
      positionAttendue--;
      if (positionAttendue < 0){
        positionAttendue = (TAILLECHEVALET - 1);
      }
    }
    fixture.detectChanges();
    expect(comp.lettres[positionAttendue]).to.be.equal(lettreO);
  });

  it(`Test exhaustif simulant un nombre arbitraire de déplacements mixtes`, () => {
    const GAUCHE = 0;

    let chevaletTest : Lettre[] = [lettreO, lettreK, lettreK, lettreK, lettreK, lettreK, lettreK];
    let positionAttendue = 0;
    let nombreDeplacements = 313;

    fixture.detectChanges();
    comp.lettres = chevaletTest;

    comp.gererTouchesClavier('O');
    for (let i = 0; i < nombreDeplacements; i ++){
      let direction : number = randomNumber(2);
      if (direction === GAUCHE){
        comp.gererTouchesClavier("ArrowLeft");
        positionAttendue--;
        if (positionAttendue === -1){
          positionAttendue = (TAILLECHEVALET - 1);
        }
      }else{
        comp.gererTouchesClavier("ArrowRight");
        positionAttendue++;
        if (positionAttendue === TAILLECHEVALET){
          positionAttendue = 0;
        }
      }
    }
    fixture.detectChanges();
    expect(comp.lettres[positionAttendue]).to.be.equal(lettreO);
  });

});

function initAlphabet(): void {
  alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
               'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
               'U', 'V', 'W', 'X', 'Y', 'Z' ];
}

function randomNumber(max : number) : number {
  return Math.floor(Math.random() * max);
}

function getChars(liste: Array<Lettre>) : Array<string> {
  let chars: Array<string> = [];
  for (let lettre of liste){
    chars.push(lettre.getLettre());
  }
  return chars;
}

function exclureAlphabet(listeAEnlever : Array<string>) : Array<string> {
  initAlphabet();
  let alphabetRestant : string[] = alphabet;

  for (let lettre of listeAEnlever) {
    let posAEnlever : number = alphabetRestant.indexOf(lettre, 0);
    if (posAEnlever >= 0){
      alphabetRestant.splice(posAEnlever, 1);
    }
  }

  return alphabetRestant;
}


import { expect } from 'chai';
import { ReserveLettres } from './reserveLettres';


describe('Classe ReserveLettres' , () => {

    it(`Initialement, la reserve contient 102 lettres`, () => {
        let reserve: ReserveLettres = new ReserveLettres("1");
        expect(reserve.getNombreLettres()).to.be.equal(102);
    });

    it(`La methode isEmpty() retourne true si la reserve est vide`, () => {
        let reserve: ReserveLettres = new ReserveLettres("1");
        expect(reserve.isEmpty()).to.be.false;
        for (let i = 0; i < 102; i++){
            reserve.getNewLettre();
        }
        expect(reserve.isEmpty()).to.be.true;
    });

});

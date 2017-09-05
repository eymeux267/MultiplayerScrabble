import { Lettre } from './../listeLettres/lettre';

export class LettreReserve extends Lettre {
  private quantiteDisponible : number;

  constructor(lettre: string, quantiteDisponible : number) {
      super(lettre);
      this.quantiteDisponible = quantiteDisponible;
  }

  getQuantiteDisponible() : number {
      return this.quantiteDisponible;
  }

  setQuantiteDisponible(newQuantite : number) : void {
    this.quantiteDisponible = newQuantite;
  }

  incrementerQuantiteDisponible() : void {
        this.quantiteDisponible++;
  }

  decrementerQuantiteDisponible() : void {
        this.quantiteDisponible--;
  }
}

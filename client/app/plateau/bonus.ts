export class Bonus {
  private bonusMot_: boolean; //True si bonus de mot, false si bonus de lettre.
  private valeurBonus_: number; //x2 ou x3

  constructor(bonusMot: boolean, valeurBonus: number) {
      this.bonusMot_ = bonusMot;
      this.valeurBonus_ = valeurBonus;
  }

  getBonusMot(): boolean {
        return this.bonusMot_;
  }

  setBonusMot(bonusMot: boolean): void{
      this.bonusMot_ = bonusMot;
  }

  getValeurBonus(): number{
      return this.valeurBonus_;
  }

  setValeurBonus(valeurBonus: number): void{
        this.valeurBonus_ = valeurBonus;
  }
}

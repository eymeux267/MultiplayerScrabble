import { Lettre } from './../listeLettres/lettre';
import { Bonus } from './bonus';

export class Case {
  private lettre_: Lettre;
  private bonus_: Bonus;

  constructor(lettre: Lettre, bonus: Bonus) {
      this.lettre_ = lettre;
      this.bonus_ = bonus;
  }

  public getLettre() : Lettre {
        return this.lettre_;
  }

  public setLettre(lettre: Lettre) : void{
      this.lettre_ = lettre;
  }

  public getBonus() : Bonus {
      return this.bonus_;
  }

  public setBonus(bonus: Bonus): void {
    this.bonus_ = bonus;
  }

  public setValeurPoints(bonus: Bonus) : void{
        this.bonus_ = bonus;
  }
}

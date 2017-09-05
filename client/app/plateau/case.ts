import { Lettre } from './../lettre/lettre';
import { Bonus } from './bonus';

export class Case {
  private lettre_: Lettre;
  private bonus_: Bonus;

  constructor(lettre: Lettre, bonus: Bonus) {
      this.lettre_ = lettre;
      this.bonus_ = bonus;
  }

  public getLettre(): any {
        return this.lettre_;
  }

  public setLettre(lettre: any): void{
      this.lettre_ = lettre;
  }

  public getBonus(): any{
      return this.bonus_;
  }

  public setValeurPoints(bonus: any): void{
        this.bonus_ = bonus;
  }
}

export class Lettre {
  private lettre : string;
  private valeurPoints : number;

  constructor(lettre: string, valeurPoints: number) {
      this.lettre = lettre;
      this.valeurPoints = valeurPoints;
  }

  getLettre() : string {
        return this.lettre;
  }

  setLettre(lettre: string) : void{
      this.lettre = lettre;
  }

  getValeurPoints() : number{
      return this.valeurPoints;
  }

  setValeurPoints(valeurPoints: number) : void{
        this.valeurPoints = valeurPoints;
  }
}

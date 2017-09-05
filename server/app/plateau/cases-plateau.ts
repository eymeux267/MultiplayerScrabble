import { Bonus } from './bonus';
import { Case } from './case';

// Tableau 2 dimensions de cases pour le plateau de jeu.
export let PLATEAU: Case[][] = [
[
    new Case(null, new Bonus(true, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 3)),
],

[
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
],

[
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
],

 [
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
],

[
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
],

[
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
],

[
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
],

 [
    new Case(null, new Bonus(true, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)), // case centrale.
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 3)),
],

[
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
],

[
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
],

[
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
],

[
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
],

 [
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
],

[
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 2)),
    new Case(null, null),
],

[
    new Case(null, new Bonus(true, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 3)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(false, 2)),
    new Case(null, null),
    new Case(null, null),
    new Case(null, new Bonus(true, 3)),
],

];

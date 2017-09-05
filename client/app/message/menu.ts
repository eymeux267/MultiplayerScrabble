import { Message } from './../message/message';

export const MENU: Message[] = [
  { name : 'COMMANDE',
    text : `!placer <ligne><colonne>(h|v) <mot> : Commande pour placer un mot sur le plateau ||||| 
    !changer <lettre> : Commande pour changer lettre |||||
    !passer : Commande pour passer le tour`,
    estCommande : true}
];

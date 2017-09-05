import { ListeLettres } from './../listeLettres/listeLettres';

export type Usager = {
    name : string;
    id : string; // ID du socket
    roomID : string;
    listeLettres : ListeLettres;
    ordre : number;
    aSonTour : boolean;
    score : number;
};

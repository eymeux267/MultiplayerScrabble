import { ListePlateaux } from './listePlateaux';
import { GestionnaireDictionnaire } from './../dictionnaire/gestionnaireDictionnaire';
import { ListeUsagers } from './../listeUsagers/listeUsagers';

export class PlateauService {
    private io: SocketIO.Server;
    private listeUsagers: ListeUsagers;
    private gestionnaireDictionnaire: GestionnaireDictionnaire;
    private listePlateaux: ListePlateaux;

    constructor(serverio: SocketIO.Server, listeUsagers: ListeUsagers) {
        this.io = serverio;
        this.listeUsagers = listeUsagers;
        this.gestionnaireDictionnaire = new GestionnaireDictionnaire();
        this.listePlateaux = new ListePlateaux(listeUsagers, this.io);
    }

    listenToPlateauRequests(socket: SocketIO.Socket): void {
        socket.on('join-game', () => {
            let roomID = this.listeUsagers.getUserRoomID(socket.id);
            if (!this.listePlateaux.plateauPresent(roomID)) {
                this.listePlateaux.addPlateau(roomID);
            }
            this.emitPlateauARoom(roomID, socket, "");
        });
    }

    reactToCommandRequests(socket: SocketIO.Socket, commande: string, attributs: string): void {
        if (commande === "!placer") {
            let attributsASeparer = attributs.split(" ", 2);
            let posEtOrientation = attributsASeparer[0];
            let mot = attributsASeparer[1];
            console.log("ATTRIBUtS QUE TU DONNE AU SHIT" + attributs);
            let roomID = this.listeUsagers.getUserRoomID(socket.id);
            let index = this.listePlateaux.findPlateauIndex(roomID);
            let promesse =
                this.listePlateaux.getPlateauByIndex(index).obtenirLettresRemplacees(attributs, posEtOrientation);
            promesse.then( (lettresARemplacer: string) => {
            console.log("LETRES A REMPLACER DANS PLATO SERVICE : " + lettresARemplacer);
            console.log("Usager : " + socket.id + " veut inserer le mot : " + mot + " dans la room " + roomID);
            if (this.listePlateaux.insererMot(mot, posEtOrientation, roomID, socket.id)) {
                this.emitPlateauARoom(roomID, socket, lettresARemplacer);
            }
            else {
                socket.emit('message', "Impossible d'inserer le mot", "Serveur");
            }
            });
        }
    }

    private emitPlateauARoom(roomID: string, socket: SocketIO.Socket, attributs: string): void {
        let listeLettresPlateau = this.listePlateaux.getLettresPlateau(roomID);
        let lettres: Array<Array<string>> = [[]];
        let valeurs: Array<Array<number>> = [[]];
        for (let i = 0; i < listeLettresPlateau.length; i++) {
            lettres.push(new Array<string>());
            valeurs.push(new Array<number>());
            for (let j = 0; j < listeLettresPlateau[i].length; j++) {
                if (listeLettresPlateau[i][j] !== null) {
                    lettres[i].push(listeLettresPlateau[i][j].getLettre());
                    valeurs[i].push(listeLettresPlateau[i][j].getValeurPoints());
                }
                else {
                    lettres[i].push(null);
                    valeurs[i].push(null);
                }
            }
        }
        this.io.sockets.in(roomID).emit('plateau', lettres, valeurs);
        socket.emit('plateau-est-change', attributs);
    }

}

/*
// Socket.io cheat sheet
// sending to sender-client only
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only');
*/

import { ListeUsagers } from './../listeUsagers/listeUsagers';
import { Lettre } from './../listeLettres/lettre';

export class ListeUsagersService {
    private io : SocketIO.Server;
    private listeUsagers : ListeUsagers;

    constructor(serverio : SocketIO.Server, listeUsagers : ListeUsagers) {
        this.io = serverio;
        this.listeUsagers = listeUsagers;
    }

    listenToUserRequests(socket : SocketIO.Socket) : void {
        socket.on('add-user', (userName : string) => {
            if (this.listeUsagers.confirmUserName(userName) === false) {
                console.log("User name : " + userName + " not in list");
                socket.emit('response', true);
                this.listeUsagers.addUsager(userName, socket.id);
                console.log("User name : " + userName + " added to list");
            }
            else {
                console.log("User name : " + userName + " already in list");
                socket.emit('response', false);
            }
        });
        socket.on('join-game', () => {
            setTimeout(() => {
                let roomID = this.listeUsagers.getUserRoomID(socket.id);
                let usagers = this.listeUsagers.getUsersByRoomId(roomID);
                let noms: Array<string> = [];
                let scores: Array<number> = [];
                let nbLettres: Array<number> = [];
                for (let usager of usagers) {
                    noms.push(this.listeUsagers.getUserName(usager));
                    scores.push(this.listeUsagers.getScore(usager));
                    nbLettres.push(this.calculerNbrLettres(this.listeUsagers.getLettres(usager)));
                }
                this.io.sockets.in(roomID).emit('tableau-joueurs', noms, scores, nbLettres);
            }, 500);
        });
    }

    calculerNbrLettres(lettres: Lettre[]) {
        let nbrLettres = 0;
        for (let i = 0; i < lettres.length; i++) {
            if (lettres[i].getLettre() != null) {
                nbrLettres++;
            }
        }
        return nbrLettres;
    }

    removeUsager(socketId : string) : void {
        this.listeUsagers.removeUsager(socketId);
    }

    estASonTour(socketId : string) : boolean {
        return this.listeUsagers.estASonTour(socketId);
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

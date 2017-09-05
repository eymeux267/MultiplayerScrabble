import { ListeUsagers } from './../listeUsagers/listeUsagers';
import { GestionnaireTour } from './gestionnaireTour';

export class GestionnaireTourService {
    private io : SocketIO.Server;
    private listeUsagers : ListeUsagers;
    private gestionnaireTour : GestionnaireTour;

    constructor(serverio : SocketIO.Server, listeUsagers : ListeUsagers) {
        this.io = serverio;
        this.listeUsagers = listeUsagers;
        this.gestionnaireTour = new GestionnaireTour(serverio, listeUsagers);
    }

    startGame(roomID : string) : void {
        this.gestionnaireTour.determinerOrdre(roomID);
        this.io.sockets.in(roomID).emit("debut-premier-tour", this.listeUsagers.findfirstPlayer(roomID), roomID);
        this.gestionnaireTour.startTimer(roomID);
    }

    prochainTour(roomID : string) : void {
        this.gestionnaireTour.passer(roomID);
    }

    reactToCommandRequests(socket : SocketIO.Socket, commande : string, attributs : string) : void {
        if (commande === "!passer") {
            this.gestionnaireTour.passer(this.listeUsagers.getUserRoomID(socket.id));
        }
    }
    listenToFinTour(socket : SocketIO.Socket){
      socket.on('fin-tour', () => {
          console.log("socket id du boy qui bust: " + socket.id);
      if (this.listeUsagers.estASonTour(socket.id)){
          this.gestionnaireTour.passer(this.listeUsagers.getUserRoomID(socket.id));
          console.log("room qui passe son tour: " + this.listeUsagers.getUserRoomID(socket.id));
      }
    });
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

import { ListeUsagers } from './../listeUsagers/listeUsagers';
import { ListeUsagersService } from './../listeUsagers/listeUsagersService';
import { RoomService } from './../room/roomService';
import { BoiteCommunicationService } from './../boite_communication/boiteCommunicationService';
import { ReserveLettresService } from './../reserveLettres/reserveLettresService';
import { GestionnaireTourService } from './../gestionnaireTour/gestionnaireTourService';
import { PlateauService } from './../plateau/PlateauService';
import { ListeLettres } from './../listeLettres/listeLettres';

export class SocketIOServer {
    private io : SocketIO.Server;
    private listeUsagersService : ListeUsagersService;
    private roomService : RoomService;
    private boiteCommunicationService : BoiteCommunicationService;
    private listeUsagers : ListeUsagers;
    private reserveLettresService : ReserveLettresService;
    private gestionnaireTourService : GestionnaireTourService;
    private plateauService : PlateauService;

    constructor(serverio : SocketIO.Server) {
        this.io = serverio;
        this.listeUsagers = new ListeUsagers();
        this.listeUsagersService = new ListeUsagersService(serverio, this.listeUsagers);
        this.roomService = new RoomService(serverio, this.listeUsagers);
        this.boiteCommunicationService = new BoiteCommunicationService(serverio, this.listeUsagers);
        this.reserveLettresService = new ReserveLettresService(serverio, this.listeUsagers);
        this.gestionnaireTourService = new GestionnaireTourService(serverio, this.listeUsagers);
        this.plateauService = new PlateauService(serverio, this.listeUsagers);

        this.io.on('connection', (socket) => {
            console.log("User : " + socket.id + " connected");

            this.listenToRequests(socket);

            socket.on('remove-user', () => {
                this.roomService.removeUsager(socket.id);
                let usager = this.listeUsagers.findUsagerIndex(socket.id);
                this.listeUsagers.getTableauListeUsagers()[usager].listeLettres = new ListeLettres();
            });
            socket.on('disconnect', () => {
                this.roomService.removeUsager(socket.id);
                this.listeUsagersService.removeUsager(socket.id);
                console.log("User : " + socket.id + " disconnected");
            });

            socket.on('join-game', () => {
                console.log (this.roomService.isGameFull(socket.id));
                if (this.roomService.isGameFull(socket.id)) {
                    let roomID = this.listeUsagers.getUserRoomID(socket.id);
                    console.log("Game in room " + roomID + " starting ...");
                    this.gestionnaireTourService.startGame(roomID);
                }
            });
        });
    }

    listenToRequests(socket : SocketIO.Socket) {
        this.listeUsagersService.listenToUserRequests(socket);
        this.roomService.listenToRoomRequests(socket);
        this.boiteCommunicationService.listenToChatResquests(socket);
        this.reserveLettresService.listenToReserveLettresRequests(socket);
        this.reserveLettresService.listenToPlateauEstChange(socket);
        this.plateauService.listenToPlateauRequests(socket);
        this.gestionnaireTourService.listenToFinTour(socket);

        socket.on('command', (commande : string, attributs : string) => {
            if (this.listeUsagersService.estASonTour(socket.id)) {
                this.gestionnaireTourService.reactToCommandRequests(socket, commande, attributs);
                this.reserveLettresService.reactToCommandRequests(socket, commande, attributs);
                this.plateauService.reactToCommandRequests(socket, commande, attributs);
            }
            else {
                socket.emit('message', "Ce n'est pas votre tour", "Serveur");
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

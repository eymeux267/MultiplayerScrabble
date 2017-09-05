import { RoomList } from './../room/roomList';
import { ListeUsagers } from './../listeUsagers/listeUsagers';

const TWOPLAYER = 2;
const THREEPLAYER = 3;
const FOURPLAYER = 4;

export class RoomService {
    private io: SocketIO.Server;
    private listeUsagers : ListeUsagers;

    private roomListArray : Array<RoomList>;

    constructor(serverio : SocketIO.Server, listeUsagers : ListeUsagers) {
        this.io = serverio;
        this.listeUsagers = listeUsagers;

        this.roomListArray = new Array<RoomList>(3);
        this.roomListArray[0] = new RoomList(TWOPLAYER, listeUsagers);
        this.roomListArray[1] = new RoomList(THREEPLAYER, listeUsagers);
        this.roomListArray[2] = new RoomList(FOURPLAYER, listeUsagers);
    }

    listenToRoomRequests(socket : SocketIO.Socket) : void {
        socket.on('join-game', (nbrJoueurs: number) => {
            console.log("Nombre de joueurs requested: " + nbrJoueurs);
            let room = this.roomListArray[nbrJoueurs - 2].addUser(socket.id);
            socket.join(room);
        });
        // A implementer sur client
        socket.on('leave-game', () => {
            this.removeUsager(socket.id);
        });
    }

    removeUsager(socketId : string) : void {
        let roomID = this.listeUsagers.getUserRoomID(socketId);
        if (roomID !== null && roomID !== "") {
            this.roomListArray[+roomID[0] - 2].removeUser(socketId);
        }
    }

    isGameFull(socketId : string) : boolean {
        let roomID = this.listeUsagers.getUserRoomID(socketId);
        if (roomID !== null && roomID !== "") {
            return this.roomListArray[+roomID[0] - 2].isGameFull(roomID);
        }
        return false;
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

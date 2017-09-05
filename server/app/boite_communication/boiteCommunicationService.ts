import { ListeUsagers } from './../listeUsagers/listeUsagers';

export class BoiteCommunicationService {
  private io: SocketIO.Server;
  private listeUsagers: ListeUsagers;

  constructor(serverio: SocketIO.Server, listeUsagers: ListeUsagers) {
    this.io = serverio;
    this.listeUsagers = listeUsagers;
  }

  listenToChatResquests(socket: SocketIO.Socket) : void {
    socket.on('message', (message: string) => {
      let roomID = this.listeUsagers.getUserRoomID(socket.id);
      let userName = this.listeUsagers.getUserName(socket.id);
      this.io.sockets.in(roomID).emit('message', message, userName);
      console.log("User : " + userName + " said : " + message);
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

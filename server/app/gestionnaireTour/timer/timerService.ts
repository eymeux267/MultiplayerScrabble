export class TimerService {
    private io: SocketIO.Server;

    constructor(serverio : SocketIO.Server) {
        this.io = serverio;
    }

    emitTime(time : string, roomID : string, nomJoueur : string) : void {
        this.io.sockets.in(roomID).emit('time', time, nomJoueur);
    }
}

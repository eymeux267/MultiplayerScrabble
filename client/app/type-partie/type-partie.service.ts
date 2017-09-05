import { Injectable } from '@angular/core';
import { SocketIOService } from './../SocketIOService/socketIOService';

const TWOPLAYER = 2;
const THREEPLAYER = 3;
const FOURPLAYER = 4;

@Injectable()
export class TypePartieService {
    private socket : SocketIOClient.Socket;

    constructor(private socketIOService : SocketIOService) {
        this.socket = socketIOService.socket;
    }

    joinTwoPlayerRoom(){
        this.socket.emit('join-game', TWOPLAYER);
    }

    joinThreePlayerRoom(){
        this.socket.emit('join-game', THREEPLAYER);
    }

    joinFourPlayerRoom(){
        this.socket.emit('join-game', FOURPLAYER);
    }
}

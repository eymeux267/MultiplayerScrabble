import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketIOService {
  public socket = io.connect('http://localhost:3002');
}

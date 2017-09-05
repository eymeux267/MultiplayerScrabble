import { Room } from './room';
import { ListeUsagers } from './../listeUsagers/listeUsagers';

export class RoomList {
    private listeUsagers : ListeUsagers;

    private roomList : Room[];
    private nbrJoueursMax : number;

    constructor(nbrJoueursMax: number, listeUsagers : ListeUsagers) {
        this.listeUsagers = listeUsagers;

        this.roomList = [];
        this.nbrJoueursMax = nbrJoueursMax;
    }

    addRoom(roomID: string) : void {
        this.roomList.push(new Room(this.nbrJoueursMax, roomID, this.listeUsagers));
    }

    addUser(socketId : string) : string {
        let roomIndex = this.findAvailableRoomIndex();
        if (roomIndex === -1) {
            let newRoomID = this.nbrJoueursMax + "" + this.roomList.length;
            this.addRoom(newRoomID);
            this.roomList[this.roomList.length - 1].addUser(socketId);
            return newRoomID;
        }
        else {
            this.roomList[roomIndex].addUser(socketId);
            return this.nbrJoueursMax + "" + roomIndex;
        }

    }

    removeUser(socketId : string) : void {
        let idToRemove = this.listeUsagers.getUserRoomID(socketId);
        let indexToRemove = idToRemove.slice(1);
        this.roomList[+indexToRemove].removeUser(socketId);
    }

    isGameFull(roomID : string) : boolean {
        let roomIndex = this.findRoomIndex(roomID);
        return this.roomList[roomIndex].isGameStarted();
    }

    private findRoomIndex(roomID: string) : number {
        for (let index = 0; index < this.roomList.length; index++) {
            if (roomID === this.roomList[index].getRoomID()) {
                return index;
            }
        }
        return -1;
    }

    private findAvailableRoomIndex() : number {
        for (let index = 0; index < this.roomList.length; index++) {
            if (!this.roomList[index].isGameStarted() && !this.roomList[index].isRoomFull()) {
                console.log("Room available found");
                return index;
            }
        }
        console.log("Room available not found");
        return -1;
    }
    getListRoom(){
        return this.roomList;
    }
}

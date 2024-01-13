export class Room {
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
  
    constructor(x: number, y: number, width: number, height: number, type: string) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.type = type;
    }
  }
  
  export class RoomGenerator {
    rooms: Room[] = [];
  
    generateRooms(): Room[] {
      for (let i = 0; i < 6; i++) { // Generate 5 rooms (can be adjusted)
        const roomWidth = this.getRandomNumber(100, 150); // Adjust the width range as needed
        const roomHeight = this.getRandomNumber(100, 150); // Adjust the height range as needed
  
        let x, y;
        do {
          x = this.getRandomNumber(1, 700 - roomWidth);
          y = this.getRandomNumber(1, 700 - roomHeight);
        } while (this.checkOverlap(x, y, roomWidth, roomHeight));
  
        const roomType = this.getRoomType(i);
        const room = new Room(x, y, roomWidth, roomHeight, roomType);
        this.rooms.push(room);
      }
      return this.rooms;
    }
  
    checkOverlap(x: number, y: number, width: number, height: number): boolean {
      for (const room of this.rooms) {
        if (
          x < room.x + room.width &&
          x + width > room.x &&
          y < room.y + room.height &&
          y + height > room.y
        ) {
          return true; // Overlaps with existing room
        }
      }
      return false; // No overlap
    }
  
    getRoomType(index: number): string {
      const roomTypes = ['Bathroom', 'Bedroom', 'Kitchen', 'Living Room', 'Office'];
      return roomTypes[index % roomTypes.length];
    }
  
    getRandomNumber(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRoomByCoordinates(x: number, y: number): Room | null {
        for (const room of this.rooms) {
          if (x >= room.x && x <= room.x + room.width && y >= room.y && y <= room.y + room.height) {
            return room; // Room found
          }
        }
        return null; // No room found at the coordinates
      }

    clear(){
        this.rooms = [];
    }
  }
  
  
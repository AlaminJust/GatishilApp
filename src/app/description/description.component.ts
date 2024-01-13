import { Component, ElementRef, ViewChild } from '@angular/core';
import { RoomGenerator, Room } from '../shared/room-generator';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  floors: string[] = [
    "http://www.retrogameguide.com/images/screenshots/snes-legend-of-zelda-link-to-the-past-5.jpg",
    "http://www.retrogameguide.com/images/screenshots/snes-legend-of-zelda-link-to-the-past-6.jpg",
    "http://www.retrogameguide.com/images/screenshots/snes-legend-of-zelda-link-to-the-past-7.jpg",
    "http://www.retrogameguide.com/images/screenshots/snes-legend-of-zelda-link-to-the-past-8.jpg"
  ];
  
  // Usage
  generator = new RoomGenerator();

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D | null;
  private mapSprite: HTMLImageElement = new Image();
  private markers: Marker[] = [];
  room?: Room | null;

  constructor() {
    this.mapSprite.src = this.floors[0];
    this.generator.generateRooms();
  }

  onFloorSelected(event: Event){
    this.markers = [];
    this.generator.clear();
    this.generator.generateRooms();
    const floorNumber = Number((event.target as HTMLSelectElement).value);
    this.mapSprite.src = this.floors[floorNumber];
  }

  ngOnInit(): void {
    this.context = this.canvasRef.nativeElement.getContext("2d");

    if (this.context) {
      this.firstLoad();
      setInterval(() => this.main(), (1000 / 60));
      setInterval(() => this.mouseClicked(), 1000);
      //this.canvasRef.nativeElement.addEventListener("mousedown", (event) => this.mouseClicked(event));
    }
  }

  firstLoad(): void {
    if (this.context) {
      this.context.font = "15px Georgia";
      this.context.textAlign = "center";
    }
  }

  main(): void {
    if (this.context) {
      this.draw();
    }
  }

  randomXY(): any {
    return {
      x: Math.floor(Math.random() * 700) + 1,
      y: Math.floor(Math.random() * 700) + 1
    };
  }

  mouseClicked(): void {
    if (this.context && this.canvasRef) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      const position = this.randomXY();
      
      const marker = new Marker();
      marker.XPos = position.x;
      marker.YPos = position.y;
      
      this.room = this.generator.getRoomByCoordinates(position.x, position.y);

      if(this.markers.length){
        this.markers[0] = marker;
      }
      else{
        this.markers.push(marker);
      }
    }
  }

  draw(): void {
    if (this.context) {
      const context = this.context;
      const canvas = this.canvasRef.nativeElement;

      // Clear Canvas
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw map
      context.drawImage(this.mapSprite, 0, 0, 700, 700);

      // Draw markers
      this.markers.forEach((tempMarker) => {
        context.drawImage(tempMarker.Sprite, tempMarker.XPos, tempMarker.YPos, tempMarker.Width, tempMarker.Height);

        const markerText = `Postion (X:${tempMarker.XPos}, Y:${tempMarker.YPos}`;

        // Draw a simple box so you can see the position
        const textMeasurements = context.measureText(markerText);
        context.fillStyle = "#fff";
        context.globalAlpha = 0.7;
        context.fillRect(tempMarker.XPos - (textMeasurements.width / 2), tempMarker.YPos - 15, textMeasurements.width, 20);
        context.globalAlpha = 1;

        // Draw position above
        context.fillStyle = "#000";
        context.fillText(markerText, tempMarker.XPos, tempMarker.YPos);
      });
    }
  }
}

class Marker {
  public Sprite: HTMLImageElement = new Image();
  public Width: number = 12;
  public Height: number = 20;
  public XPos: number = 0;
  public YPos: number = 0;

  constructor() {
    this.Sprite.src = "http://www.clker.com/cliparts/w/O/e/P/x/i/map-marker-hi.png";
  }
}

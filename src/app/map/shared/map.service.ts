import { Injectable } from '@angular/core';
import { POINTS } from './markers_points';

@Injectable()
export class MapService {
  points: any;
  constructor(){
    this.points = POINTS;
  }
  getGeoJson(){
    return this.points;
  }
}

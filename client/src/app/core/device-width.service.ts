import { HostListener, Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
  export class DeviceWidthService {
    public userDeviceWidth: number;
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.userDeviceWidth = window.innerWidth;
    }
    constructor() {
        this.userDeviceWidth = window.innerWidth;
    }

    getUserDeviceWidth(){ return this.userDeviceWidth;}
    

  }
import { Component, OnInit, ElementRef,ViewChild} from '@angular/core';
import * as HLS from 'hls.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild("videoPlayer",{static:true}) videoElement: ElementRef;
  @ViewChild("inputURL",{static:true}) urlInput : ElementRef;
  hls;
  src:string;
  constructor() { }
  
  ngOnInit() {
    this.videoElement = this.videoElement.nativeElement
    this.src = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
    this.playVideo()
  }

  onLoadURL () {
    console.log("",this.urlInput.nativeElement.value )
    if(this.urlInput.nativeElement.value !=='') {
      this.src = this.urlInput.nativeElement.value
      this.playVideo()
    }
  }

  playVideo() {
    if(this.hls){
      this.hls.destroy();
    }
    this.hls = new HLS({
      startLevel: 2,
      capLevelToPlayerSize: true,
    })
    if (HLS.isSupported()) {
      this.hls.attachMedia(this.videoElement);
      this.hls.loadSource(this.src);
        this.hls.on(HLS.Events.MANIFEST_PARSED, (event, data) => {
          console.log("video started ",data)
        });
    }
  }


}

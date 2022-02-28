import { Component, Input, OnInit } from '@angular/core';
import { ProgressiveImgService } from '../../services/progressive-img/progressive-img.service';

interface Dimensions {
  width: number;
  height: number;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit{
  @Input() src: string;
  defaultImg: string;
  state: number;

  constructor(private progressiveImageService: ProgressiveImgService) { }

  ngOnInit() {
    this.defaultImg = './assets/img/default-img.svg';
    (async () => {
      try {
        this.state = 0;
        await this.progressiveImageService.loadImage(this.defaultImg);
        this.state = 1;
        await this.progressiveImageService.loadImage(this.src);
        this.state = 2;
      } catch (e) {
        console.error('Cannot load image', this.defaultImg, this.src);
      }
    })();
  }
}

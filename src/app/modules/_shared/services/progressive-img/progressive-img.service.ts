import { Injectable } from '@angular/core';

export async function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

@Injectable({
  providedIn: 'root'
})
export class ProgressiveImgService {

  constructor() {
    console.log('I am loaded');
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      console.log('start to load', url);
      const img = new Image();
      img.onload = async () => {
        // await sleep(7000);
        console.log('loaded', url);
        resolve(url);
      };
      img.onerror = () => {
        console.log('error', url);
        reject();
      };
      img.src = url;
    });
  }
}


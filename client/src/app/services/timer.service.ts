import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  timerStarted = false;
  setTimer(callback: Function) {

    
      let result = '';

      let hour = Math.floor((Math.random() * 23) + 1);
      let min = Math.floor((Math.random() * 59) + 1);
      let second = Math.floor((Math.random() * 59) + 1);

      let targetdate = `Jan 5, 2024 ${hour}:${min}:${second}`;

      var countDownDate = new Date(targetdate).getTime();


      var x = setInterval(() => {

        var now = new Date().getTime();

        var distance = countDownDate - now;

        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        result = this.twoDigits(hours) + ": " + this.twoDigits(minutes) + ": " + this.twoDigits(seconds);

        if (distance < 0) {
          clearInterval(x);
          result = "EXPIRED";
        }
        
        callback(result);
      }, 1000);

    
  }

  twoDigits(n: number) {
    return (n <= 9 ? "0" + n : n);
  }

}

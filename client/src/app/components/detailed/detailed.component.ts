import { Component, OnInit , EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss'],
  inputs: ['plotList','selectedPlot'],
  outputs:['cancelEvent','bidEvent']
})
export class DetailedComponent implements OnInit {

  plotList : Array<any> = [];
  //bidedAmount : number = 0;
  selectedPlot: string = ''; 
  plot! : any;
  bidErr = false;
  cancelEvent = new EventEmitter<boolean>();
  bidEvent = new EventEmitter<number>(); 
  constructor(private router:Router,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.plot = this.plotList.filter((plot:any)=> plot.id == this.selectedPlot)[0];
  }

  bidAmount(event:any){
    
    this.bidErr = parseInt(this.plot.rate) > this.plot.bidedAmount ;

    if(!this.bidErr){
      this.snackBar.open('Bid Submitted for this Plot', '', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['custom-snackbar'],
      });
      this.bidEvent.emit(this.plot.bidedAmount )
      this.cancel();  
    }
  }

  cancel(){
    this.cancelEvent.emit(false)
  }

  leaderBoard(){
    this.router.navigate(['/leaderboard', {id: this.selectedPlot }]);
  }
}

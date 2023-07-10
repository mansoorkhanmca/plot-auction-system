import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Plots } from '../../const/plots';
import { TimerService } from '../../services/timer.service';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  plotsList: Array<any> = [];
  selectedPlot : string = '';
  showDetailedPage = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setColoumns(event.target.innerWidth);
  }

  noOfColoumns = 4;
  MIN_COLOUMN_WIDTH = 400;

  constructor(private router: Router, private timer: TimerService,private userService: UsersService) { }

  timercountdown = '';
  userFullName = 'User';
  ngOnInit(): void {
    this.plotsList = Plots;
    //console.log(this.plotsList);

    let userData = this.userService.getUserData();
    
    this.userFullName = userData?.firstName + ' ' + userData?.lastName;
    this.setColoumns(window.innerWidth);

    !this.timer.timerStarted ? this.startTimer() : '';
  }

  doSearch(event: any) {
    if (event.target.value != '') {
      this.plotsList = this.plotsList.filter(item => {
        let size = event.target.value.length;
        return item.id.substring(0, size) == event.target.value || item.place.substring(0, size).toLowerCase() == event.target.value.toLowerCase()
      
      });
      //this.plotsList = this.plotsList.length == 0 ? Plots : this.plotsList;
    }
    else {
      this.plotsList = Plots;
    }

  }

  setColoumns(width: number) {

    this.noOfColoumns = Math.ceil(width / this.MIN_COLOUMN_WIDTH);
  }

  logout() {
    this.userService.clearToken();
    this.router.navigateByUrl('/login');
  }


  startTimer(){
    this.timer.timerStarted = true;
    this.plotsList.forEach((item,index)=>{
      this.timer.setTimer((res:string)=>{
        this.plotsList[index].timer = res;
      });
    })
  }

  leaderboard(){
    this.router.navigateByUrl('/leaderboard');
  }

  startBid(plot: any){
    this.selectedPlot = plot.id;
    this.showDetailedPage = true;
    //this.router.navigate(['/detailed',plot.id])
  }

  bidedAmont(value: number){
    let index = this.plotsList.findIndex((plot : any)=> this.selectedPlot == plot.id);
    this.plotsList[index].bidedAmont = value;
  }

  ngOnDestroy(): void {
    this.userService.plotList = this.plotsList;
  }
}

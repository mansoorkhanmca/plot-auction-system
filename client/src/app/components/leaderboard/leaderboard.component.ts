
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { UsersService} from '../../services/users.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, AfterViewInit {
  userData : Array<any>= [];
  MIN_BID = 600000;
  MAX_BID = 900000;
  constructor(private userService:UsersService, private router: Router, private location: Location,private route:ActivatedRoute) { }

  ngOnInit(): void {

    

    this.userService.getUsers().subscribe((users)=>{
      //console.log(users);
      this.userData = users;
      this.userData.forEach((item,index)=>{
        this.userData[index].amount = this.randomIntFromInterval(this.MIN_BID,this.MAX_BID)
      })


      let id = this.route.snapshot.paramMap.get('id')
      let userData = this.userService.getUserData();
      if(id){
        let index =  this.userService.plotList.findIndex((item:any)=> item.id == id)
        let currentUser = {
          'image': environment.USER_IMG,
          'firstName':userData.firstName,
          'lastName':userData.lastName,
          'address':{'city':userData?.city},
          'amount': this.userService.plotList[index].bidedAmont || 0
        }
        this.userData.push(currentUser);
      }
    
      this.userData = this.userData.sort(this.compareAmount)
      this.dataSource.data = this.userData;
      this.dataSource._updateChangeSubscription();
    })
  }

  displayedColumns: string[] = ['image','firstName', 'lastName', 'city', 'amount'];
  dataSource = new MatTableDataSource<any>(this.userData);

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  randomIntFromInterval(min:number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  compareAmount(a: any, b: any) {
    return  b.amount - a.amount;
  }
  goBack(){
    this.location.back()
  }
}


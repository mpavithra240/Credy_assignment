import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';
import { DataSharingService } from '../services/data-sharing.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedinUser = '';
  subscription: Subscription;
  constructor(private router: Router, private data: DataSharingService) { }

  ngOnInit() {
    this.subscription = this.data.login.subscribe((res) => {
      // console.log(res);
      this.loggedinUser = res.loginUser
      
    })
  }


  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl("/login");

  }

}

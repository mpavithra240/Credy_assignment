import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  nextBool: boolean = false;
  previousBool: boolean = false;
  nextUrl = '';
  previousUrl = '';
  movieData:any = [];

  constructor(private toastr: ToastrService, private rest: RestService,
     private spinner: NgxSpinnerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllData();


  }

  getAllData(){
    this.spinner.show();
    this.rest.get('https://demo.credy.in/api/v1/maya/movies/').subscribe((res:any)=>{
      if(res.next != null) {
        this.nextBool = true;
        this.nextUrl = res.next
      }
      if(res.previous != null) {
        this.previousBool = true;
        this.previousUrl = res.previous
      }
      console.log(res)
      res.results.forEach(element => {
        element.shortDesc = element.description.substring(0,50);
        element.shortDesc += '...';
      });
      this.spinner.hide();
      if(res.results.length> 0) {
        this.movieData = res.results;
        this.toastr.success('Success');
      } else {
        this.spinner.hide();
        this.toastr.error('Error while Fetching the data');
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
      
      this.toastr.error(err.error.error.code);
    });

    console.log(this.movieData);
    

  }
  
  getNext(){
    this.spinner.show();
    this.rest.get(this.nextUrl).subscribe((res:any)=>{
      if(res.next != null) {
        this.nextBool = true;
        this.nextUrl = res.next
      } else {
        this.nextUrl = '';
        this.nextBool = false;
      }
      if(res.previous != null) {
        this.previousBool = true;
        this.previousUrl = res.previous
      } else {
        this.previousUrl = '';
        this.previousBool = false;
      }
      console.log(res)
      res.results.forEach(element => {
        element.shortDesc = element.description.substring(0,50);
        element.shortDesc += '...';
      });
      // this.spinner.hide();
      if(res.results.length> 0) {
        this.movieData = res.results;
        this.toastr.success('Success');
      } else {
        this.spinner.hide();
        this.toastr.error('Error while Fetching the data');
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
      
      this.toastr.error(err.error.error.code);
    });


  }

  getPrevious() {
    this.spinner.show();
    this.rest.get(this.previousUrl).subscribe((res:any)=>{
      if(res.next != null) {
        this.nextBool = true;
        this.nextUrl = res.next
      }
      else {
        this.nextUrl = '';
        this.nextBool = false;
      }
      if(res.previous != null  ) {
        this.previousBool = true;
        this.previousUrl = res.previous
      } else {
        this.previousUrl = '';
        this.previousBool = false;
      }
      console.log(res)
      res.results.forEach(element => {
        element.shortDesc = element.description.substring(0,50);
        element.shortDesc += '...';
      });
      this.spinner.hide();
      if(res.results.length> 0) {
        this.movieData = res.results;
        this.toastr.success('Success');
      } else {
        this.spinner.hide();
        this.toastr.error('Error while Fetching the data');
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
      
      this.toastr.error(err.error.error.code);
    });
  }

  openDialog(element) {
    console.log(element);
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      data: element
    });
  }

}

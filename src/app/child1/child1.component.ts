import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css']
})
export class Child1Component {

  constructor( private api:ApiService, private snackBar: MatSnackBar ){
    this.api.searchInput$.subscribe(input => {
      this.selectedValue = input;
    });
 
    this.api.searchedProductsList$.subscribe(products => {
      console.log(products,"list in products")
      this.searchedProductsList = products;
    });
  };
 
  searchedProductsList:any = [];
  selectedValue:any='';
  sortProductsBy:any='';
 
  token:any
 
  showSnackbar(message: string, config?: MatSnackBarConfig): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      ...config,
    });
  }
 
  addToCart(item:any){
    this.token = localStorage.getItem("token");
    if(this.token===null){
      this.showSnackbar('Please Login to continue')
    } else{
      this.api.addItemToCart(item)
    }
   
   }
   
  sortProducts(){
      if(this.sortProductsBy=='asc'){
        this.searchedProductsList.sort((a:any, b:any) => a.price - b.price);
      }
      else if(this.sortProductsBy=='desc'){
        this.searchedProductsList.sort((a:any, b:any) => b.price - a.price)
      }
  }
 
}
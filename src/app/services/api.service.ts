import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
 


@Injectable({
  providedIn: 'root'
})
export class ApiService  {

  constructor(private http:HttpClient,private snackBar:MatSnackBar) { }

  fetchData():Observable<any>{
    return this.http.get<any>(`https://fakestoreapi.com/products`)
  }


  openSnackBar(message: string,action: string) {
    this.snackBar.open(message, action,{
      duration:2000
    });
  }

 private searchInputSubject = new BehaviorSubject<string>('');
  searchInput$ = this.searchInputSubject.asObservable();
 
  private searchedProductsListSubject = new BehaviorSubject<string[]>([]);
  searchedProductsList$ = this.searchedProductsListSubject.asObservable();
 
 
  updateSearchInput(searchInput: string): void {
    this.searchInputSubject.next(searchInput);
  }
 
  updateSearchedProductsList(searchedProductsList: string[]): void {
    this.searchedProductsListSubject.next(searchedProductsList);
  }
 
  private cartItems: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
 
  getCartItems() {
    return this.cartItems.asObservable();
  }
 
  addItemToCart(item: any) {
    const currentCart = this.cartItems.value;
    // console.log(currentCart,'curr cart in service')
    let newItem = {...item,quantity:1}
    let addItem = (currentCart.find((ci:any)=>ci.id=== newItem.id))
    if(addItem===undefined){
      this.cartItems.next([...currentCart, newItem]);
      this.openSnackBar('Item added to cart!','close');
    } else{
      alert('Item already added to cart')
    }
  }
 
  removeItemFromCart(itemId: string) {
    const currentCart = this.cartItems.value;
    const updatedCart = currentCart.filter((item: any) => item.id !== itemId);
    this.cartItems.next(updatedCart);
  }
}

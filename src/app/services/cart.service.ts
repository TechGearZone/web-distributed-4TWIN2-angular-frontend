import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

public cartItemList : any =[]
public productList = new BehaviorSubject<any>([])
public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }
  setProduct(product :any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product : any ){
   // let selectedProduct= this.cartItemList.find((item:any) => item.id ===product.id)
    
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      console.log(this.cartItemList)
  }

  getTotalPrice() :number{
    let grandTotal=0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return Number(grandTotal.toFixed(2));
  }
  removeCartItem(product :any){
    let count=0
    this.cartItemList.map((a:any,index:any)=>{
      if(product.id===a.id&& count<1){
        this.cartItemList.splice(index,1);
        count++;
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList=[]
    this.productList.next(this.cartItemList)
  }
}

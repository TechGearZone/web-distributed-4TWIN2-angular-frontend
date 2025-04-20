import { CartService } from 'src/app/services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public totalItem : number =0;
  public searchTerm : string = '';

constructor(private cartService :CartService) {
}

ngOnInit():void{
  this.cartService.getProducts()
  .subscribe(res =>{
    this.totalItem = res.length;
  })
}

search(event:any){
  this.searchTerm = (event.target as HTMLInputElement).value;
  console.log(this.searchTerm);
  this.cartService.search.next(this.searchTerm);
}


}

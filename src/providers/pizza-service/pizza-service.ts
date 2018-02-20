import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pizza } from '../../models/pizza';

/*
  Generated class for the PizzaServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PizzaServices {
  //http://10.13.0.248:3000/pizza/
  private readonly url = "http://localhost:3000/pizza/";

  constructor(private http: HttpClient) {
    console.log('Hello PizzaServicesProvider Provider');
  }

  get(){
    let pizzaArray: Array<Pizza> = new Array<Pizza>();

    return new Promise<Array<Pizza>>(resolve => { //On créer promesse qui aura un array de pizza. Resole : callback
      //Le resolve de http -->
      this.http.get(this.url)
        .subscribe((data: Array<any>) => {
          //console.log(data[0]);
          for(let i = 0; i < data.length ; i++){
            pizzaArray.push(new Pizza(data[i]['id'], data[i]['name'], data[i]['desc'], data[i]['picture'], data[i]['price'], data[i]['ingredients']))
          }
          resolve(pizzaArray);
        });
      // <--
    });
  }


  getById(idPizza: number){
    let pizzaArraySearched: Array<Pizza> = new Array<Pizza>();

    return new Promise<Array<Pizza>>(resolve => { //On créer promesse qui aura un array de pizza. Resole : callback
      //Le resolve de http -->
      this.http.get(this.url)
        .subscribe((data: Array<any>) => {
          //console.log(data[0]);
          pizzaArraySearched.push(new Pizza(data[idPizza]['id'], data[idPizza]['name'], data[idPizza]['desc'], data[idPizza]['picture'], data[idPizza]['price'], data[idPizza]['ingredients']))
          resolve(pizzaArraySearched);
        });
      // <--
    });
  }

  post(data) {

    return new Promise<Array<Pizza>>(resolve => {
      this.http.post(this.url, data)
        .subscribe((data: Array<any>) => {
          resolve(data);
        }, (err) => {
          console.error(err);
        });
    });
  }


  // put(product: Product): Observable<Product> {
  //   return this.httpClient
  //     .put(this.baseUrl + '/products/' + product.id, product)
  //     .map(response => {
  //       return new Product(response);
  //     })
  //     .catch((err)=>{
  //       console.error(err);
  //     });
  // }
  put(idPizza: number, data) {

    return new Promise<Array<Pizza>>(resolve => {
      this.http.put(this.url + '/' + idPizza, data)
        .subscribe((data: Array<any>) => {
          resolve(data);
        }, (err) => {
          console.error(err);
        });
    });
  }

  delete(idPizza: number){
    return new Promise<Array<Pizza>>(resolve => {
      this.http.delete(this.url + idPizza)
        .subscribe(data => {
          console.log(data)
        }, err => {
          console.error(err);
        });
    });
  }

}

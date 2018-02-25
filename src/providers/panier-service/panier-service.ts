import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panier } from "../../models/panier";
import {ToastController} from "ionic-angular";

/*
  Generated class for the PanierServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PanierServices {

  private readonly url = "http://localhost:3000/panier/";

  constructor(public http: HttpClient, private toastCtrl: ToastController) {
    console.log('Hello PanierServiceProvider Provider');
  }

  post(postParams: any){
    return new Promise<Array<Panier>>(panier => {
      this.http.post(this.url, postParams).subscribe(
        data => {
          console.log(data);
        }, error => {
          console.log(error);
        });
    });
  }

  get(){
    let panierArray: Array<Panier> = new Array<Panier>();

    return new Promise<Array<Panier>>(resolve => { //On créer promesse qui aura un array de pizza. Resole : callback
      //Le resolve de http -->
      this.http.get(this.url)
        .subscribe((data: Array<any>) => {
          //console.log("Data :" + data[0]);
          for(let i = 0; i < data.length ; i++){
            panierArray.push(new Panier(data[i]['id'], data[i]['name'], data[i]['desc'], data[i]['picture'], data[i]['price'], data[i]['ingredients'], data[i]['quantity']))
          }
          resolve(panierArray);
          console.log('Panier : ', panierArray);
          return(panierArray);
        });
      // <--
    });
  }

  put(id: number, body) {
    return new Promise<Array<Panier>>(resolve => {
      this.http.put(this.url + id, body)
        .subscribe(
          data => {
            console.log('La quantité de pizza a été modifiée avec succès !');
          },
          error => {
            console.error("Error : ", error);
          }
        );
    })
  }

  delete(id: number){
    return new Promise<Array<Panier>>(resolve => {
      this.http.delete(this.url + id)
        .subscribe(data => {
          console.log(data)
        }, err => {
          console.error(err);
        });
    });
  }
}

import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import { PizzaServices } from '../../providers/pizza-service/pizza-service';
import { PanierPage } from '../panier/panier';
import { PanierServices } from "../../providers/panier-service/panier-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  stockItem: any;
  itemSearched: any;
  idDeLaPizza;
  nouvellePizza;

  constructor(public navCtrl: NavController, private pizzaServ: PizzaServices, private pizzaPanier: PanierServices,
              public toastCtrl: ToastController) {

  }


  ionViewDidLoad() {
    this.pizzaServ.get().then(item => {
      console.log(item);
      this.stockItem = item;
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  locateId() {
    this.pizzaServ.getById(this.idDeLaPizza).then(items => {
      console.log(items);
      this.itemSearched = items;
    });
  }

  ajouterPanier(event, item){

    this.nouvellePizza = {
      name: item.name,
      desc: item.desc,
      picture: item.picture,
      price: item.price,
      ingredients: item.ingredients
    }

    this.pizzaPanier.post(this.nouvellePizza).then(
      (success) => {this.presentToast("La pizza est dans le panier !")},
      (error) => {this.presentToast("Une erreur est survenue :(")}
    )
  }

  paniers(){
    this.navCtrl.push(PanierPage);
  }

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PizzaServices } from '../../providers/pizza-service/pizza-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  stockItem: any;
  itemSearched: any;
  idDeLaPizza;

  constructor(public navCtrl: NavController, private pizzaServ: PizzaServices) {

  }


  ionViewDidLoad() {
    this.pizzaServ.get().then(item => {
      console.log(item);
      this.stockItem = item;
    });
  }

  locateId() {
    this.pizzaServ.getById(this.idDeLaPizza).then(items => {
      console.log(items);
      this.itemSearched = items;
    });
  }

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}

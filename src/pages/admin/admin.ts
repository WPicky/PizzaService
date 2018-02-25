import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { PizzaServices } from '../../providers/pizza-service/pizza-service';
import {ModifierPage} from "../modifier/modifier";

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  stockItem: any;
  itemSearched: any;
  idDeLaPizza;

  constructor(public navCtrl: NavController, private pizzaServ: PizzaServices) {

  }

  itemTappede(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ModifierPage, {
      item: item
    });
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

  Supprimer(item) {
    this.pizzaServ.delete(item.id).then(
      (success) => setTimeout(function(){
        this.presentToast("Pizza supprimée !");
        this.reload(); }, 3000),
      (err) => console.error(err)
    );
  }

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}

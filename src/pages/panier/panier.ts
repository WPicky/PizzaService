import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import { PanierServices } from "../../providers/panier-service/panier-service";

//Stocké la quantité et l'ID dans le localStorage

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-panier',
  templateUrl: 'panier.html',
})
export class PanierPage {

  panier: any;
  pizzas: any;
  total;
  etat = true;


  constructor(public navCtrl: NavController,
              public panierService: PanierServices,
              private toastCtrl: ToastController) {

  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  async ionViewDidLoad() {
    console.log('ionViewDidLoad PanierPage');
    this.panierService.get().then(
      success => {
        console.log("Success : " + success);
        this.panier = success;
      }
    );

    this.panierService.get().then( success =>{
      this.pizzas = success;
    });
  }

  totalPanier() {
    this.total = 0;
    if (this.etat) {
      for (let i = 0; i < this.panier.length; i++) {
        if (this.panier[i].price != 0 && this.total != 0) {
          this.total = parseFloat(this.total) + parseFloat(this.panier[i].price);
        } else {
          this.total = parseFloat(this.panier[i].price);
        }
      }
    } else {
      for (let i = 0; i < this.panier.length; i++) {
        if (this.panier[i].price != 0 && this.total != 0) {
          this.total = parseFloat(this.total) - parseFloat(this.panier[i].price);
        } else {
          this.total = parseFloat(this.panier[i].price);
        }
      }
    }
  }

  async itemTappedMoins(event, item) {
    this.panier[item.id -1].quantity--;
    this.panierService.put(item.id, this.panier[item.id -1]);
    this.etat = false;
    this.totalPanier();
  }

  async itemTappedPlus(event, item) {
    this.panier[item.id -1].quantity++;
    console.log(this.panier[item.id -1].quantity);
    this.panierService.put(item.id, this.panier[item.id -1]);
    this.etat = true;
    this.totalPanier();
  }


  reload(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  Supprimer(event, item) {
    this.panierService.delete(item.id).then(
      (success) => setTimeout(function(){
        alert("item delected");
        this.reload();
      }, 3000),
      (err) => console.error(err)
    );
  }

}

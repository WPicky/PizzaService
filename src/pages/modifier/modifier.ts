import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { PizzaServices } from '../../providers/pizza-service/pizza-service';

/**
 * Generated class for the ModifierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifier',
  templateUrl: 'modifier.html',
})
export class ModifierPage {

  selectedItem;
  ingredient = [];
  testCheckboxOpen = false;

  // newPizz = {
  //   name: "",
  //   desc:"",
  //   picture: "",
  //   price: "",
  //   ingredients: this.ingredient
  // };

  constructor(public pizzaServ: PizzaServices,public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
    this.selectedItem = navParams.get('item');
    console.log(this.selectedItem);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  modifPizza(){
    this.pizzaServ.put(this.selectedItem.id, this.selectedItem);
  }


  addIngred() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Ajoutez vos ingrédients :');

    alert.addInput({
      type: 'checkbox',
      label: 'Pepperoni',
      value: 'pepperoni'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Olive',
      value: 'olive'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Tomate',
      value: 'tomate'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Pesto',
      value: 'pesto'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Poivron',
      value: 'poivron'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Chèvre',
      value: 'chevre'
    });

    alert.addButton('Retour');
    alert.addButton({
      text: 'Ajouter',
      handler: data => {
        console.log('Checkbox data:', data);
        this.ingredient= [];
        this.testCheckboxOpen = false;
        this.ingredient.push(data);
        this.presentToast("Super choix !")
      }
    });
    alert.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifierPage');
  }

}

import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { PizzaServices } from '../../providers/pizza-service/pizza-service';
import {getNodeStringContent} from "@ionic/app-scripts/dist/util/typescript-utils";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import {AdminPage} from "../admin/admin";

/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  ingredient = [];
  base64Image : string;
  imageImport : string;
  testCheckboxOpen = false;

  newPizz = {
    name: "",
    desc:"",
    picture: "",
    price: "",
    ingredients: this.ingredient
  };

  constructor(public pizzaServ: PizzaServices, private camera: Camera, public toastCtrl: ToastController,
              public alertCtrl: AlertController, public navCtrl: NavController) {
  }



  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }


  createPizza(){
    this.pizzaServ.post(this.newPizz).then((
      success) => {
      this.presentToast("Et une pizza de plus !")
      this.reload();
    }, (err) => {
      this.presentToast("Une erreur est survenue :(")
    });

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


  TakePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum : true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.newPizz.picture = this.base64Image;
      this.presentToast("C'est un succès !")
    }, (err) => {
      // Handle error
      this.presentToast("Une erreur est survenue :(")
    });
  }

  importPhoto() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.DestinationType.DATA_URL,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imageImport = 'data:image/jpeg;base64,' + imageData;
      this.newPizz.picture = this.imageImport;
      this.presentToast("C'est un succès !")
    }, (err) => {
      // Handle error
      this.presentToast("Une erreur est survenue :(")
    });
  }



  addToPizza(){


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

}

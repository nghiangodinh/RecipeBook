import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";

import { AuthService } from "./../../services/auth";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: "Signing you up ..."
    });
    loading.present();

    this.authService
      .signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: "Signup failed!",
          message: err.message,
          buttons: ["Ok"]
        });
        alert.present();
      });
  }
}

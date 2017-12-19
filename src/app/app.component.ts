import { AuthService } from "./../services/auth";
import { Component, ViewChild } from "@angular/core";
import { Platform, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TabsPage, SigninPage, SignupPage } from "../pages/pages";
import { MenuController } from "ionic-angular";
import firebase from "firebase";
import { SigninPage } from '../pages/signin/signin';

var config = {
  apiKey: "AIzaSyCIpi7ll3mGSJZHGIRQFczH1A14MmfSfNQ",
  authDomain: "sociallogin-971bb.firebaseapp.com",
  databaseURL: "https://sociallogin-971bb.firebaseio.com",
  projectId: "sociallogin-971bb",
  storageBucket: "sociallogin-971bb.appspot.com",
  messagingSenderId: "725317402175"
};

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  isAuthenticated: boolean;
  rootPage: any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;

  @ViewChild("nav") nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}

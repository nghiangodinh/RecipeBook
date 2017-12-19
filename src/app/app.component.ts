import { Component, ViewChild } from "@angular/core";
import { Platform, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TabsPage, SigninPage, SignupPage } from "../pages/pages";
import { MenuController } from "ionic-angular";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  tabsPage: any = TabsPage;
  signinPage: any = SigninPage;
  signupPage: any = SignupPage;

  @ViewChild("nav") nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController
  ) {
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
    //TODO: logout
  }
}

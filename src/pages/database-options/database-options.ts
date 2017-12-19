import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ViewController } from "ionic-angular";

@Component({
  selector: "page-database-options",
  templateUrl: "database-options.html"
})
export class DatabaseOptionsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {}

  onAction(action: string) {
    this.viewCtrl.dismiss({ action: action });
  }
}

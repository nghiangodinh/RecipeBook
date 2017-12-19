import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  PopoverController
} from "ionic-angular";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "./../../services/auth";
import { DatabaseOptionsPage } from "../pages";
import { Ingredient } from "../../models/ingredient";
import { ShoppingListService } from "./../../services/shopping-list";

@IonicPage()
@Component({
  selector: "page-shopping-list",
  templateUrl: "shopping-list.html"
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shoppingListService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getItems();
  }

  onCheckItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(
      form.value.ingredientName,
      form.value.amount
    );
    form.reset();
    this.loadItems();
  }

  onShowOptions($event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: "Please wait..."
    });

    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ ev: $event });
    popover.onDidDismiss(data => {
      if(!data) {
        return ;
      }

      if (data.action === "load") {
        loading.present();
        this.authService
          .getActiveUser()
          .getToken()
          .then((token: string) => {
            this.shoppingListService.fetchList(token).subscribe(
              (list: Ingredient[]) => {
                loading.dismiss();

                if (list) {
                  this.listItems = list;
                } else {
                  this.listItems = [];
                }
              },
              err => {
                loading.dismiss();
                this.handleError(err.json().error);
              }
            );
          });
      } else if (data.action === "store") {
        loading.present();
        this.authService
          .getActiveUser()
          .getToken()
          .then((token: string) => {
            this.shoppingListService.storeList(token).subscribe(
              () => {
                loading.dismiss();
              },
              err => {
                loading.dismiss();
                this.handleError(err.json().error);
              }
            );
          });
      }
    });
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: "An error occurred!",
      message: errorMessage,
      buttons: ["Ok"]
    });
    alert.present();
  }
}

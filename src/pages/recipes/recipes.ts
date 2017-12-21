import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  PopoverController
  } from 'ionic-angular';


import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage, RecipeEditPage, RecipePage } from '../pages';
import { Recipe } from './../../models/recipe';
import { RecipeService } from './../../services/recipe';



@IonicPage()
@Component({
  selector: "page-recipes",
  templateUrl: "recipes.html"
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recipeService: RecipeService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(RecipeEditPage, { mode: "New" });
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, { recipe, index });
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
            this.recipeService.fetchList(token).subscribe(
              (list: Recipe[]) => {
                loading.dismiss();

                if (list) {
                  this.recipes = list;
                } else {
                  this.recipes = [];
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
            this.recipeService.storeList(token).subscribe(
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

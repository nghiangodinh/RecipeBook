import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  AlertController,
  ToastController
} from "ionic-angular";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-recipe-edit",
  templateUrl: "recipe-edit.html"
})
export class RecipeEditPage implements OnInit {
  mode: "New";
  selectOptions = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      difficulty: new FormControl("Medium", Validators.required),
      ingredients: new FormArray([])
    });
  }

  onSubmit() {}

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: "What do you want to do?",
      buttons: [
        {
          text: "Add Ingredient",
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: "Remove all Ingredients",
          role: "destructive",
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get(
              "ingredients"
            );
            const len = fArray.length;
            for (let i = len - 1; i >= 0; i--) {
              fArray.removeAt(i);
            }
            const toast = this.toastCtrl.create({
              message: "All ingredients were deleted!",
              duration: 1000,
              position: "bottom"
            });
            toast.present();
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    const prompt = this.alertCtrl.create({
      title: "Add Ingredient",
      inputs: [
        {
          name: "name",
          placeholder: "Name"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Add",
          handler: data => {
            if (data.name === "" || data.name === null) {
              const toast = this.toastCtrl.create({
                message: "Please enter a valid value!",
                duration: 1000,
                position: "bottom"
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get("ingredients")).push(
              new FormControl(data.name, Validators.required)
            );
            const toast = this.toastCtrl.create({
              message: "Item added!",
              duration: 1000,
              position: "bottom"
            });
            toast.present();
          }
        }
      ]
    });
    return prompt;
  }
}

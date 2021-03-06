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

import { Recipe } from "./../../models/recipe";
import { RecipeService } from "../../services/recipe";
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: "page-recipe-edit",
  templateUrl: "recipe-edit.html"
})
export class RecipeEditPage implements OnInit {
  mode = "New";
  selectOptions = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    if (this.mode === "Edit") {
      this.recipe = this.navParams.get("recipe");
      this.index = this.navParams.get("index");
    }

    this.initializeForm();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = "Medium";
    let ingredients = [];

    if (this.mode === "Edit") {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;

      for (let ingredient of this.recipe.ingredients) {
        const fg = this.createIngredientFormGroup(ingredient)
        ingredients.push(fg);
      }
    }

    this.recipeForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      difficulty: new FormControl(difficulty, Validators.required),
      ingredients: new FormArray(ingredients)
    });
  }

  private createIngredientFormGroup(ingredient: Ingredient) {
    return new FormGroup({
      name: new FormControl(ingredient.name, Validators.required),
      amount: new FormControl(ingredient.amount, Validators.required)
    });
  }

  onSubmit() {
    const value = this.recipeForm.value;

    console.log(value.ingredients)

    if (this.mode === "Edit") {
      this.recipeService.updateRecipe(
        this.index,
        value.title,
        value.description,
        value.difficulty,
        value.ingredients
      );
    } else {
      this.recipeService.addRecipe(
        value.title,
        value.description,
        value.difficulty,
        value.ingredients
      );
    }

    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

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
          role: "cancel"
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
              this.createIngredientFormGroup(new Ingredient(data.name, 1))
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

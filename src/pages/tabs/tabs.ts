import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";

import { ShoppingListPage, RecipesPage } from "../pages";

@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  shoppingListPage = ShoppingListPage;
  recipesPage = RecipesPage;
}

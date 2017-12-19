import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { RecipeService } from "./../services/recipe";
import { ShoppingListService } from "./../services/shopping-list";
import { AuthService } from "../services/auth";

import { MyApp } from "./app.component";

import {
  RecipeEditPage,
  RecipePage,
  RecipesPage,
  ShoppingListPage,
  SigninPage,
  SignupPage,
  TabsPage
} from "../pages/pages";

@NgModule({
  declarations: [
    MyApp,
    RecipeEditPage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    SigninPage,
    SignupPage,
    TabsPage
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecipeEditPage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    SigninPage,
    SignupPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ShoppingListService,
    RecipeService,
    AuthService
  ]
})
export class AppModule {}

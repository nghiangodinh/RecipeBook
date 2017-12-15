import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeEditPage } from './recipe-edit';

@NgModule({
  declarations: [
    RecipeEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeEditPage),
  ],
})
export class RecipeEditPageModule {}

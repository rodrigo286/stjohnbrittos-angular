import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Menu',
    pathMatch: 'full'
  },
  {
    //path: 'folder/:id',
    path: 'folder/:dir',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    //path: ':id/:value',
    path: ':dir/:cat',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    //path: ':id/:cat/:value',
    path: ':dir/:cat/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

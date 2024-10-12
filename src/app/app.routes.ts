import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'alterar-senha',
    loadComponent: () =>
      import('./pages/alterar-senha/alterar-senha.page').then(
        (m) => m.AlterarSenhaPage
      ),
  },
  {
    path: 'excluir-conta',
    loadComponent: () =>
      import('./pages/excluir-conta/excluir-conta.page').then(
        (m) => m.ExcluirContaPage
      ),
  },
];

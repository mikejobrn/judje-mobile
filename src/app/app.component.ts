import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterLink,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  heartOutline,
  heartSharp,
  homeOutline,
  homeSharp,
  keyOutline,
  keySharp,
  logOutOutline,
  logOutSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from 'ionicons/icons';
import { Usuario } from './models/usuario';
import { SessaoService } from './services/sessao.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Alterar senha', url: '/alterar-senha', icon: 'key' },
    { title: 'Excluir conta', url: '/excluir-conta', icon: 'trash' },
  ];

  public usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private sessaoService: SessaoService
  ) {
    addIcons({
      homeOutline,
      homeSharp,
      keyOutline,
      keySharp,
      trashOutline,
      trashSharp,
      logOutOutline,
      logOutSharp,
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
    });
  }

  async ngOnInit() {
    this.sessaoService.usuario$.subscribe((usuario: Usuario | null) => {
      this.usuario = usuario;
    });
  }

  async sair() {
    const confirmacao = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: async () => {
            await this.sessaoService.encerrarSessao();
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    confirmacao.present();
  }
}

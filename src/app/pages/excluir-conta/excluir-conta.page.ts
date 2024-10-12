import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonMenuButton,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { SessaoService } from 'src/app/services/sessao.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-excluir-conta',
  templateUrl: './excluir-conta.page.html',
  styleUrls: ['./excluir-conta.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonInputPasswordToggle,
    IonMenuButton,
    IonRow,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ExcluirContaPage {
  public loading = false;
  public confirmacao = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private sessaoService: SessaoService
  ) {}

  async excluirConta() {
    if (this.confirmacao.toUpperCase() !== 'EXCLUIR') {
      const alerta = await this.alertController.create({
        header: 'Erro de validação',
        message: 'Você não digitou a palavra corretamente',
        buttons: ['OK'],
      });
      alerta.present();
    } else {
      const usuario = await this.sessaoService.getUsuarioLogado();
      if (usuario == null) {
        const alerta = await this.alertController.create({
          header: 'Problema de inconsistência',
          message: 'O usuário não foi encontrado',
          buttons: ['OK'],
        });
        alerta.present();
      } else {
        try {
          this.loading = true;
          await firstValueFrom(this.usuarioService.excluirConta(usuario.id));
          const alerta = await this.alertController.create({
            header: 'Sucesso',
            message: 'Sua conta foi excluída com sucesso',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.loading = false;
                  this.confirmacao = '';
                  this.sessaoService.encerrarSessao();
                  this.router.navigate(['/login']);
                },
              },
            ],
          });
          alerta.present();
        } catch (erro) {
          const alerta = await this.alertController.create({
            header: 'Erro na exclusão',
            message: (erro as HttpErrorResponse).error,
            buttons: ['OK'],
          });
          alerta.present();
        } finally {
          this.loading = false;
        }
      }
    }
  }
}

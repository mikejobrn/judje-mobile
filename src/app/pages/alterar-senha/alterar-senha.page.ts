import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { SessaoService } from 'src/app/services/sessao.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
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
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class AlterarSenhaPage {
  public loading = false;
  public novaSenha = '';
  public confirmacaoSenha = '';

  constructor(
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private sessaoService: SessaoService
  ) {}

  async alterar() {
    if (
      this.novaSenha !== this.confirmacaoSenha ||
      this.novaSenha.trim() === ''
    ) {
      const alerta = await this.alertController.create({
        header: 'Erro de validação',
        message: 'As senhas não conferem',
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
    
          await firstValueFrom(
            this.usuarioService.alterarSenha(usuario.id, this.novaSenha)
          );
          const alerta = await this.alertController.create({
            header: 'Sucesso',
            message: 'Sua senha foi alterada com sucesso',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.loading = false;
                this.novaSenha = '';
                this.confirmacaoSenha = '';
              }
            }],
          });
          alerta.present();
        } catch (erro) {
          const alerta = await this.alertController.create({
            header: 'Erro de validação',
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

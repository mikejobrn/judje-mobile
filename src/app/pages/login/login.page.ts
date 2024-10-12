import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
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
  IonItem,
  IonList,
  IonModal,
  IonNav,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { SessaoService } from 'src/app/services/sessao.service';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonInputPasswordToggle,
    IonItem,
    IonGrid,
    IonList,
    IonModal,
    IonNav,
    IonRow,
    IonSpinner,
    IonTitle,
    IonToolbar,
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpClientModule],
})
export class LoginPage {
  @ViewChild(IonModal) modal!: IonModal;

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  loading = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private sessaoService: SessaoService
  ) {
    this.sessaoService.getUsuarioLogado().then((usuario: Usuario | null) => {
      if (usuario) {
        this.router.navigate(['/home']);
      }
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async entrar() {
    if (this.email?.trim() === '' || this.senha?.trim() === '') {
      const alerta = await this.alertController.create({
        header: 'Erro de validação',
        message: 'Preencha todos os campos',
        buttons: ['OK'],
      });
      alerta.present();
    } else {
      try {
        this.loading = true;
        const usuarioEncontrado = await firstValueFrom(
          this.usuarioService.verificarLogin(this.email, this.senha)
        );
        this.sessaoService.iniciarSessao(usuarioEncontrado as Usuario);
        this.email = '';
        this.senha = '';
        this.loading = false;
        this.router.navigate(['/home']);
      } catch (erro) {
        let mensagem;
        if (erro instanceof HttpErrorResponse && erro.status !== 0) {
          mensagem = erro.error;
        } else {
          mensagem = 'Houve um problema na requisição. Tente novamente mais tarde'
        }
        const alerta = await this.alertController.create({
          header: 'Erro no login',
          message: mensagem,
          buttons: ['OK'],
        });
        alerta.present();
      } finally {
        this.loading = false;
      }
    }
  }

  async cadastrar() {
    if (this.senha === this.confirmarSenha) {
      try {
        this.loading = true;

        await firstValueFrom(
          this.usuarioService.cadastrar({
            nome: this.nome,
            email: this.email,
            senha: this.senha,
          })
        );

        const alerta = await this.alertController.create({
          header: 'Sucesso',
          message: 'Usuário cadastrado com sucesso!',
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: () => {
                this.loading = false;
                this.email = '';
                this.senha = '';
                this.confirmarSenha = '';
                this.modal.dismiss();
              },
            },
          ],
        });
        alerta.present();
      } catch (erro) {
        const alerta = await this.alertController.create({
          header: 'Erro na criação do usuário',
          message: (erro as HttpErrorResponse).error,
          buttons: ['OK'],
        });
        alerta.present();
      } finally {
        this.loading = false;
      }
    } else {
      const alerta = await this.alertController.create({
        header: 'Erro de validação',
        message: 'As senhas não conferem',
        buttons: ['OK'],
      });
      alerta.present();
    }
  }
}

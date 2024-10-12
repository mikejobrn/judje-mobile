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
  IonMenuButton,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { BuscaService } from 'src/app/services/busca.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonHeader,
    IonMenuButton,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage {
  public loading = false;
  public uf = 'RJ';
  public descritores = '';

  constructor(
    private alertController: AlertController,
    private buscaService: BuscaService,
  ) {}

  async gerarBaseDados() {
    if (this.descritores === '') {
      const alerta = await this.alertController.create({
        header: 'Erro de validação',
        message: 'Preencha com os descritores desejados',
        buttons: ['OK'],
      });
      alerta.present();
    } else {
      try {
        this.loading = true;
        const blob = await firstValueFrom(this.buscaService.buscaSimples(this.descritores, this.uf)) as Blob;
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'arquivo.csv';  // Nome do arquivo que será baixado
        a.click();
        URL.revokeObjectURL(objectUrl);  // Limpar a URL temporária
        this.loading = false;
      } catch (erro) {
        const alerta = await this.alertController.create({
          header: 'Erro de validação',
          message: (erro as HttpErrorResponse).error,
          buttons: ['OK'],
        });
        alerta.present();
      }
    }
  }
}

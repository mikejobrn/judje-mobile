import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Usuario } from '../models/usuario';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessaoService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();
  
  constructor() {
    this.getUsuarioLogado()
      .then((usuario: Usuario | null) => {
        this.usuarioSubject.next(usuario);
      })
  }

  async iniciarSessao(usuario: Usuario) {
    await Preferences.set({
      key: 'usuario',
      value: JSON.stringify(usuario),
    });
    this.usuarioSubject.next(usuario);
  }

  async encerrarSessao() {
    await Preferences.remove({
      key: 'usuario',
    });
    this.usuarioSubject.next(null);
  }

  async getUsuarioLogado(): Promise<Usuario | null> {
    const usuarioLogado = await Preferences.get({ key: 'usuario' });
    if (usuarioLogado.value) {
      return JSON.parse(usuarioLogado.value);
    }
    return null;
  }
}

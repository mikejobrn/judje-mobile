import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioCadastrarDto } from '../dtos/usuario/cadastar.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) {}

  cadastrar(usuarioDto: UsuarioCadastrarDto) {
    return this.httpClient.post(
      `${environment.urlApi}/usuarios`,
      {
        nome: usuarioDto.nome,
        email: usuarioDto.email,
        senha: usuarioDto.senha,
      },
    );
  }

  verificarLogin(email: string, senha: string) {
    return this.httpClient.post(
      `${environment.urlApi}/usuarios/logar`,
      { email, senha },
    );
  }

  alterarSenha(idUsuario: number, novaSenha: string) {
    return this.httpClient.patch(
      `${environment.urlApi}/usuarios/${idUsuario}`,
      { nova_senha: novaSenha },
    );
  }

  excluirConta(idUsuario: number) {
    return this.httpClient.delete(
      `${environment.urlApi}/usuarios/${idUsuario}`,
    );
  }
}

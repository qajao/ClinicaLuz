import { BasePage } from './base.page.js';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.campoEmail = this.page.locator('input[name="email"]');
    this.campoSenha = this.page.locator('input[name="password"]');
    this.botaoEntrar = this.page.getByRole('button', { name: entrar });
  }

  async irParaPaginaLogin() {
    await this.irParaUrl('https://clinicaluz.com/agendamento/login');
  }

  async fazerLogin(email, senha) {
    await this.campoEmail.fill(email);
    await this.campoSenha.fill(senha);
    await this.botaoEntrar.click();
    await expect(this.page).toHaveURL('https://clinicaluz.com/agendamento', { timeout: 5000 });
  }
}

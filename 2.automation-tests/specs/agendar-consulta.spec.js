import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { AgendamentoPage } from '../pages/agendamento.page.js';

test.describe('Agendamento de consultas - E2E', () => {
  test('Deve agendar uma nova consulta com sucesso', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const agendamentoPage = new AgendamentoPage(page);

    await loginPage.irParaPaginaLogin();
    await loginPage.fazerLogin('usuario@teste.com', 'senha123');

    await agendamentoPage.criarConsulta('2023-12-15', '10:30');
    await agendamentoPage.verificarConsultaExiste('2023-12-15', '10:30');
  });
});
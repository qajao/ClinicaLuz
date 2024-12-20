import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { AgendamentoPage } from '../pages/agendamento.page.js';

test.describe('Cancelamento de consultas - E2E', () => {
  test('Deve cancelar uma consulta existente', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const agendamentoPage = new AgendamentoPage(page);

    await loginPage.irParaPaginaLogin();
    await loginPage.fazerLogin('usuario@teste.com', 'senha123');

    const data = '2023-12-20';
    const horario = '14:00';
    await agendamentoPage.criarConsulta(data, horario);
    await agendamentoPage.verificarConsultaExiste(data, horario);

    await agendamentoPage.cancelarConsultaPorIndice(0);
    await agendamentoPage.verificarConsultaNaoExiste(data, horario);
  });
});
import { BasePage } from './base.page.js';
import { expect } from '@playwright/test';

export class AgendamentoPage extends BasePage {
  constructor(page) {
    super(page);
    this.botaoNovoAgendamento = this.page.getByRole('button', { name: /novo agendamento/i });
    this.seletorData = this.page.locator('input[name="data"]');
    this.seletorHorario = this.page.locator('select[name="horario"]');
    this.botaoConfirmar = this.page.getByRole('button', { name: /confirmar/i });
    this.itensConsulta = this.page.locator('[data-testid="appointment-item"]');
  }

  async criarConsulta(data, horario) {
    await this.botaoNovoAgendamento.click();
    await this.seletorData.fill(data);
    await this.seletorHorario.selectOption(horario);
    await this.botaoConfirmar.click();    
    await expect(this.itensConsulta).toHaveCountGreaterThan(0, { timeout: 5000 });
  }

  async cancelarConsultaPorIndice(indice = 0) {
    const item = this.itensConsulta.nth(indice);
    await expect(item).toBeVisible({ timeout: 3000 });
    const botaoCancelar = item.getByRole('button', { name: cancelar });
    await botaoCancelar.click();
    const confirmarCancelamento = this.page.getByRole('button', { name: /confirmar cancelamento/i });
    await confirmarCancelamento.click();
    await expect(item).toBeHidden({ timeout: 5000 });
  }

  async verificarConsultaExiste(dataEsperada, horarioEsperado) {
    
    const consultaFiltrada = this.itensConsulta.filter({hasText: dataEsperada}).filter({hasText: horarioEsperado});
    await expect(consultaFiltrada).toHaveCount(1, { timeout: 5000 });
  }

  async verificarConsultaNaoExiste(dataEsperada, horarioEsperado) {
    const consultaFiltrada = this.itensConsulta.filter({hasText: dataEsperada}).filter({hasText: horarioEsperado});
    await expect(consultaFiltrada).toHaveCount(0, { timeout: 5000 });
  }
}

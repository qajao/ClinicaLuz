# Documento de Planejamento de Teste

## Introdução

Este documento apresenta o plano de testes do sistema de agendamento de consultas médicas, levando em conta cenários end-to-end, testes de API e de integração. O objetivo é garantir a qualidade, a segurança e a robustez do sistema em cenários comuns e críticos para o projeto ClinicaLuz ( https://clinicaluz.com/agendamento ). Ele também descreve os riscos associados e as estratégias de mitigação.

## Escopo e Objetivos

- Verificar o funcionamento correto do sistema em diversos cenários de uso: autenticação, agendamento, notificações, pagamentos, controle de acesso, entre outros.
- Garantir a segurança, a integridade dos dados e a experiência do usuário, assegurando o cumprimento das regras de negócio.
- Avaliar a resiliência do sistema diante de falhas, indisponibilidade e uso incorreto.

## Abordagem de Teste

A abordagem contempla testes:
- **End-to-End (E2E):** Validação do fluxo completo do usuário, da interface ao backend.
- **API:** Avaliação da lógica de negócio e segurança em nível de serviço.
- **Integração:** Verificação da comunicação com serviços externos.

A priorização será pela matriz de risco, focando em cenários de maior impacto e probabilidade, depois nos demais cenários.

---

## Matriz de Risco (Priorização dos Testes)

**Escalas:**  
- Probabilidade (P): 1 (Baixa) a 5 (Alta)  
- Impacto (I): 1 (Baixo) a 5 (Crítico)  
- R = P x I

Lista de cenários (15 casos):

1. Login com credenciais inválidas (E2E)  
2. Reagendamento de consulta (E2E)  
3. Notificação ao paciente após agendamento (Integração)  
4. Tentativa de agendar em data/hora passada (E2E)  
5. Lembrete de consulta (Integração)  
6. Controle de acesso por tipo de conta (E2E, API)  
7. Pagamento online da consulta (Integração)  
8. Agendamento com confirmação em 2 etapas (SMS) (E2E)  
9. Tentativa de agendar com conta inativa/bloqueada (E2E, API)  
10. Acesso a dados de consulta sem token válido (API)  
11. Modificação de detalhes da consulta (E2E, API)  
12. Agendamento de consultas sobrepostas (E2E, API)  
13. Indisponibilidade do sistema (E2E)  
14. Preferências de notificação do paciente (E2E, API)  
15. Agendamento de acompanhamento pós-consulta (E2E, API)

| Cenário                                                    | P | I | R=P×I | Mitigação                                                                                                                                     |
|------------------------------------------------------------|---|---|-------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| 1. Login com credenciais inválidas                         | 3 | 3 | 9     | Testes E2E automatizados, bloqueio após falhas, monitoramento de tentativas de login.                                                          |
| 2. Reagendamento de consulta                               | 3 | 4 | 12    | Testes E2E, logs de erro em produção, fallback de horário.                                                                                     |
| 3. Notificação ao paciente após agendamento (Integração)   | 2 | 4 | 8     | Mockar serviços, monitorar fila de notificações, alertas de falha.                                                                             |
| 4. Tentativa de agendar em data/hora passada               | 3 | 4 | 12    | E2E verificando validação, bloquear datas passadas na UI, auditoria do calendário.                                                             |
| 5. Lembrete de consulta (Integração)                       | 2 | 4 | 8     | Testes integrados do agendador, monitorar logs de lembrete, alertas de falha no envio.                                                          |
| 6. Controle de acesso por tipo de conta (E2E, API)         | 3 | 5 | 15    | Testes E2E e API, auditoria de acessos, testes de segurança focados em permissões.                                                             |
| 7. Pagamento online da consulta (Integração)               | 3 | 5 | 15    | Testes de integração com sandbox, monitoramento transacional, fallback manual se gateway falhar.                                               |
| 8. Agendamento 2 etapas (SMS) (E2E)                        | 3 | 4 | 12    | E2E com simulação de código SMS, auditoria de logs de confirmação.                                                                             |
| 9. Tentativa de agendar com conta inativa/bloqueada        | 2 | 5 | 10    | E2E e API, mensagens claras, logs de auditoria, monitorar tentativas.                                                                          |
| 10. Acesso sem token válido (API)                          | 4 | 5 | 20    | JWT com expiração, testes segurança API, monitoramento de acessos negados, WAF.                                                                |
| 11. Modificação de detalhes da consulta (E2E, API)         | 3 | 4 | 12    | E2E e API, logs de auditoria, rollback se falhar, monitorar erros.                                                                             |
| 12. Agendamento sobreposto (E2E, API)                      | 4 | 4 | 16    | E2E e API, validação no backend, logs tentativas inválidas.                                                                                    |
| 13. Indisponibilidade do sistema (E2E)                     | 3 | 5 | 15    | E2E simulando falha total, monitoramento de uptime, fallback amigável, alertas imediatos.                                                      |
| 14. Preferências de notificação do paciente (E2E, API)     | 2 | 3 | 6     | E2E e API, logs de alterações, fallback se falhar, testes de regressão pós-deploy.                                                             |
| 15. Acompanhamento pós-consulta (E2E, API)                 | 3 | 3 | 9     | E2E e API, auditoria do relacionamento pós-consulta, fallback manual.                                                                          |

**Cenários de maior prioridade:**  
- Cenário 10 (R=20)  
- Cenário 12 (R=16)  
- Cenários 6, 7, 13 (R=15)

---

## Tabela de Casos de Teste

**Legenda de Tipo de Teste:**
- E2E: End-to-End
- API
- Integração

| ID   | Cenário de Teste                                                           | Tipo de Teste            | Pré-condições                                      | Passos                                                                                                 | Resultado Esperado                                                    |
|------|----------------------------------------------------------------------------|--------------------------|----------------------------------------------------|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| CT01 | Login com credenciais inválidas                                            | E2E                     | Usuário cadastrado; senha incorreta               | 1. Acessar tela de login<br>2. Inserir credenciais inválidas<br>3. Tentar logar                         | Mensagem de erro; nenhum token gerado                                 |
| CT02 | Reagendamento de consulta                                                  | E2E                     | Consulta futura existente                         | 1. Acessar agenda<br>2. Selecionar consulta<br>3. Novo horário<br>4. Confirmar                          | Consulta reagendada; horário atualizado                                |
| CT03 | Notificação após agendamento                                               | Integração              | Serviço e-mail/SMS ativo                          | 1. Agendar consulta<br>2. Verificar caixa de mensagem do paciente                                      | Notificação recebida com dados corretos                                |
| CT04 | Tentativa de agendar em data/hora passada                                  | E2E                     | Nenhuma                                          | 1. Selecionar data/hora passada<br>2. Confirmar                    | Erro "Horário inválido"; consulta não criada                           |
| CT05 | Lembrete de consulta (X dias/horas antes)                                   | Integração              | Consulta futura agendada                          | 1. Aguardar cron<br>2. Verificar recebimento do lembrete            | Lembrete enviado no prazo, conteúdo adequado                           |
| CT06 | Controle de acesso (admin vs. comum)                                       | E2E, API                | Usuário admin e comum criados                     | 1. Logar como admin<br>2. Ver consultas<br>3. Logar como comum e tentar ver consultas de outro paciente | Admin vê todas; comum vê as suas próprias                              |
| CT07 | Pagamento online da consulta                                               | Integração              | Consulta pendente; gateway configurado            | 1. Selecionar consulta a pagar<br>2. Dados cartão<br>3. Confirmar pagamento                             | Pagamento aprovado; status "Paga"; recibo disponível                   |
| CT08 | Agendamento com confirmação em 2 etapas (SMS)                              | E2E                     | Número de telefone válido                         | 1. Agendar consulta<br>2. Receber código SMS<br>3. Inserir código no sistema                           | Consulta confirmada após código correto                                |
| CT09 | Tentativa de agendar com conta inativa/bloqueada                           | E2E, API                | Conta inativa/bloqueada                          | 1. Logar com conta inativa<br>2. Tentar agendar                     | Ação negada; mensagem "Conta inativa"                                  |
| CT10 | Acesso sem token válido (API)                                              | API                     | Chamada sem token ou token expirado              | 1. Requisitar /api/consultas sem token válido                      | HTTP 401/403; nenhum dado retornado                                    |
| CT11 | Modificação de detalhes da consulta                                        | E2E, API                | Consulta existente                               | 1. Acessar detalhes<br>2. Editar campos<br>3. Salvar               | Dados atualizados; mensagem de sucesso                                 |
| CT12 | Agendamento sobreposto (intervalo parcial)                                 | E2E, API                | Outra consulta no mesmo horário                  | 1. Tentar agendar sobrepondo<br>2. Confirmar                        | Erro "Horário indisponível"; sem agendamento criado                    |
| CT13 | Indisponibilidade do sistema                                               | E2E                     | Backend indisponível (simulação)                 | 1. Acessar sistema durante falha<br>2. Verificar UI                | Mensagem de erro;                    |
| CT14 | Preferências de notificação do paciente                                    | E2E, API                | Usuário com preferências definidas               | 1. Ajustar preferências<br>2. Agendar consulta<br>3. Verificar envio | Notificações apenas pelos canais selecionados                          |
| CT15 | Acompanhamento pós-consulta                                                | E2E, API                | Consulta anterior concluída                      | 1. Acessar histórico<br>2. "Agendar acompanhamento"<br>3. Confirmar | Consulta de acompanhamento criada; mensagem de sucesso                 |

---

## Tabela de Critérios de Aceite


| ID do Caso | Cenário de Teste                                      | Critérios de Aceite (BDD)                                                                                                                                                                |
|------------|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CT01       | Login com credenciais inválidas                        | **Dado** que o usuário está na página de login<br>**Quando** inserir credenciais inválidas e tentar logar<br>**Então** exibir mensagem de erro e não gerar token |
| CT02       | Reagendamento de consulta                              | **Dado** uma consulta futura agendada<br>**Quando** o usuário escolher um novo horário e confirmar<br>**Então** a consulta deve ser reagendada e o horário atualizado                       |
| CT03       | Notificação após agendamento                           | **Dado** que uma consulta foi agendada<br>**Quando** a notificação for enviada ao paciente<br>**Então** o paciente deve receber e-mail/SMS com dados corretos                              |
| CT04       | Tentativa de agendar em data/hora passada              | **Dado** que o usuário seleciona uma data/hora já ocorrida<br>**Quando** tentar agendar<br>**Então** o sistema exibe erro "Horário inválido" e não cria consulta                           |
| CT05       | Lembrete de consulta (X dias/horas antes)              | **Dado** uma consulta futura<br>**Quando** chegar o tempo (X horas/dias antes)<br>**Então** enviar lembrete com conteúdo correto, sem falhas                                                |
| CT06       | Controle de acesso (admin vs. comum)                   | **Dado** usuário admin e comum<br>**Quando** o admin acessar consultas e o comum tentar acessar consultas de outros pacientes<br>**Então** admin vê todas, comum vê apenas suas            |
| CT07       | Pagamento online da consulta                           | **Dado** uma consulta pendente de pagamento<br>**Quando** inserir dados do cartão e confirmar pagamento<br>**Então** a transação deve aprovar, status "Paga" e recibo disponível           |
| CT08       | Agendamento com confirmação em 2 etapas (SMS)          | **Dado** que uma consulta foi agendada esperando código SMS<br>**Quando** o paciente inserir o código recebido<br>**Então** a consulta é confirmada com sucesso                           |
| CT09       | Conta inativa/bloqueada ao agendar                     | **Dado** que a conta do usuário está inativa<br>**Quando** tentar agendar uma consulta<br>**Então** ação negada, exibir mensagem "Conta inativa", sem criar agendamento                    |
| CT10       | Acesso sem token válido (API)                          | **Dado** requisição à API sem token válido<br>**Quando** tentar acessar dados de consulta<br>**Então** retorno 401/403, sem exposição de dados sensíveis                                   |
| CT11       | Modificação de detalhes da consulta                    | **Dado** uma consulta existente<br>**Quando** editar detalhes e salvar<br>**Então** dados atualizados, mensagem de sucesso e visualização refletida                                         |
| CT12       | Agendamento sobreposto (intervalo parcial)             | **Dado** outra consulta no mesmo horário<br>**Quando** tentar agendar sobrepondo<br>**Então** erro "Horário indisponível", sem criar nova consulta                                         |
| CT13       | Indisponibilidade do sistema                           | **Dado** que o backend está indisponível<br>**Quando** tentar acessar o sistema<br>**Então** exibir mensagem de erro e alertas para equipe               |
| CT14       | Preferências de notificação do paciente                | **Dado** que o paciente tem preferências definidas<br>**Quando** agendar consulta<br>**Então** notificações apenas pelos canais selecionados, sem envio indevido                           |
| CT15       | Agendamento de acompanhamento pós-consulta             | **Dado** uma consulta anterior concluída<br>**Quando** agendar acompanhamento<br>**Então** consulta de acompanhamento criada, mensagem de sucesso e dados refletidos corretamente           |


## Ambiente de Teste
- Configurações de hardware:

- Servidor: 8 CPUs, 32GB RAM.

- Cliente: Dispositivos móveis e desktops com diferentes configurações.

## Configurações de software:

- Sistema Operacional: Windows, Linux, iOS, Android.

- Ferramentas de Teste: Playwrigth, Postman, Kibana.

---

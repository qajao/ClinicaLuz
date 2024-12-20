# Bug Report

## Título do Bug
Erro ao tentar cancelar consulta criada há menos de 5 minutos

---

## Descrição
**Resumo**: Ao tentar cancelar uma consulta logo após criá-la dentro do tempo de 5 minutos, o sistema não permite o cancelamento.

**Impacto**: Esse problema causa frustração para o usuário, pois ele cria uma consulta por engano e não consegue cancelar imediatamente, podendo gerar instatisfação e fazer o usuário achar que o sistema não está funcionando corretamente.

---

## Passos para Reproduzir
1. Acesse a página de agendamento de consultas (https://clinicaluz.com/agendamento).
2. Realizar login com seu usuário e senha.
3. Crie uma nova consulta.
4. Assim que a consulta for criada, tente cancelá-la imediatamente (menos de 5 minutos após a criação).
5. Observe que o sistema não permite o cancelamento e apresenta uma mensagem de erro.

---

## Comportamento Esperado
O sistema deveria permitir que o usuário cancele a consulta logo após criá-la, sem ter que esperar 5 minutos. Quando um usuário cria uma consulta por engano, ele deve conseguir deletar de imediato, sem impedimentos.

---

## Comportamento Atual
Atualmente, o sistema impede o cancelamento de consultas criadas há menos de 5 minutos, resultando em erro ou mensagem que impede o usuário de concluir o cancelamento.

---

## Ambiente de Teste
- **Dispositivo**: Desktop
- **Sistema Operacional**: Windows 11
- **Navegador**: Google Chrome versão 10
- **Ambiente**: Produção

---

## Evidências
* adicionar videos, screenshot pc ou telefone*

---

## Critérios de Aceitação
- O sistema deve permitir o cancelamento imediato de uma consulta após a sua criação.
- O usuário deve receber uma  mensagem confirmando que a  consulta foi cancelada com sucesso.

---

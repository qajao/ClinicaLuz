## Pré-requisitos

- **Node.js instalado:**  
  Caso não tenha, acesse [https://nodejs.org/](https://nodejs.org/) e baixe a versão recomendada.

## Crie uma pasta para o projeto
1. digite o comando npm init -y
2. instale o playwright npx playwright install
3. Adicione um script no package.json
{
  "scripts": {
    "test:e2e": "npx playwright test"
  }
}

5. Execute o codigo npm run test:e2e

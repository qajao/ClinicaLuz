export class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async irParaUrl(url) {
      await this.page.goto(url);
    }
  }
  
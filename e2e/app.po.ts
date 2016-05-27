export class PouchdbPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pouchdb-app h1')).getText();
  }
}

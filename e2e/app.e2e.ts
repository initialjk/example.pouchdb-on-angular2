import { PouchdbPage } from './app.po';

describe('pouchdb App', function() {
  let page: PouchdbPage;

  beforeEach(() => {
    page = new PouchdbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('pouchdb works!');
  });
});

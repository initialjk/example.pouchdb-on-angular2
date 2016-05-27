import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PouchdbAppComponent } from '../app/pouchdb.component';

beforeEachProviders(() => [PouchdbAppComponent]);

describe('App: Pouchdb', () => {
  it('should create the app',
      inject([PouchdbAppComponent], (app: PouchdbAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'pouchdb works!\'',
      inject([PouchdbAppComponent], (app: PouchdbAppComponent) => {
    expect(app.title).toEqual('pouchdb works!');
  }));
});

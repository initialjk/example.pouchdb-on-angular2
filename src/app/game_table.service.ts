import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
    
import { GameTable } from './game_table';

export var GAME_TABLES: GameTable[] = [
    { "id": "table_from_service", "name": "Service Table", "blind_big": 2, "blind_small": 1 }
];

declare var PouchDB:any;
let localDB = new PouchDB('game_table');
    
@Injectable()
export class GameTableService {
  private _game_tables_source = new BehaviorSubject<GameTable[]>([]);
  game_tables$ = this._game_tables_source.asObservable();
    
  constructor() {
    let options = {
      live: true,
      retry: true
    };

    let service = this;
    this.localDB.replicate.from(this.remote, options)
      .on('complete', function (info) {
        console.log("Replication is completed!", info);
        service.getGameTableDocuments().then(
          alldoc => service._game_tables_source.next(alldoc.rows));
      })
      .on('change', function (change) {
        console.log("yo, something changed!", change);
        service.getGameTableDocuments().then(
          alldoc => service._game_tables_source.next(alldoc.rows));
      })
      .on('paused', function (info) {
        console.log("replication was paused, usually because of a lost connection", info);
      })
      .on('active', function (info) {
        console.log("replication was resumed", info);
      })
      .on('error', function (err) {
        console.log("totally unhandled error (shouldn't happen)", err);
      });

    this.localDB.info().then(function (info) {
        console.log("localDB",info);
    });
  }

  localDB = localDB;
  remote = 'http://52.197.2.11:5984/sample-repl';
    
  getGameTableDocuments() {
    var docs = this.localDB.allDocs({
      include_docs: true
    });
    console.log("Got whole table list", docs);
    return docs;
  }
}
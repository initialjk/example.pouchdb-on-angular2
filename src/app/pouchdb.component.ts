import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import { GameTable } from './game_table';
import { GameTableService } from './game_table.service';

@Component({
  moduleId: module.id,
  selector: 'pouchdb-app',
  templateUrl: 'pouchdb.component.html',
  styleUrls: ['pouchdb.component.css'],
  providers: [GameTableService]
})

export class PouchdbAppComponent implements OnInit {
  title = 'Records of PouchDB!';
  game_tables = GAME_TABLES;
  subscription:Subscription;
    
  constructor(private gameTableService: GameTableService) {}
    
  ngOnInit() {
    this.subscription = this.gameTableService.game_tables$.subscribe(
      game_tables => this.game_tables = game_tables
    );
    this.refreshGameTables();    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshGameTables() {
    this.gameTableService.getGameTableDocuments().then(
      alldoc => this.game_tables = alldoc.rows
    );
  }
}

var GAME_TABLES: GameTable[] = [
  { "id": "place_holer", "name": "not loaded", "blind_big": 0, "blind_small": 0 }
];

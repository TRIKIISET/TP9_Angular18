import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game';
import { HttpClient } from '@angular/common/http';
const URL = "http://localhost:3000/games"
@Injectable({
  providedIn: 'root'
})
export class GameService {

  http : HttpClient = inject(HttpClient);
  constructor() { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(URL);
  }

  addGame(game:Game):Observable<Game>{
    return this.http.post<Game>(URL, game);
  }
}

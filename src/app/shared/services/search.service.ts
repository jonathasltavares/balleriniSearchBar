import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comunity } from '../interfaces/result';
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})

export class SearchService {

  private url = "https://discord.com/api//discovery/";
  constructor(private http:HttpClient) {}

  getComunity(term: string): Observable<any[]> {
    return this.http
      .get<any>(`${this.url}search?query=${term}&limit=12`)
      .pipe(
        map(response => response.hits.map((hit: { vanity_url_code: any; id: any; name: any; approximate_member_count: any;icon:any }) => ({
          id: hit.id,
          name: hit.name,
          members: hit.approximate_member_count,
          icon: `https://cdn.discordapp.com/icons/${hit.id}/${hit.icon}`,
          code: hit.vanity_url_code
        }))))
  }

}

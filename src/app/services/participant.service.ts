import { Injectable                   } from '@angular/core';
import { HttpClient, HttpHeaders      } from '@angular/common/http';
import { Observable, from, of         } from 'rxjs';
import { catchError, map, tap         } from 'rxjs/operators';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/concatMap';

import { Participant                  } from '@appModels/participant';

@Injectable()
export class ParticipantService {

  constructor(private http: HttpClient) {}

  getParticipants (): Observable<Participant[]> {
    return this.http.get<Participant[]>('http://89.223.27.70/participants')
      .pipe(
        tap(participant => console.log(`fetched participants`)),
        catchError(this.handleError('getParticipants', []))
      )
    ;
  }

  updateParticipant (payload): Observable<Participant> {
    return Observable.create(obs => {
      obs.next(payload);
      obs.complete();
    }).delay(1000);
  }

  deleteParticipant (payload): Observable<any> {
    return Observable.create(obs => {
      obs.next({
        id: payload.id
      });
      obs.complete();
    }).delay(1000);
  }

  addParticipant (payload): Observable<Participant> {
    return Observable.create(obs => {
      obs.next(payload);
      obs.complete();
    }).delay(1000);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

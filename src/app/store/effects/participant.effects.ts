import { Injectable                                    } from '@angular/core';
import { Actions, Effect, ofType                       } from '@ngrx/effects';
import { switchMap, map, catchError, tap, debounceTime } from 'rxjs/operators';
import { of                                            } from 'rxjs';

import {
  ParticipantActionTypes,
  GetParticipants,
  GetParticipantsSuccess,
  UpdateParticipant,
  UpdateParticipantSuccess,
  DeleteParticipant,
  DeleteParticipantSuccess,
  AddParticipant,
  AddParticipantSuccess,
  ErrorParticipant
}                             from '@appStore/actions/participant.actions';
import { ParticipantService } from '@appServices/participant.service';

@Injectable()
export class ParticipantEffects {
  constructor(private actions$           : Actions,
              private participantService : ParticipantService) {}

  @Effect()
  loadParticipants$ = this.actions$.pipe(
    ofType(ParticipantActionTypes.participantGetParticipants),
    switchMap(() =>
      this.participantService.getParticipants()
        .pipe(
          map(participants => new GetParticipantsSuccess(participants)),
          catchError(error => of(new ErrorParticipant(error)))
        )
    )
  );

  @Effect()
  updateParticipant$ = this.actions$.pipe(
    ofType(ParticipantActionTypes.participantUpdateParticipant),
    switchMap((action: UpdateParticipant) =>
      this.participantService.updateParticipant(action.payload)
        .pipe(
          map(participant => new UpdateParticipantSuccess(participant)),
          catchError(error => of(new ErrorParticipant(error)))
        )
    )
  );

  @Effect()
  deleteParticipant$ = this.actions$.pipe(
    ofType(ParticipantActionTypes.participantDeleteParticipant),
    switchMap((action: DeleteParticipant) =>
      this.participantService.deleteParticipant(action.payload)
        .pipe(
          map(participant => new DeleteParticipantSuccess(action.payload)),
          catchError(error => of(new ErrorParticipant(error)))
        )
    )
  );

  @Effect()
  addParticipant$ = this.actions$.pipe(
    ofType(ParticipantActionTypes.participantAddParticipant),
    switchMap((action: AddParticipant) =>
      this.participantService
        .addParticipant(action.payload)
        .pipe(
          map(participant => new AddParticipantSuccess(action.payload)),
          catchError(error => of(new ErrorParticipant(error)))
        )
    )
  );
}

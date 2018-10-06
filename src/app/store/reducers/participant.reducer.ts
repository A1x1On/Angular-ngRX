import { Action                                     } from '@ngrx/store';
import {
  EntityAdapter,
  createEntityAdapter,
  EntityState,
  Update
                                                    } from '@ngrx/entity';
import { Participant                                } from '@appModels/participant';
import { ParticipantActions, ParticipantActionTypes } from '@appStore/actions/participant.actions';

export interface State extends EntityState<Participant> {
  loaded     : boolean;
  loading    : boolean;
  error      : any;
  selectedId : number;
}

export const adapter      : EntityAdapter<Participant> = createEntityAdapter<Participant>();
export const initialState : State                      = adapter.getInitialState({
  loaded     : false,
  loading    : false,
  selectedId : null,
  error      : null
});

export function reducer(state = initialState, action: ParticipantActions): State {

  switch (action.type) {
    case ParticipantActionTypes.participantGetParticipants:
    case ParticipantActionTypes.participantUpdateParticipant:
    case ParticipantActionTypes.participantDeleteParticipant:
    case ParticipantActionTypes.participantAddParticipant:
      return {
        ...state,
        loading : true
      }
    ;

    case ParticipantActionTypes.participantGetParticipantsSuccess:
      return adapter.addAll(action.payload, {
        ...state,
        loading : false,
        loaded  : true
      })
    ;

    case ParticipantActionTypes.participantUpdateParticipantSuccess:
      return adapter.updateOne(
        {
          id      : action.payload.id,
          changes : action.payload
        },
        {
          ...state,
          loading : false,
          loaded  : true
        }
      )
    ;

    case ParticipantActionTypes.participantDeleteParticipantSuccess:
      return adapter.removeOne(action.payload.id, {
        ...state,
        loading : false,
        loaded  : true
      })
    ;

    case ParticipantActionTypes.participantAddParticipantSuccess:
      return adapter.addOne(action.payload, {
        ...state,
        loading : false,
        loaded  : true
      })
    ;

    case ParticipantActionTypes.participantErrorParticipant:
      return {
        ...state,
        loading : false,
        loaded  : false,
        error   : action.payload
      }
    ;

    default:
      return state;
  }
}

export const participantEntitySelectors = adapter.getSelectors();

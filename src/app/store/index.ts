import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { storeFreeze                       } from 'ngrx-store-freeze';
import { environment                       } from '../../environments/environment';

import * as fromReducers                     from './reducers';
import { ParticipantEffects                } from '@appStore/effects/participant.effects';

export interface State {
  participant: fromReducers.participant.State;
}

export const reducers: ActionReducerMap<State> = {
  participant: fromReducers.participant.reducer
};

export const effects = [ParticipantEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

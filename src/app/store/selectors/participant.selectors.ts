import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducers                         from '@appStore/reducers';

export const getParticipantStore    = createFeatureSelector('participant');
export const getParticipantEntities = createSelector(getParticipantStore, fromReducers.participant.participantEntitySelectors.selectAll);

export const getParticipants = createSelector(getParticipantEntities, entities => {
  return Object.values(entities);
});

export const getParticipantsLoaded = createSelector(
  getParticipantStore,
  (participantStore: fromReducers.participant.State) => participantStore.loaded
);

export const getParticipantsLoading = createSelector(
  getParticipantStore,
  (participantStore: fromReducers.participant.State) => participantStore.loading
);

export const getParticipantError = createSelector(
  getParticipantStore,
  (participantStore: fromReducers.participant.State) => participantStore.error
);

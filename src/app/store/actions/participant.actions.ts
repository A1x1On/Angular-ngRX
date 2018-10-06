import { Action      } from '@ngrx/store';
import { Participant } from '@appModels/participant';

export enum ParticipantActionTypes {
  participantGetParticipants          = '[Participant] get Participants',
  participantGetParticipantsSuccess   = '[Participant] get Participants success',
  participantUpdateParticipant        = '[Participant] update participant',
  participantUpdateParticipantSuccess = '[Participant] update participant success',
  participantDeleteParticipant        = '[Participant] delete participant',
  participantDeleteParticipantSuccess = '[Participant] delete participant success',
  participantAddParticipant           = '[Participant] add participant',
  participantAddParticipantSuccess    = '[Participant] add participant success',
  participantErrorParticipant         = '[Participant] error',
}

// GET
export class GetParticipants implements Action {
  readonly type = ParticipantActionTypes.participantGetParticipants;
}
export class GetParticipantsSuccess implements Action {
  readonly type = ParticipantActionTypes.participantGetParticipantsSuccess;
  constructor(public payload: Participant[]) {}
}

// UPDATE
export class UpdateParticipant implements Action {
  readonly type = ParticipantActionTypes.participantUpdateParticipant;
  constructor(public payload: any) {}
}
export class UpdateParticipantSuccess implements Action {
  readonly type = ParticipantActionTypes.participantUpdateParticipantSuccess;
  constructor(public payload: Participant) {}
}

// DELETE
export class DeleteParticipant implements Action {
  readonly type = ParticipantActionTypes.participantDeleteParticipant;
  constructor(public payload: any) {}
}
export class DeleteParticipantSuccess implements Action {
  readonly type = ParticipantActionTypes.participantDeleteParticipantSuccess;
  constructor(public payload: Participant) {}
}

// INSERT
export class AddParticipant implements Action {
  readonly type = ParticipantActionTypes.participantAddParticipant;
  constructor(public payload: Participant) {}
}
export class AddParticipantSuccess implements Action {
  readonly type = ParticipantActionTypes.participantAddParticipantSuccess;
  constructor(public payload: Participant) {}
}

// ERROR
export class ErrorParticipant implements Action {
  readonly type = ParticipantActionTypes.participantErrorParticipant;
  constructor(public payload: any) {}
}

export type ParticipantActions =
  | GetParticipants
  | GetParticipantsSuccess
  | UpdateParticipant
  | UpdateParticipantSuccess
  | DeleteParticipant
  | DeleteParticipantSuccess
  | AddParticipant
  | AddParticipantSuccess
  | ErrorParticipant;

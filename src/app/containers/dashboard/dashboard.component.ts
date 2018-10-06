import { Component, Input, Output, OnInit, EventEmitter      } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate                       } from '@angular/animations';
import { Store, select          } from '@ngrx/store';
import * as fromSelectors         from '@appStore/selectors';
import * as fromReducers          from '@appStore/reducers';
import { Observable             } from 'rxjs/Observable';
import { Subscription           } from 'rxjs/Subscription';
import { StompService           } from '@stomp/ng2-stompjs';
import 'rxjs/add/operator/map';

import { Participant            } from '@appModels/participant';

import { GetParticipants,
         UpdateParticipant,
         DeleteParticipant,
         AddParticipant         } from '@appStore/actions/participant.actions';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls   : ['./dashboard.component.css'],
  animations: [
    trigger('taskState', [
      state('true', style({backgroundColor: '#00FF7F'})),
      state('false',   style({backgroundColor: 'white'})),
      transition('false <=> true', animate('1s')),
      transition('true <=> false', animate('1s'))
    ])
  ]
})

export class DashboardComponent implements OnInit {


  private subscription  : Subscription;
  public messages       : Observable<any>;
  public state          : Observable<any>;
  public participants$  : Observable<Participant[]>;
  displayedColumns      : string[] = ['id', 'identifier', 'ready'];

  constructor(private store        : Store<fromReducers.participant.State>,
              private stompService : StompService) {}

  ngOnInit() {
    this.store.dispatch(new GetParticipants());
    this.participants$  = this.store.select(fromSelectors.getParticipants);

    this.messages       = this.stompService.subscribe('/topic/messages');
    this.subscription   = this.messages.subscribe(this.on_next);
  }

  public on_next = (message: any) => {
    let msg = JSON.parse(message.body);

    if(msg.messageType == 'PARTICIPANT_READY_STATUS_CHANGED'){
      this.store.dispatch(new UpdateParticipant({id: msg.participantId, ready: msg.newReadyStatus}));
    }else if(msg.messageType == 'PARTICIPANT_REMOVED'){
      this.store.dispatch(new DeleteParticipant({id: msg.participantId}));
    }else if(msg.messageType == 'PARTICIPANT_ADDED'){
      this.store.dispatch(new AddParticipant(msg.participant));
    }
  }
}

import { NgModule                    } from '@angular/core';
import { BrowserModule               } from '@angular/platform-browser';
import { FormsModule                 } from '@angular/forms';
import { HttpClientModule            } from '@angular/common/http';
import { BrowserAnimationsModule     } from '@angular/platform-browser/animations';
import { MatTableModule              } from '@angular/material';
import { FlexLayoutModule            } from "@angular/flex-layout";

import { StompConfig, StompService   } from '@stomp/ng2-stompjs';

// REDUX
import { StoreModule                 } from '@ngrx/store';
import { EffectsModule               } from '@ngrx/effects';
import { StoreRouterConnectingModule,
         RouterStateSerializer
                                     } from '@ngrx/router-store';
import { StoreDevtoolsModule         } from '@ngrx/store-devtools';
import * as fromStore                  from '@appStore/index';
import { CustomRouterStateSerializer } from '@appStore/router';

import { environment                 } from 'environments/environment';
import { AppRoutingModule            } from './app-routing.module';

import { AppComponent                } from './app.component';
import { DashboardComponent          } from '@appContainers/dashboard/dashboard.component';
import { ParticipantService          } from '@appServices/participant.service';

const stompConfig: StompConfig = {
  url: 'ws://89.223.27.70/ws',
  headers         : {
    login    : '',
    passcode : ''
  },
  heartbeat_in    : 0,
  heartbeat_out   : 20000,
  reconnect_delay : 5000,
  debug           : false
};

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromStore.reducers),
    EffectsModule.forRoot(fromStore.effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 50 })
      : []
  ],
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  providers: [
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    },
    ParticipantService,
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

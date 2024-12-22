import { createReducer, on } from '@ngrx/store';
import * as InstrumentActions from './instruments.actions';

export interface InstrumentsState {
  instruments: any[];
  loading: boolean;
  error: any;
}

export const initialState: InstrumentsState = {
  instruments: [],
  loading: false,
  error: null,
};

export const instrumentsReducer = createReducer(
  initialState,
  on(InstrumentActions.loadInstruments, (state) => ({ ...state, loading: true })),
  on(InstrumentActions.loadInstrumentsSuccess, (state, { instruments }) => ({
    ...state,
    instruments,
    loading: false,
    error: null,
  })),
  on(InstrumentActions.loadInstrumentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

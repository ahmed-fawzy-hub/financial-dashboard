import { createAction, props } from '@ngrx/store';

export const loadInstruments = createAction('[Instrument List] Load Instruments');
export const loadInstrumentsSuccess = createAction(
  '[Instrument List] Load Instruments Success',
  props<{ instruments: any[] }>()
);
export const loadInstrumentsFailure = createAction(
  '[Instrument List] Load Instruments Failure',
  props<{ error: any }>()
);

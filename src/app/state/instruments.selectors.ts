import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InstrumentsState } from './instruments.reducer';

export const selectInstrumentsState = createFeatureSelector<InstrumentsState>('instruments');

export const selectInstruments = createSelector(
  selectInstrumentsState,
  (state) => state.instruments
);

export const selectLoading = createSelector(
  selectInstrumentsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectInstrumentsState,
  (state) => state.error
);

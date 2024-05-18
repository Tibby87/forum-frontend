import { createFeatureSelector } from '@ngrx/store';
import { RolesState } from './roles.reducer';

export const getRolesState = createFeatureSelector<RolesState>('roles');

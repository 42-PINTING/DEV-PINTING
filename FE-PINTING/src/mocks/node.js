import { setupServer } from 'msw/node';
import { successSignout } from './global/signInbutton.ts';

export const server = setupServer(...successSignout);

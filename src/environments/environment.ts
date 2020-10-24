// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// @ts-ignore
import { keys } from '../../.config.json';

export const environment = {
  production: false,
  apiKey: keys.dev
};

import { Vehicle } from './vehicle';
import { Co2 } from './co2';
import { Route } from './route';
import { FavoriteRoute } from './route-favorite';

export interface Storage {
  version: number;
  username: string;
  setupCompleted: boolean;
  co2: Co2;
  vehicles: { [id: string]: Vehicle };
  routes: { [id: string]: Route };
  favoriteRoutes: { [id: string]: FavoriteRoute};
}

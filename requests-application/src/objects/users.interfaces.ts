import { Request } from './objects.interfaces';

export interface User {
  id: number;
  requests?: Request[];
}

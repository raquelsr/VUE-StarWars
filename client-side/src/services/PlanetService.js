import { HttpService } from './HttpService';

export class PlanetService {
  static ENDPOINT = 'planets';

  static getById(id) {
    // TODO
    return HttpService.get(PlanetService.ENDPOINT, id);
  }
}

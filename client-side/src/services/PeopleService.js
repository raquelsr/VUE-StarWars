import { HttpService } from './HttpService';

export class PeopleService {
  static ENDPOINT = 'people';

  static get(page, service) {
    return HttpService.get(PeopleService.ENDPOINT, page, service);
  }
}

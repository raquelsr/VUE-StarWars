import { HttpService } from './HttpService.js';

export class PeopleService {
  static ENDPOINT = 'people';

  static getAllWithPagination(page, search) {
    return HttpService.getAllWithPagination(
      PeopleService.ENDPOINT,
      page,
      search
    );
  }
}

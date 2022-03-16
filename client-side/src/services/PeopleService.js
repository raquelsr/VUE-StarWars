import { HttpService } from './HttpService';

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

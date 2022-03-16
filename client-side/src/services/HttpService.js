export class HttpService {
  static #URL = 'https://swapi.dev/api/';

  static getAllWithPagination(endpoint, page = 1, search) {
    let url = `${HttpService.#URL}/${endpoint}/?page=${page}`;
    if (search && search != '') url += `&search=${search}`;
    return fetch(url);
  }

  static get(endpoint, id) {
    return fetch(`${HttpService.#URL}/${endpoint}/${id}`);
  }

  static async executeRequest(request, ...params) {
    try {
      const response = await request(...params);
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Request has failed.');
      }
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}

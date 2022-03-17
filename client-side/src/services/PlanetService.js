import { HttpService } from './HttpService.js';

export class PlanetService {
  static ENDPOINT = 'people';

  static async getPlanetByUrl(url) {
    let planet = HttpService.cache.planetList.find(
      (planet) => planet.url === url
    );
    if (!planet) {
      try {
        planet = await HttpService.executeRequest(HttpService.fetch, url);
        HttpService.cache.planetList.push(planet);
      } catch (e) {
        console.error(e);
      }
    }
    return planet;
  }
}

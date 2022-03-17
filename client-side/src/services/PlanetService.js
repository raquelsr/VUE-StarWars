import { HttpService } from './HttpService.js';

export class PlanetService {
  static ENDPOINT = 'planets';

  static async getPlanetByUrl(url) {
    let planet = HttpService.cache.planetList.find(
      (planet) => planet.url === url
    );
    if (!planet) {
      try {
        planet = await HttpService.executeRequest(HttpService.getByUrl, url);
        HttpService.cache.planetList.push(planet);
      } catch (e) {
        console.error(e);
      }
    }
    return planet;
  }
}

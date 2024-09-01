export abstract class StorageService {
  constructor() { }

  static sessionSet(key: string, value: any): void {
    if(typeof value === 'object') value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
  }

  static sessionGet(key: string): any {
    let ret = sessionStorage.getItem(key) as any;
    try {
      ret = JSON.parse(ret);
    }
    catch(e) {
      console.debug('Its not an object and that\'s okay');
    }
    return ret;
  }
}
interface CacheValue {
  value: any;
  date: Date;
}

const CACHE_DURATION = 100 * 60 * 60;

const isValidDate = (key: string, cacheValueDate: Date) => {
  const currentDate = new Date();
  return +currentDate - +cacheValueDate <= CACHE_DURATION;
};

class CacheService {
  private cache: Map<string, CacheValue>;

  constructor() {
    this.cache = new Map();
  }

  set(key: string, value: any) {
    const cacheData: CacheValue = {
      value,
      date: new Date()
    };
    this.cache.set(key, cacheData);
  }

  get(key: string) {
    const cacheValue = this.cache.get(key);
    if (!cacheValue) return undefined;
    if (!isValidDate(key, cacheValue.date)) {
      this.cache.delete(key);
      return undefined;
    }
    return cacheValue.value;
  }
}

const cacheService = new CacheService();

export default cacheService;

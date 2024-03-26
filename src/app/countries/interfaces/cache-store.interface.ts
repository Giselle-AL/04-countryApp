import { Country } from "./country";
import { Region } from './region.type';

export interface CacheStore{
  byCap: TermCountries;
  byCount:TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries
{
  term: string;
  countries: Country[];
}

export interface RegionCountries
{
  region:    Region;
  countries: Country[];
}

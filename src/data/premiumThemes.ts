import { ColorTheme } from '../types/color';
import { musicAndArtsThemes } from './categories/musicAndArts';
import { cinemaAndTVThemes } from './categories/cinemaAndTV';
import { sportsAndActivitiesThemes } from './categories/sportsAndActivities';
import { foodAndBeveragesThemes } from './categories/foodAndBeverages';
import { festivitiesThemes } from './categories/festivities';

// Import existing themes
import { emotionsAndSentimentsThemes } from './categories/emotionsAndSentiments';
import { placesAndCulturesThemes } from './categories/placesAndCultures';

export const premiumThemes: ColorTheme[] = [
  emotionsAndSentimentsThemes,
  placesAndCulturesThemes,
  musicAndArtsThemes,
  cinemaAndTVThemes,
  sportsAndActivitiesThemes,
  foodAndBeveragesThemes,
  festivitiesThemes
];
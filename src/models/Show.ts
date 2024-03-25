import { AgeRating } from "./AgeRating";
import { Genre } from "./Genre";
import { Language } from "./Language";
import { ShowType } from "./ShowType";

export type Show = {
  id: number;
  title: string;
  description: string;
  type: ShowType;
  image: string;
  rating: AgeRating;
  genre: Genre;
  year: number;
  language: Language;
  seasons: number;
};

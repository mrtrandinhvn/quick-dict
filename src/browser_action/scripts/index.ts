import { buildUrl } from "./api-url-builder";
import { DictionaryType } from "./constants";

console.log(buildUrl("affect", DictionaryType.Oxford_autocomplete_English));

console.log(buildUrl("affect", DictionaryType.Oxford_autocomplete_AmericanEnglish));

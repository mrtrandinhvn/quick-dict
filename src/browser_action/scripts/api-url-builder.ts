import { DictionaryType } from "./constants";

/**
 *
 * @param text search text
 * @param type Dictionary type
 */
export function buildUrl(text: string, type: DictionaryType) {
    switch (type) {
        default:
            return `https://www.oxfordlearnersdictionaries.com/autocomplete/${type}/?q=${encodeURI(text)}&contentType=application%2Fjson%3B%20charset%3Dutf-8`;
    }
}

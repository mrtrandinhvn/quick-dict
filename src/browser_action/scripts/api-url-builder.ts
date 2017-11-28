import { DictionaryType } from "./constants";

/**
 *
 * @param text search text
 * @param type Dictionary type
 */
export function buildUrl(text: string, type: DictionaryType) {
    switch (type) {
        case DictionaryType.Oxford_English:
            return `https://www.oxfordlearnersdictionaries.com/definition/english/${encodeURI(text)}`;

        case DictionaryType.hellochao_tudien:
            return `https://www.hellochao.vn/tu-dien-tach-ghep-am/?act=search&type=word&sct=${encodeURI(text)}`;

        default:
            return `https://www.oxfordlearnersdictionaries.com/autocomplete/${type}/?q=${encodeURI(text)}&contentType=application%2Fjson%3B%20charset%3Dutf-8`;
    }
}

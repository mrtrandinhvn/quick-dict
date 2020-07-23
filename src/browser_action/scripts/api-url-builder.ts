import { DictionaryType } from "./constants";

/**
 *
 * @param text search text
 * @param type Dictionary type
 */
export function buildUrl(text: string, type: DictionaryType) {
    const params = encodeURI(text);
    switch (type) {
        case DictionaryType.Oxford_English:
            return `https://www.oxfordlearnersdictionaries.com/definition/english/${params}`;

        case DictionaryType.Hellochao_tudien:
            return `https://www.hellochao.vn/tu-dien-tach-ghep-am/?act=search&type=word&sct=${params}`;

        case DictionaryType.GoogleTranslate:
            return `https://translate.google.com/#auto/vi/${params}`;

        case DictionaryType.TraTuNhatViet:
            return `https://jdict.net/search?keyword=${params}&type=word`;

        default: // Oxford Learner's dictionaries autocomplete api
            return `https://www.oxfordlearnersdictionaries.com/autocomplete/${type}/?q=${params}&contentType=application%2Fjson%3B%20charset%3Dutf-8`;
    }
}

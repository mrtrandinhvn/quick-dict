import { buildUrl } from "../api-url-builder";
import { DictionaryType } from "../constants";

describe("Test api-url-builder", () => {
    it("case-1", () => {
        const actualResult = buildUrl("hmm", DictionaryType.Oxford_autocomplete_English);
        const expectation = "https://www.oxfordlearnersdictionaries.com/autocomplete/english/?q=hmm&contentType=application%2Fjson%3B%20charset%3Dutf-8";
        expect(actualResult).toBe(expectation);
    });

    it("case 2", () => {
        const actualResult = buildUrl("effect", DictionaryType.Oxford_autocomplete_AmericanEnglish);
        const expectation = "https://www.oxfordlearnersdictionaries.com/autocomplete/american_english/?q=effect&contentType=application%2Fjson%3B%20charset%3Dutf-8";
        expect(actualResult).toBe(expectation);
    });

    it("case-3: encodeUri", () => {
        const actualResult = buildUrl("hello world", DictionaryType.Oxford_autocomplete_AmericanEnglish);
        const expectation = "https://www.oxfordlearnersdictionaries.com/autocomplete/american_english/?q=hello%20world&contentType=application%2Fjson%3B%20charset%3Dutf-8";
        expect(actualResult).toBe(expectation);
    });

    it("case-4: hellochao", () => {
        const actualResult = buildUrl("go home", DictionaryType.Hellochao_tudien);
        const expectation = "https://www.hellochao.vn/tu-dien-tach-ghep-am/?act=search&type=word&sct=go%20home";
        expect(actualResult).toBe(expectation);
    });

    it("case-5: Oxford GET url", () => {
        const actualResult = buildUrl("this", DictionaryType.Oxford_English);
        const expectation = "https://www.oxfordlearnersdictionaries.com/definition/english/this";
        expect(actualResult).toBe(expectation);
    });

    it("case-6: google translate", () => {
        const actualResult = buildUrl("this is", DictionaryType.GoogleTranslate);
        const expectation = "https://translate.google.com/#auto/vi/this%20is";
        expect(actualResult).toBe(expectation);
    });

    it("case-7: Japanese", () => {
        const input = "忘れる";
        const actualResult = buildUrl(input, DictionaryType.TraTuNhatViet);
        const expectation = `https://jdict.net/search?keyword=${encodeURI(input)}&type=word`;;
        expect(actualResult).toBe(expectation);
    });
});

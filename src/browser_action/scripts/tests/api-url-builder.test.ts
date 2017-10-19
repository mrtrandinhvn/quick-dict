import { buildUrl } from "../api-url-builder";
import { DictionaryType } from "../constants";

describe("Test build api-url-builder", () => {
    it("case-1: DictionaryType.English", () => {
        const actualResult = buildUrl("hmm", DictionaryType.English);
        const expectation = "https://www.oxfordlearnersdictionaries.com/autocomplete/english/?q=hmm&contentType=application%2Fjson%3B%20charset%3Dutf-8";
        expect(actualResult).toBe(expectation);
    });

    it("case-2: DictionaryType.AmericanEnglish", () => {
        const actualResult = buildUrl("effect", DictionaryType.AmericanEnglish);
        const expectation = "https://www.oxfordlearnersdictionaries.com/autocomplete/american_english/?q=effect&contentType=application%2Fjson%3B%20charset%3Dutf-8";
        expect(actualResult).toBe(expectation);
    });

    it("case-3: encodeUri", () => {
        const actualResult = buildUrl("hello world", DictionaryType.AmericanEnglish);
        const expectation = "https://www.oxfordlearnersdictionaries.com/autocomplete/american_english/?q=hello%20world&contentType=application%2Fjson%3B%20charset%3Dutf-8";
        expect(actualResult).toBe(expectation);
    });
});

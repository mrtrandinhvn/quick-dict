import * as deepFreeze from "deep-freeze";
import { buildUrl } from "../../browser_action/scripts/api-url-builder";
import { DictionaryType } from "../../browser_action/scripts/constants";
let state = {
    tooltip: {
        active: false,
    },
    mouse: {
        dragging: false,
        clientX: 0,
        clientY: 0,
    },
};
if (process.env.NODE_ENV !== "production") {
    deepFreeze(state);
}

const tooltip: HTMLDivElement = document.createElement("div");
const tooltipItems: HTMLAnchorElement[] = [];
tooltipItems.push(tooltip.appendChild(buildTooltipItem(DictionaryType.Oxford_English)));
tooltipItems.push(tooltip.appendChild(buildTooltipItem(DictionaryType.Hellochao_tudien)));
tooltipItems.push(tooltip.appendChild(buildTooltipItem(DictionaryType.GoogleTranslate)));
tooltipItems.push(tooltip.appendChild(buildTooltipItem(DictionaryType.TraTuNhatViet)));
tooltip.id = "dinh-tooltip";
document.body.appendChild(tooltip); // append a hidden element to the dom

//#region document events
/**
 * Start dragging
 */
document.addEventListener("mousedown", (event) => {
    state = {
        ...state,
        mouse: {
            ...state.mouse,
            dragging: true,
            clientX: event.clientX,
            clientY: event.clientY,
        },
    };
});

/**
 * Update the mouse position if user is dragging/selecting
 */
document.addEventListener("mousemove", (event) => {
    if (!state.mouse.dragging) { return; }

    state = {
        ...state,
        mouse: {
            ...state.mouse,
            clientX: event.clientX,
            clientY: event.clientY,
        },
    };
});

/**
 * Stop dragging
 */
document.addEventListener("mouseup", (event) => {
    state.mouse = {
        ...state.mouse,
        dragging: false,
    };
});

document.addEventListener("selectionchange", (event) => {
    const selection = getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText) {
        showTooltip(event, selectedText);
    } else {
        hideTooltip();
    }
});
//#endregion

//#region tooltip actions
const tooltipWidth = 124;
const scrollbarWidth = 17;
function showTooltip(event: Event, selectedText: string) {
    state = {
        ...state,
        tooltip: {
            active: true,
        },
    };
    tooltip.style.display = "flex";
    tooltip.style.top = (state.mouse.clientY < 80 ? 0 : state.mouse.clientY - 80) + "px";

    const maxLeft = window.innerWidth - tooltipWidth - scrollbarWidth;
    const left = (state.mouse.clientX > maxLeft ? maxLeft : state.mouse.clientX + 10) + "px";
    tooltip.style.left = left;

    for (const item of tooltipItems) {
        const type = item.attributes.getNamedItem("data-type").value;
        item.href = buildUrl(selectedText, type as DictionaryType);
    }
}

function hideTooltip() {
    tooltip.style.display = "none";
    state = {
        ...state,
        tooltip: {
            active: false,
        },
    };
}

function buildTooltipItem(type: DictionaryType) {
    const dictItem = document.createElement("a");
    dictItem.target = "_blank";
    dictItem.className = "site-icon";
    dictItem.rel = "noopenner";
    const attribute = document.createAttribute("data-type");
    attribute.value = type;
    dictItem.attributes.setNamedItem(attribute);
    switch (type) {
        case DictionaryType.Oxford_English:
            dictItem.title = "Oxford Learner's Dictionary";
            dictItem.style.backgroundImage = `url(${chrome.extension.getURL("/resources/images/oxford.png")})`;
            dictItem.id += `dinh-tooltip__oxford`;
            break;

        case DictionaryType.Hellochao_tudien:
            dictItem.title = "HelloChao";
            dictItem.style.backgroundImage = `url(${chrome.extension.getURL("/resources/images/hellochao.png")})`;
            dictItem.id += `dinh-tooltip__hellochao`;
            break;

        case DictionaryType.GoogleTranslate:
            dictItem.title = "Google Translate";
            dictItem.style.backgroundImage = `url(${chrome.extension.getURL("/resources/images/googletranslate.png")})`;
            dictItem.id += `dinh-tooltip__googletranslate`;
            break;

        case DictionaryType.TraTuNhatViet:
            dictItem.title = "Tra từ Nhật Việt";
            dictItem.style.backgroundImage = `url(${chrome.extension.getURL("/resources/images/tratunhatviet.svg")})`;
            dictItem.id += `dinh-tooltip__nhatviet`;
            break;
    }
    return dictItem;
}
//#endregion
if (process.env.NODE_ENV !== "production") {
    // tslint:disable-next-line:no-console
    console.log("ready");
}

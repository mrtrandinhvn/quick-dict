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

const tooltip = document.createElement("div");
tooltip.innerHTML = `
    <a id="dinh-tooltip__oxford"
        rel="noopenner"
        class="site-icon"
        target="_blank"
        title="Oxford Learner's Dictionary"
        style="background-image:url(${chrome.extension.getURL("/resources/images/oxford.png")})">
    </a>
    <a id="dinh-tooltip__hellochao"
        rel="noopenner"
        class="site-icon"
        target="_blank"
        title="hellochao"
        style="background-image:url(${chrome.extension.getURL("/resources/images/hellochao.png")})">
    </a>
    <a id="dinh-tooltip__googletranslate"
        rel="noopenner"
        class="site-icon"
        target="_blank"
        title="Google Translate"
        style="background-image:url(${chrome.extension.getURL("/resources/images/googletranslate.png")})">
    </a>
`;
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
    const left = (state.mouse.clientX > maxLeft ? maxLeft : state.mouse.clientX) + "px";
    tooltip.style.left = left;
    (document.getElementById("dinh-tooltip__oxford") as HTMLAnchorElement).href = buildUrl(selectedText, DictionaryType.Oxford_English);
    (document.getElementById("dinh-tooltip__hellochao") as HTMLAnchorElement).href = buildUrl(selectedText, DictionaryType.Hellochao_tudien);
    (document.getElementById("dinh-tooltip__googletranslate") as HTMLAnchorElement).href = buildUrl(selectedText, DictionaryType.GoogleTranslate);
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
//#endregion
if (process.env.NODE_ENV !== "production") {
    console.log("ready");
}

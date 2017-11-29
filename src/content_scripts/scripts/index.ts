import { buildUrl } from "../../browser_action/scripts/api-url-builder";
import { DictionaryType } from "../../browser_action/scripts/constants";

const state = {
    mouse: {
        dragging: false,
        clientX: 0,
        clientY: 0,
    },
};

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

/**
 * Start dragging
 */
document.addEventListener("mousedown", (event) => {
    state.mouse = {
        ...state.mouse,
        dragging: true,
        clientX: event.clientX,
        clientY: event.clientY,
    };
});

/**
 * Update the mouse position if user is dragging/selecting
 */
document.addEventListener("mousemove", (event) => {
    if (!state.mouse.dragging) { return; }

    state.mouse = {
        ...state.mouse,
        clientX: event.clientX,
        clientY: event.clientY,
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

function showTooltip(event: Event, selectedText: string) {
    tooltip.style.display = "flex";
    tooltip.style.top = (state.mouse.clientY < 25 ? 0 : state.mouse.clientY - 25) + "px";
    tooltip.style.left = state.mouse.clientX + 100 + "px";
    (document.getElementById("dinh-tooltip__oxford") as HTMLAnchorElement).href = buildUrl(selectedText, DictionaryType.Oxford_English);
    (document.getElementById("dinh-tooltip__hellochao") as HTMLAnchorElement).href = buildUrl(selectedText, DictionaryType.Hellochao_tudien);
    (document.getElementById("dinh-tooltip__googletranslate") as HTMLAnchorElement).href = buildUrl(selectedText, DictionaryType.GoogleTranslate);
}

function hideTooltip() {
    tooltip.style.display = "none";
}

console.log("ready");

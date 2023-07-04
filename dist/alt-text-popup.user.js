// ==UserScript==
// @name        Mastodon Alt Text Popup
// @namespace   Violentmonkey Scripts
// @match       https://strangeobject.space/*
// @grant       none
// @version     1.0
// @author      Rayquaza01
// @description Shows alt text for an image with alt+click
// ==/UserScript==
function addAltEvent() {
    const images = [...document.querySelectorAll("img.letterbox:not([data-alt-processed])")];
    images.forEach(item => {
        // avoid duplicate processing
        item.dataset.altProcessed = "1";
        // if item has alt text, add event
        if (item.getAttribute("alt") !== null) {
            item.addEventListener("click", (e) => {
                // only show alert if user held down the alt key
                if (e.altKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    alert(item.getAttribute("alt"));
                }
            });
        }
    });
}
/**
 * Mutation observer callback, runs every time the feed updates
 */
function feedChangeObserver() {
    // console.log("Change in main feed!");
    addAltEvent();
}
/**
 * Mutation observer callback. Runs every time the page updates, until feed is ready.
 * Then, it switches to a mutation observer that only checks feed updates
 */
function waitForFeedObserver() {
    // console.log("Change in page body");
    // main element for feed
    const body = document.querySelector(".columns-area__panels__main");
    // if feed element is found
    if (body !== null) {
        // disconnect this mutation observer
        observer.disconnect();
        // create new mutation observer for feed
        const mainObserver = new MutationObserver(feedChangeObserver);
        mainObserver.observe(body, { childList: true, subtree: true });
    }
}
const observer = new MutationObserver(waitForFeedObserver);
observer.observe(document.body, { childList: true, subtree: true });

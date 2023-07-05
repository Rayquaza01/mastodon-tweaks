// ==UserScript==
// @name        Template Script
// @namespace   Violentmonkey Scripts
// @match       https://strangeobject.space/*
// @grant       none
// @version     1.0
// @author      -
// @description -
// ==/UserScript==

/**
 * Mutation observer callback, runs every time the feed updates
 */
function feedChangeObserver(): void {
  // console.log("Change in main feed!");
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

export {};

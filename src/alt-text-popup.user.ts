// ==UserScript==
// @name        Mastodon Alt Text Popup
// @namespace   Violentmonkey Scripts
// @match       https://strangeobject.space/*
// @grant       none
// @version     1.1
// @author      Rayquaza01
// @description Shows alt text for an image with alt+click
// ==/UserScript==

/**
 * Queries all images on the current page and, if it has alt text, adds an event listener to display a popup
 */
function addAltEvent() {
  // get all media galleries on page
  const galleries = [...document.querySelectorAll(".media-gallery:not([data-alt-processed])")] as HTMLDivElement[];
  galleries.forEach(gallery => {
    // avoid duplicate processing
    gallery.dataset.altProcessed = "1";

    // grab all images and videos inside of the gallery
    const images = [...gallery.querySelectorAll("img, video")] as (HTMLImageElement | HTMLVideoElement)[];

    images.forEach(item => {
      item.addEventListener("click", (e: MouseEvent) => {
        // only show alert if user held down the alt key
        if (e.altKey) {
          e.preventDefault();
          e.stopPropagation();
          // prefer alt text, fall back to title text if not present
          alert(item.getAttribute("alt") ?? item.getAttribute("title") ?? "No alt text provided.");
        }
      });
    })
  });
}

/**
 * Mutation observer callback, runs every time the feed updates
 */
function feedChangeObserver(): void {
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

export { };

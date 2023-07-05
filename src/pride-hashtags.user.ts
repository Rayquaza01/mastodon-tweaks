// ==UserScript==
// @name        Mastodon Pride Colored Hashtags
// @namespace   Violentmonkey Scripts
// @match       https://strangeobject.space/*
// @version     1.0
// @author      Rayquaza01
// @description Makes LGBTQ+ related hashtags be colored as their pride flag
// @grant       none
// ==/UserScript==

/** Linear gradients corresponding to pride flag colors. There should be one per supported flag */
const gradients = {
    trans: "linear-gradient(to right, #5BCFFA, #F5ABB9, #FFFFFF, #F5ABB9, #5BCFFA)",
    enby: "linear-gradient(to right, #FFF42F, #FFFFFF, #9C59D1, #000000)",
    bi: "linear-gradient(to right, #D70071, #9C4E97, #0035AA)",
    pan: "linear-gradient(to right, #FF1B8D, #FFD900, #1BB3FF)",
    ace: "linear-gradient(to right, #000000, #A5A5A5, #FFFFFF, #810081)",
    aro: "linear-gradient(to right, #3AA740, #A8D47A, #FFFFFF, #ABABAB, #000000)",
    aroace: "linear-gradient(to right, #E38D00, #EDCE00, #FFFFFF, #62B0DD, #1A3555)",
    lesbian: "linear-gradient(to right, #D62900, #F07722, #FF9B55, white, #D262A6, #B75591, #A50062)",
    gay: "linear-gradient(to right, #018E71, #21CFAC, #9AE9C3, #FFFFFF, #7CAFE4, #4F47CC, #3C1379)",
    lgbt: "linear-gradient(to right, #000000, #794E10, #E60000, #FF8E00, #FFEE00, #028121, #004CFF, #770088)"
}

/**
 * Map for connecting tags to gradients.
 * The key is the hashtag, and the value is the gradient from the gradient table that you want that tag to have
 */
const PrideFlagTagsToGradients = {
    "transgender": gradients["trans"],
    "trans": gradients["trans"],
    "nonbinary": gradients["enby"],
    "enby": gradients["enby"],
    "bisexual": gradients["bi"],
    "bi": gradients["bi"],
    "pansexual": gradients["pan"],
    "pan": gradients["pan"],
    "asexual": gradients["ace"],
    "ace": gradients["ace"],
    "aromantic": gradients["aro"],
    "aro": gradients["aro"],
    "aroace": gradients["aroace"],
    "lesbian": gradients["lesbian"],
    "gay": gradients["gay"],
    "lgbt": gradients["lgbt"],
    "lgbtq": gradients["lgbt"],
    "lgbtqia": gradients["lgbt"]
};

/** List of all supported tags. Same as keys from Tag to Gradient table */
const PrideFlagTags = Object.keys(PrideFlagTagsToGradients)

/**
 * Query all tags on the current page and sets the color if matches
 */
function applyTagColors() {
  const hashtags = [...document.querySelectorAll(".hashtag:not([data-hashtag-pride-colors])")] as HTMLElement[];
  //console.log("Found hashtags", hashtags)

  hashtags.forEach((item) => {
    const tag = item.innerText.substring(1).toLowerCase()
    if (PrideFlagTags.includes(tag)) {
      item.style.background = PrideFlagTagsToGradients[tag];
      item.style.backgroundClip = "text";
      item.style.color = "transparent";
    }

    // prevent item from being processed twice
    item.dataset.hashtagPrideColors = "1";
  });
}

/**
 * Mutation observer callback, runs every time the feed updates
 */
function feedChangeObserver(): void {
  // console.log("Change in main feed!");

  applyTagColors();
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

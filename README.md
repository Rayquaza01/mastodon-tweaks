# Mastodon Tweaks

A collection of user scripts to tweak the behavior of Mastodon. These require a userscript extension, such as ViolentMonkey, TamperMonkey, or GreaseMonkey to work.

## Changing Instance

These scripts all use strangeobject.space, the instance I'm on, in the match tag by default. If you are on a different instance, you will need to replace that with your instance. For example, if you were on mastodon.social, you would need to add `@match https://mastodon.social/*` to the metadata block.

# Alt Text Popup

[Source](https://github.com/Rayquaza01/mastodon-tweaks/blob/main/src/alt-text-popup.user.ts) | [Install](https://github.com/Rayquaza01/mastodon-tweaks/raw/main/dist/alt-text-popup.user.js)

Displays an alert popup showing the alt text for an image when the user presses ALT+Click.

# Jelly Splat Phonics

A small phonics game for a child in Reception (ages 4–5, England). Splat the jelly
monster showing the right word or sound, build words from their letters, trace the
letters with a finger, and read stories and real book pages.

Everything runs on the phone. **No account, no sign-in, nothing is uploaded, and no
data ever leaves the device.** Progress is saved in the browser's own storage;
recordings and page photos are saved in the browser's local database.

---

## Putting it on a phone

1. Open the web address in **Chrome on Android** (or Safari on an iPhone).
2. Android: tap **Install on this phone** in Grown-ups → Settings, or use Chrome's
   menu (⋮) → **Add to Home screen**.
   iPhone: tap the Share button → **Add to Home Screen**.
3. It then opens full-screen from the home screen like any other app, and works
   with no signal.

---

## First five minutes

1. Tap and **hold** the **Grown-ups** button (half a second — the hold stops a
   four-year-old wandering into the settings).
2. Under **This week's book**, either type the words from this week's reading book,
   or tap **📷 Photograph the book** and snap the pages.
3. Go back and press **Play**.

At the end of a round you mark each word **Tricky / Nearly / Confident**. That sets
when the word comes back: tricky returns the same day, confident pushes out to
2 days, then 4, 8, 16. The home screen works through one small batch of six words at
a time; the next batch and the **Stretch round** unlock once the current six are solid.

---

## What's in it

- **Splat the jelly** — hear a word or sound, tap the monster showing it.
- **Build the word** — the letters come scrambled, tap them in order.
- **Write the letters** — trace with a finger, scored out of three stars.
- **Stories** — twelve built-in stories, pick a topic and it reads one.
- **Read the book** — your own photographed pages, every word tappable to hear.
- **Stickers** — a jelly monster for every finished round.
- **Progress** — what's confident, what needs another look, and a weekly line you
  can copy into the school reading record.

The built-in word lists follow the usual Reception order (Phase 2 across autumn,
Phase 3 vowel digraphs from spring) and include both tricky-word lists.

---

## Voices — the important bit

Each word plays a real human voice, in this order of preference:

1. **Your own recording** (best)
2. A free community recording, for 105 of the built-in words
3. Nothing but the animated mouth

**Recording your own is the single biggest improvement you can make**, especially for
the *sounds* sets. The free recordings are of whole words, so for a sound like `sh`
it can only play the word "shop" — never the pure sound. Grown-ups → pick a set →
**🎙 Record all …**, then turn **Hands-free** on: it shows a word, counts you in,
records two seconds and moves on by itself. A set of eight takes about a minute.

Say the pure sound: "sss", not "ess"; "t" without the "uh" on the end.

The robot/computer voice is **off** by default and best left off.

---

## Photographing a book

Grown-ups → **📷 Photograph the book** → select all the pages at once.

The phone reads the text itself using Tesseract.js. The first use downloads about
4MB of language data and needs signal; after that it works offline. **Always check
what it read before saving** — it is good with clear, large print and poor with
small or decorative text. The sentences it finds become that word's example
sentence, so the practice matches the actual book.

---

## Backing up

There is no cloud copy. Grown-ups → Settings → **⤓ Back up** saves a file to the
phone's downloads; **⤒ Restore** reads it back. Worth doing occasionally, and
before clearing the browser's data.

The backup holds words, progress, stories, stickers and stats. It does **not**
include voice recordings or page photos — those are larger and stay on the phone
they were made on.

---

## Credits

The free word recordings come from Wikimedia Commons — the **Lingua Libre** and
**Shtooka** projects — by speakers including *Back ache*, *Vealhurl* and the
*Association Shtooka (Judith Franck)*, used under **CC BY-SA 4.0**, **CC BY 3.0 US**,
**CC BY 4.0**, **CC0** and public domain. The full list is in the app under
Grown-ups → *Where the free voices come from*. Speakers vary, so a few accents differ
from a British classroom — another reason to record your own.

Typeface: **Andika** (SIL Open Font License), designed for beginner readers — note
the single-storey *a* and *g* that match school handwriting. Headings in **Baloo 2**.
Page reading by **Tesseract.js** (Apache 2.0).

The game itself is yours to keep, change and pass on.

---

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app — all the code, in one file |
| `voices.mp3` | The 105 free word recordings, in one audio file |
| `manifest.json` | Lets it install to the home screen |
| `sw.js` | Makes it work offline |
| `icon-192.png`, `icon-512.png` | The home-screen icon |

To change wording or add word lists, open `index.html` in any text editor — the word
lists are near the top, under `const BUILTIN`. If you change any file, bump the
version in `sw.js` (`jelly-splat-v1` → `v2`) so phones pick up the new copy.

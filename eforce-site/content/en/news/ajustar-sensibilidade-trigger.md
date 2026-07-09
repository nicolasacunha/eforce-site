---
slug: ajustar-sensibilidade-trigger
lang: en
type: post
title: "How to raise trigger sensitivity without crosstalk on an electronic drum kit"
description: "Crosstalk is when hitting one pad fires another pad's sound. Here is how to set the threshold and raise trigger sensitivity without false triggers."
publishedAt: "2026-07-09"
author: "Nicolas Cunha"
keywords:
  - trigger sensitivity
  - electronic drum crosstalk
  - adjust electronic drum triggers
  - drum module threshold
  - false triggering pad
sources:
  - "https://digitaldrummermag.com/2023/08/10/understanding-trigger-parameters/"
  - "https://www.sweetwater.com/sweetcare/articles/electronic-drum-terms-explained/"
  - "https://www.edruminfo.com/articles/2021/7/11/09-crosstalk-rejection"
faq:
  - q: "What causes crosstalk on an electronic drum kit?"
    a: "The cause is mechanical. Striking a pad sends vibration through the structure — rim, arm, rack — and it reaches a neighboring pad's sensor with enough energy to be read as a real hit. The closer the pads sit and the more rigid the connection between them, the easier that vibration travels."
  - q: "Does raising sensitivity always make crosstalk worse?"
    a: "Only if you raise the kit's global sensitivity. The same sensor you tuned to catch soft hits also starts hearing vibration from outside. Adjusting pad by pad, with each pad's threshold set correctly, lets you keep sensitivity high without opening the door to false triggers."
  - q: "What is the difference between threshold and sensitivity in the module?"
    a: "Sensitivity, sometimes called gain, sets how much force turns into how much volume, controlling the dynamic range. Threshold is the floor: the minimum force the module needs to register a hit at all. Any signal below the threshold is discarded before it becomes sound."
  - q: "Why does my pad fire two notes on a single hit?"
    a: "That is retrigger, not crosstalk. The sensor reads the rebound of the mesh or stick as a second strike. The mask time parameter fixes it by opening a short window right after the hit, during which the module ignores new signals from that same pad."
relatedProducts: [ef2-v1, ef2-v2]
draft: false
---

Most people setting up an electronic kit for the first time treat the module as if it shipped ready to play: switch on and go. The module leaves the factory with generic values, tuned for a stock pad and an average playing style, and that is where the two most annoying problems show up. The pad that ignores a soft hit, and the pad that fires on its own when you strike its neighbor. Both are stuck in the same settings — sensitivity and crosstalk move together, and touching one without understanding the other only pushes the problem somewhere else.

## What crosstalk is and why it shows up

Crosstalk is the false trigger that happens when hitting one pad fires another pad's sound. You strike the tom and the snare answers along with it, or you press the kick and one of the toms drops a phantom note. The cause is mechanical: the hit produces vibration that travels through the structure — rim, arm, rack — and reaches the neighboring pad's sensor with enough energy to be read as a real strike.

The closer the pads sit and the more rigid the link between them, the easier that vibration crosses over. That is why crosstalk gets worse when you push the kit's overall sensitivity: the same sensor you sharpened to catch a ghost note now hears the vibration arriving from outside. The problem is rarely in the pad that fires — it is in the path the vibration takes to reach it.

## Sensitivity and threshold: what each one controls

Before changing anything, separate two parameters that people often confuse. Sensitivity, sometimes labeled gain, sets how much force turns into how much volume — it governs the dynamic range, how different a soft hit sounds from a hard one. Threshold is the floor: the minimum force the module needs to register a hit. Any signal below the threshold gets discarded before it becomes sound.

That distinction is the heart of the whole adjustment. Crosstalk lives just above the threshold, because the vibration arriving from a neighboring pad is usually weak. Raising the threshold on the pad that fires by itself cuts that noise without forcing you to drop sensitivity and lose dynamics on the legitimate hit. Working in the right place saves the rest of the effort.

## How to raise sensitivity without firing the neighbor

The classic mistake is to attack everything through global sensitivity. You raise the whole kit's gain to feel the soft hits and, as a bonus, make every pad more prone to crosstalk. The route is the opposite: adjust pad by pad.

Start by finding the problem pair. Hit the source pad hard — usually the kick — and watch which pad fires along with it. The fix happens on the pad receiving the false trigger, not on the one you strike. On that pad, raise the threshold in small steps, tapping lightly between each step to confirm the real hit still registers. You want the lowest threshold value that already ignores the outside vibration; going too high kills the very ghost note you wanted to keep.

If your module has a dedicated crosstalk cancellation parameter (sometimes written xtalk), it does finer work. Instead of just ignoring weak signals, it compares the arrival timing of the signals and discards the one that appears right after a strong hit on a related pad. Raise that value on the pad that self-triggers, again in small steps — overdoing it makes the pad miss legitimate hits played together with its neighbor, like a fast fill landing at the same time as the kick.

## Retrigger and mask time: the double hit that looks like crosstalk

Not every false trigger is crosstalk. When a single hit turns into two sounds on the same pad, the problem is retrigger: the sensor reads the rebound of the mesh or stick as a second strike. Mask time fixes it by opening a short window right after the hit, during which the module ignores new signals from that same pad. On a mesh pad, which has a more elastic rebound, a well-set mask time cleans up the double hit without getting in the way of fast rolls.

The rule holds for both parameters: mask time and retrigger cancel set too tight will swallow doubles and rolls. Adjust while listening to a fast double stroke — if the second note disappears, you went too far and need to ease off.

## Response curve: shaping expression after the triggering is clean

With the threshold and crosstalk sorted out, the response curve is what translates your hand into dynamics. It sets the relationship between strike force and output volume. A linear curve returns proportional volume across the whole range; exponential or logarithmic curves concentrate expression in the soft hits or the hard ones. Players who lean on ghost notes gain from a curve that widens the difference at low volumes, [the kind of nuance the F10 module processes from the mesh pad signal](/en/technology).

## What physical mounting solves before the module

A large share of crosstalk gets solved outside the menu. The more isolated a pad is, the less vibration it takes in. Tightening the rack wing bolts firmly, using the rubber grommets on the mounts, and keeping two pads off the same rigid arm all cut the problem at the source — leaving less for the threshold to correct later.

The base matters too. A stable, well-bolted rack transmits less micro-vibration between pieces than a loose stand. That is why [the EF2 V1](/en/kits/ef2-v1) and [the EF2 V2](/en/kits/ef2-v2) ship with their mesh pads mounted on a dedicated rack: the response the sensor picks up already starts from a structure built to hold each piece in place, which gives you room to run sensitivity higher without inviting crosstalk.

## A quick routine for tuning from scratch

If you are calibrating a whole kit, following an order avoids redoing work:

- Tighten the physical mounting first — rack, mounts, rubber grommets.
- Set each pad's threshold with light taps, hunting for the lowest floor that still ignores outside vibration.
- Provoke crosstalk on purpose, with hard hits on the kick and toms, and raise crosstalk cancellation only on the pads that fire along.
- Play a fast double stroke on each pad and adjust mask time and retrigger until the double hit disappears without eating the second note.
- Last, pick the response curve that matches the weight of your hand.
- Save the preset, and redo the adjustment whenever you swap a mesh head or rebuild the kit.

High sensitivity and controlled crosstalk fit in the same kit, as long as you tune pad by pad instead of spinning the global gain. If the false triggering persists after all of this, [E-Force support](/en/support) can walk you through the F10 adjustment for your setup — trigger behavior shifts with the pad, the mounting, and the weight of each player's hand, and sometimes a mounting detail solves what the menu alone cannot.

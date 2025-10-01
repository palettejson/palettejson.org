---
id: gamut-mapping
title: Gamut Mapping and Out-of-Gamut Colors
sidebar_label: Gamut Mapping
sidebar_position: 3
description: How to handle colors that exceed the displayable range of a target color space
---

# Gamut Mapping and Out-of-Gamut Colors

PaletteJSON assumes all colors are **in-gamut** for their declared color space. This guide explains how to handle out-of-gamut colors before exporting to PaletteJSON, and how to preserve original wide-gamut values using `altRepresentations`.

## What is Gamut Mapping?

Different color spaces have different **gamuts** (ranges of representable colors):

- **sRGB:** Smallest gamut (~35% of human-visible colors) — industry standard since 1996
- **DisplayP3:** Wider gamut (~50% of human-visible colors, ~45% larger than sRGB) — modern displays
- **Lab/OKLCH:** Can represent all human-visible colors, but not all values are physically realizable

### The Problem

A vibrant DisplayP3 color may not have an exact sRGB equivalent. Similarly, a color defined in Lab might fall outside the sRGB gamut entirely.

**Example:** Pure P3 red `[1.0, 0.0, 0.0]` is more saturated than sRGB can display. If you naively clamp it to sRGB `[1.0, 0.0, 0.0]`, you've lost information — but they're different colors.

### The Solution

**Gamut mapping algorithms** adjust out-of-gamut colors to fit within the target space while preserving perceptual qualities (hue, lightness) as much as possible.

## Recommended Workflow

### Converting Wide-Gamut to Narrow-Gamut

**Step 1: Identify out-of-gamut colors**

Use a color library to check if a color is in-gamut:

```javascript
import Color from "colorjs.io";

const p3Color = new Color("p3", [1.0, 0.2, 0.3]);
const inGamut = p3Color.inGamut("srgb");

console.log(inGamut); // false — out of gamut!
```

**Step 2: Apply perceptual gamut mapping**

Use a perceptual algorithm (not simple clipping):

```javascript
// CSS Color Module 4 algorithm (recommended)
const srgbColor = p3Color.to("srgb").toGamut({
  method: "css", // CSS Color 4 chroma reduction
  space: "oklch", // Use OKLCH for perceptual mapping
});

console.log(srgbColor.coords); // [0.9982, 0.1953, 0.2847]
```

**Step 3: Store mapped color as primary representation**

```json
{
  "id": "vibrant-red",
  "name": "Vibrant Red",
  "hex": "#ff3248",
  "components": [0.9982, 0.1953, 0.2847]
}
```

**Step 4: Optionally preserve original in altRepresentations**

```json
{
  "id": "vibrant-red",
  "name": "Vibrant Red",
  "hex": "#ff3248",
  "components": [0.9982, 0.1953, 0.2847],
  "altRepresentations": [
    {
      "colorRepresentation": "DisplayP3",
      "components": [1.0, 0.2, 0.3]
    }
  ]
}
```

**Benefits:**

- Maximum compatibility (all tools can use sRGB)
- Future-proofing (wide-gamut preserved for newer displays)
- No data loss
- Tools can choose the appropriate representation for their target

## Gamut Mapping Algorithms

### Recommended: CSS Color Module 4 (Chroma Reduction)

**How it works:** Reduces chroma (saturation) in OKLCH space while preserving hue and lightness.

**Pros:**

- Perceptually accurate (uses OKLCH)
- Standardised (CSS Color Module 4)
- Preserves hue (critical for brand colors)
- Supported by colorjs.io and modern browsers

**Cons:**

- May reduce saturation noticeably for highly saturated colors

**Use when:** Maximum compatibility with web standards is needed.

```javascript
const mapped = color.to("srgb").toGamut({
  method: "css",
  space: "oklch",
});
```

### Alternative: Björn Ottosson's Perceptual Gamut Mapping

**How it works:** Advanced perceptual algorithm optimized for Oklab/OKLCH.

**Pros:**

- Excellent perceptual results
- Minimises visible artifacts
- Better saturation preservation than CSS method

**Cons:**

- Not yet a web standard
- Requires third-party implementation

**Use when:** Perceptual quality is critical (e.g., photography, art palettes).

**Reference:** [Björn Ottosson's blog post](https://bottosson.github.io/posts/gamutclipping/)

### Avoid: Simple RGB Clipping

**How it works:** Clamps RGB values to [0, 1] range.

```javascript
// DON'T DO THIS
const clipped = [
  Math.max(0, Math.min(1, r)),
  Math.max(0, Math.min(1, g)),
  Math.max(0, Math.min(1, b)),
];
```

**Problem:** Causes hue shifts and desaturation artifacts.

**Example:**

- Original P3: `[1.2, 0.5, 0.3]` (vibrant orange)
- Simple clipping: `[1.0, 0.5, 0.3]` (shifts towards red-orange)
- Perceptual mapping: `[1.0, 0.48, 0.25]` (preserves orange hue)

**Never use simple clipping for brand colors or design systems.**

## Preserving Out-of-Gamut Colors

Use `altRepresentations` to maintain both in-gamut and original wide-gamut variants:

### Example: Mobile App Palette

```json
{
  "name": "Mobile Brand Palette",
  "slug": "mobile-brand",
  "type": "categorical",
  "colorRepresentation": "sRGB",
  "colors": [
    {
      "id": "primary",
      "name": "Primary Brand",
      "hex": "#ff3248",
      "components": [0.9982, 0.1953, 0.2847],
      "altRepresentations": [
        {
          "colorRepresentation": "DisplayP3",
          "components": [1.0, 0.2, 0.3]
        }
      ]
    }
  ]
}
```

**Benefits:**

- sRGB fallback for legacy devices
- P3 colors for modern iPhones/Macs
- Tools automatically select best representation

### Workflow: Design Tool → PaletteJSON

**In Figma (DisplayP3):**

1. Define brand color in DisplayP3: `[1.0, 0.2, 0.3]`
2. Export to PaletteJSON

**Processing script:**

```javascript
// Map to sRGB for compatibility
const srgb = p3Color.to("srgb").toGamut({ method: "css", space: "oklch" });

// Export both representations
const palette = {
  colorRepresentation: "sRGB",
  colors: [
    {
      hex: srgb.toString({ format: "hex" }),
      components: srgb.coords,
      altRepresentations: [
        {
          colorRepresentation: "DisplayP3",
          components: p3Color.coords,
        },
      ],
    },
  ],
};
```

## Detecting Out-of-Gamut Colors

### Using colorjs.io

```javascript
import Color from "colorjs.io";

const color = new Color("oklch", [0.7, 0.25, 30]);

// Check if in sRGB gamut
if (!color.inGamut("srgb")) {
  console.log("Out of gamut! Mapping required.");

  // Map to sRGB
  const mapped = color.to("srgb").toGamut({ method: "css", space: "oklch" });

  // Calculate how much the color changed
  const deltaE = color.deltaE(mapped, "2000");
  console.log(`Color changed by ΔE: ${deltaE.toFixed(2)}`);
}
```

### Using Culori

```javascript
import { formatHex, inGamut, clampChroma } from "culori";

const color = { mode: "oklch", l: 0.7, c: 0.25, h: 30 };

if (!inGamut("rgb")(color)) {
  // Map using chroma reduction
  const mapped = clampChroma(color, "oklch", "rgb");
  console.log(formatHex(mapped)); // #ff5733
}
```

## Common Scenarios

### Scenario 1: Importing Figma Palettes (DisplayP3)

**Problem:** Figma uses DisplayP3; many targets need sRGB.

**Solution:** Map P3 → sRGB, store both:

```json
{
  "colorRepresentation": "sRGB",
  "colors": [
    {
      "hex": "#ff3248",
      "components": [0.9982, 0.1953, 0.2847],
      "altRepresentations": [
        { "colorRepresentation": "DisplayP3", "components": [1.0, 0.2, 0.3] }
      ]
    }
  ]
}
```

### Scenario 2: Design System with Wide-Gamut Accent

**Problem:** Brand accent color exceeds sRGB; need web compatibility.

**Solution:** Provide both representations, document which is "canonical":

```json
{
  "id": "accent",
  "name": "Accent (DisplayP3 canonical)",
  "description": "Use DisplayP3 representation on modern displays",
  "hex": "#ff3248",
  "components": [0.9982, 0.1953, 0.2847],
  "altRepresentations": [
    {
      "colorRepresentation": "DisplayP3",
      "components": [1.0, 0.2, 0.3]
    }
  ]
}
```

### Scenario 3: Lab Colors for Print → Digital Conversion

**Problem:** Lab colors from print workflow may be out-of-gamut for sRGB.

**Solution:** Map via OKLCH for perceptual accuracy:

```javascript
const labColor = new Color("lab", [65, 45, -30]);

// Check gamut
if (!labColor.inGamut("srgb")) {
  // Map via OKLCH (perceptual)
  const oklch = labColor.to("oklch");
  const srgb = oklch.to("srgb").toGamut({ method: "css", space: "oklch" });

  // Store both for cross-media use
  const palette = {
    colorRepresentation: "sRGB",
    colors: [
      {
        components: srgb.coords,
        altRepresentations: [
          { colorRepresentation: "Lab", components: labColor.coords },
        ],
      },
    ],
  };
}
```

## Testing Gamut Mapping Quality

### Visual Comparison

```javascript
import Color from "colorjs.io";

const original = new Color("p3", [1.0, 0.3, 0.4]);

// Test different mapping methods
const cssMap = original.to("srgb").toGamut({ method: "css", space: "oklch" });
const clipMap = original.to("srgb").toGamut({ method: "clip" }); // simple clipping

// Compare perceptual differences
console.log(`CSS method ΔE: ${original.deltaE(cssMap, "2000").toFixed(2)}`);
console.log(`Clip method ΔE: ${original.deltaE(clipMap, "2000").toFixed(2)}`);

// Smaller ΔE = more perceptually similar
```

### Hue Preservation Test

```javascript
// Check if hue is preserved
const originalOKLCH = original.to("oklch");
const mappedOKLCH = cssMap.to("oklch");

const hueDiff = Math.abs(originalOKLCH.h - mappedOKLCH.h);
console.log(`Hue shift: ${hueDiff.toFixed(2)}°`);

// Good gamut mapping: hue shift < 5°
// Poor gamut mapping: hue shift > 10°
```

## Summary: Best Practices

1. **Never use simple RGB clipping** — causes hue shifts
2. **Use CSS Color Module 4 method** for web standards compatibility
3. **Preserve original colors** in `altRepresentations` when mapping
4. **Test perceptual difference** using ΔE 2000 (aim for ΔE < 5)
5. **Document which representation is canonical** if multiple provided
6. **Consider target devices:** sRGB for web, DisplayP3 for modern Apple devices

## Tools and Libraries

### Recommended Libraries

- **[colorjs.io](https://colorjs.io)** — Comprehensive, CSS Color 4 support, gamut mapping built-in
- **[Culori](https://culorijs.org)** — Fast, tree-shakeable, good gamut mapping
- **[Color.js by DM8tbr](https://github.com/colorjs/color.js)** — Low-level, educational

### Online Tools

- **[OKLCH Color Picker](https://oklch.com)** — Visual gamut boundaries
- **[Color.js Playground](https://colorjs.io/apps/convert/)** — Test conversions and gamut mapping

:::tip Next Steps

- **Precision matters:** Read [Precision & Accuracy guide](./precision-and-accuracy.md) to avoid drift during conversions
- **Choose the right space:** See [Choosing Color Spaces guide](./choosing-color-spaces.md)
- **Technical details:** Check [Color Representations spec](../spec/color-representations.md) for validation rules
  :::

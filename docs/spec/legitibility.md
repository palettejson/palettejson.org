---
id: legibility
title: Legibility
sidebar_label: Legibility
sidebar_position: 7
description: Provides per-color metadata about luminance, contrast ratios, and preferred text color for readability.
---

# Legibility

Each color may include a `legibility` object to describe its perceptual properties.  
This helps consumers choose appropriate foreground text colors and assess contrast.

## Properties

### `luminance` (optional)

- **Type:** number
- **Range:** 0 ≤ value ≤ 1
- **Purpose:** relative luminance of the color, following WCAG definitions.

### `contrastVsWhite` (optional)

- **Type:** number
- **Minimum:** 1
- **Purpose:** contrast ratio of the color against pure white.

### `contrastVsBlack` (optional)

- **Type:** number
- **Minimum:** 1
- **Purpose:** contrast ratio of the color against pure black.

### `preferredText` (optional)

- **Type:** string
- **Allowed values:** `light`, `dark`
- **Purpose:** guidance for whether light or dark text is more legible over this color.

## Examples

```json
{
  "id": "brand-blue",
  "hex": "#1269F2",
  "legibility": {
    "luminance": 0.28,
    "contrastVsWhite": 3.2,
    "contrastVsBlack": 12.5,
    "preferredText": "light"
  }
}
```

## Usage guidance

- `luminance` and contrast ratios are numeric hints; different consumers may calculate them differently.
- `preferredText` is a high-level recommendation that can be applied directly in UIs.
- These fields are optional — if absent, consumers should calculate or infer legibility as needed.

:::tip Next steps

You’ve reached the end of the Specification section.  
Check out [Examples](../examples.md) to see PaletteJSON used in practice.
:::

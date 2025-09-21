---
id: palette
title: Palette Object
sidebar_label: Palette
sidebar_position: 2
description: Defines the structure of a palette, including required fields, optional metadata, color definitions, and constraints.
---

# Palette Object

Each entry in the root-level `palettes` array must be a **Palette object**.  
Palettes describe a collection of colors along with metadata and optional accessibility information.

## Properties

### `name` (required)

- **Type:** string
- **Purpose:** Human-readable label for the palette.

### `slug` (required)

- **Type:** string
- **Pattern:** `^[a-z0-9]+(?:-[a-z0-9]+)*$`
- **Purpose:** URL-safe identifier for referencing the palette.

### `type` (required)

- **Type:** string
- **Allowed values:** `categorical`, `sequential`, `diverging`
- **Purpose:** Declares how consumers should interpret the palette.

### `colors` (required)

- **Type:** array
- **Min items:** 2
- **Items:** each entry must be a valid [Color object](./color.md).
- **Purpose:** Holds the palette’s ordered color definitions.

### `description` (optional)

- **Type:** string
- **Purpose:** Freeform notes or summary about the palette.

### `version` (optional)

- **Type:** string
- **Purpose:** Tracks the palette’s release or revision identifier (for example, `"1.0"`).

### `author` (optional)

- **Type:** object
- **Fields:**
  - `name` — string (optional)
  - `url` — string (optional, must be a valid URI)
- **Purpose:** Credits who created or maintains the palette.

### `license` (optional)

- **Type:** string
- **Purpose:** States licensing or usage terms (SPDX identifier or free text).

### `tags` (optional)

- **Type:** array of strings
- **Purpose:** Provides keywords to aid discovery or filtering.

### `colorSpace` (optional)

- **Type:** string
- **Allowed values:** `sRGB`, `DisplayP3`, `Lab`, `OKLCH`, `sRGB-linear-extended`, `HSL`
- **Purpose:** Declares how any `components` values in this palette are interpreted.
- See [Color spaces](./color-spaces.md) for component ranges.

:::note
This property becomes required if **any** color in the palette uses `components`.
Entries using only `hex` values do not depend on `colorSpace`.
:::

### `accessibility` (optional)

- **Type:** object
- **Purpose:** Records color-vision-deficiency testing and related metadata.
- See [Accessibility](./accessibility).

### `aliases` (optional)

- **Type:** object mapping strings to string arrays
- **Purpose:** Captures legacy or alternate names for the palette.

## Validation rules

The schema enforces two important invariants:

1. **Positions**:  
   If any color in the `colors` array declares a `position`, then **all colors** must declare a `position`.  
   Positions are 1-based indices.

2. **Components vs color Space**:  
   If any color uses `components`, then the palette must declare a `colorSpace`.

## Examples

```json
{
  "name": "Brand Core",
  "slug": "brand-core",
  "type": "categorical",
  "colorSpace": "DisplayP3",
  "colors": [
    { "id": "primary", "name": "Primary", "components": [0.1, 0.4, 0.9, 1.0] },
    { "id": "secondary", "name": "Secondary", "hex": "#FF6600" }
  ],
  "author": {
    "name": "Example Studio",
    "url": "https://example.com"
  },
  "license": "CC-BY-4.0",
  "tags": ["brand", "ui"],
  "accessibility": {
    "cvdTestedFor": ["deuteranopia"],
    "notes": "Checked with simulator"
  }
}
```

---
id: palette
title: Palette Object
sidebar_label: Palette
sidebar_position: 2
description: Defines the structure of a palette, including required fields, optional metadata, colour definitions, and constraints.
---

# Palette Object

Each entry in the root-level `palettes` array must be a **Palette object**.  
Palettes describe a collection of colours along with metadata and optional accessibility information.

## Required fields

- **`name`** — string  
  Human-readable label for the palette.

- **`slug`** — string  
  URL-safe identifier. Must match the pattern:

  ```regex
  ^[a-z0-9]+(?:-[a-z0-9]+)*$
  ```

  Lowercase letters, digits, and hyphens only.

- **`type`** — string  
  Must be one of:

  - `categorical`
  - `sequential`
  - `diverging`

- **`colors`** — array  
  At least two items. Each entry must be a valid [Colour object](./color.md).

## Optional fields

- **`description`** — string, free text.
- **`version`** — string (e.g., `"1.0"`).
- **`author`** — object with:
  - `name` (string)
  - `url` (string, must be a valid URI)
- **`license`** — string (SPDX identifier or free text).
- **`tags`** — array of strings (keywords).
- **`colorSpace`** — string  
  Declares how `components` values are interpreted in this palette.  
  Must be one of:

  - `sRGB` (default)
  - `DisplayP3`
  - `Lab`
  - `OKLCH`
  - `sRGB-linear-extended`

:::note
This property is required if **any** colour in the palette uses `components`.
Entries using only `hex` values do not depend on `colorSpace`.
:::

- **`accessibility`** — object, see [Accessibility](./accessibility).
- **`aliases`** — object mapping arbitrary keys to string arrays. Useful for legacy or alternate names.

## Consistency rules

The schema enforces two important invariants:

1. **Positions**:  
   If any colour in the `colors` array declares a `position`, then **all colours** must declare a `position`.  
   Positions are 1-based indices.

2. **Components vs Colour Space**:  
   If any colour uses `components`, then the palette must declare a `colorSpace`.

## Example

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

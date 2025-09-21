---
id: accessibility
title: Accessibility
sidebar_label: Accessibility
sidebar_position: 6
description: Describes how to record color-vision-deficiency testing and other accessibility metadata at the palette level.
---

# Accessibility

PaletteJSON allows palettes to include an `accessibility` object.  
This metadata records testing and notes related to color-vision deficiency (CVD) and perceptual distinctiveness.

## Properties

### `cvdTestedFor` (optional)

- **Type:** array of strings
- **Allowed values:** `protanopia`, `deuteranopia`, `tritanopia`, `achromatopsia`

Purpose: declare which color-vision deficiencies have been explicitly tested for this palette.

### `cvdMaxDistinctClasses` (optional)

- **Type:** object
- Keys: freeform labels (e.g. `protanopia`, `overall`)
- Values: integers ≥ 1

Purpose: indicate the maximum number of classes (distinct colors) that remain distinguishable under a given CVD condition.

Example:

```json
"cvdMaxDistinctClasses": {
  "overall": 6,
  "protanopia": 5
}
```

### `tools` (optional)

- **Type:** array of strings
- Purpose: list tools or simulators used for accessibility testing.

### `notes` (optional)

- **Type:** string
- Freeform commentary about testing or limitations.

## Examples

```json
{
  "name": "Accessible Palette",
  "slug": "accessible",
  "type": "categorical",
  "colors": [{ "hex": "#1F77B4" }, { "hex": "#FF7F0E" }, { "hex": "#2CA02C" }],
  "accessibility": {
    "cvdTestedFor": ["protanopia", "deuteranopia"],
    "cvdMaxDistinctClasses": {
      "overall": 6,
      "protanopia": 5
    },
    "tools": ["Sim Daltonism", "Coblis"],
    "notes": "Distinctness verified for deuteranopia, some merging under protanopia."
  }
}
```

## Usage guidance

- Keep `cvdTestedFor` to the conditions you actually checked.
- Use `cvdMaxDistinctClasses` to give consumers an idea of safe usage limits.
- List the actual tools used for reproducibility.
- Add notes for nuances or caveats.

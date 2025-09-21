---
id: color
title: Color Object
sidebar_label: Color
sidebar_position: 3
description: Defines individual colors within a palette, supporting hex codes, color-space components, optional metadata, and references.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Color Object

Each entry in a palette’s `colors` array is a **Color object**.

:::note
A color must specify **at least one representation** (`hex` or `components`), but may include both. See [below](#hex-and-components-) for more information.
:::

## Properties

### `id` (optional)

- **Type:** string
- **Pattern:** `^[A-Za-z0-9][A-Za-z0-9._-]*$`
- **Purpose:** stable identifier for referencing colors programmatically.

### `name` (optional)

- **Type:** string
- **Purpose:** Human-readable label.

### `hex` and `components` \*

:::info

- **Required:** at least one of `hex` or `components`.
- **Allowed:** both may appear together — the schema does not forbid it.
- **Authoritative:** when both are present, `components` should be considered canonical, with `hex` provided for preview or interop.
  :::

#### `hex` (optional \*)

- **Type:** string
  - Always interpreted as **display sRGB**.
- **Formats supported:**
  - `#RRGGBB` (6-digit HEX)
  - `#RRGGBBAA` (8-digit HEX, with alpha as the last pair)

#### `components` (optional \*)

- **Type:** array of numbers (3 or 4 values, depending on color space).
- **Purpose:** expresses the color using numeric components in the palette’s declared color space.

:::note
Interpretation depends on the parent palette’s `colorSpace`. Declare it on the [Palette](./palette.md) object whenever any color uses components. Valid component shapes and ranges are documented in [Color Spaces](./color-spaces.md).
:::

### `references` (optional)

- **Type:** array of objects
- **Purpose:** Links the color to identifiers from external catalogues (e.g. Pantone, RAL, etc.).
- See [References](./references).

### `position` (optional)

- **Type:** integer (≥ 1)
- **Purpose:** explicit ordering index.

:::caution  
If any color in the palette has `position`, **all** colors must.  
:::

### `notes` (optional)

- **Type:** string
- **Purpose:** Freeform comments.

### `altRepresentations` (optional)

- **Type:** array of objects
- **Fields:**
  - `colorSpace` — string (required, one of: `sRGB`, `DisplayP3`, `Lab`, `OKLCH`, `sRGB-linear-extended`, `HSL`)
  - `components` — array of numbers (required, following the specified color space rules)
- **Purpose:** Alternative color space representations of the same color.
- See [Color spaces](./color-spaces.md) for component ranges.

:::info
Unlike the palette-level `colorSpace` which applies to all `components`, each `altRepresentations` entry declares its own `colorSpace` and must be self-contained. This allows a single color to be expressed in multiple color spaces simultaneously.
:::

### `legibility` (optional)

- **Type:** object
- **Purpose:** Stores contrast metrics and recommended text color for this swatch.
- See [Legibility](./legibility).

## Validation rules

- A color must have **at least one** of `hex` or `components`.
- Having both is allowed and sometimes recommended.
- `hex` is always interpreted in display sRGB.
- `components` must match the parent palette’s `colorSpace`.
- If positions are used, all colors in the palette must include one.
- Extra fields are not permitted.

## Examples

Below are common ways to represent colors.

<Tabs>
  <TabItem value="hex" label="Hex only">

```json
{
  "id": "black",
  "name": "Black",
  "hex": "#000000"
}
```

  </TabItem>
<TabItem value="components" label="Components only">

```json
{
  "id": "red-lab",
  "name": "Red in Lab",
  "components": [53.2, 80.1, 67.2]
}
```

  </TabItem>
  <TabItem value="both" label="Hex + Components">

```json
{
  "id": "brand-blue",
  "name": "Brand Blue",
  "hex": "#1269F2",
  "components": [0.07, 0.41, 0.95],
  "references": [{ "system": "pantone", "code": "2728 C" }]
}
```

  </TabItem>
  <TabItem value="positioned" label="With Position">

```json
{
  "id": "step1",
  "name": "Light Gray",
  "hex": "#EEEEEE",
  "position": 1,
  "notes": "Background shade"
}
```

  </TabItem>
  <TabItem value="altrepresentations" label="altRepresentations">

```json
{
  "id": "brand-red",
  "name": "Brand Red",
  "hex": "#FF3366",
  "components": [1.0, 0.2, 0.4],
  "altRepresentations": [
    {
      "colorSpace": "OKLCH",
      "components": [0.65, 0.25, 12.5]
    },
    {
      "colorSpace": "Lab",
      "components": [55.2, 75.8, 35.1]
    }
  ]
}
```

  </TabItem>
</Tabs>

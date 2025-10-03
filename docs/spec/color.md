---
id: color
title: Color Object
sidebar_label: Color
sidebar_position: 3
description: Defines individual colors within a palette, supporting hex codes, color representation components, optional metadata, and references.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Color Object

Each entry in a palette’s `colors` array is a **Color object**.

:::note
A color must specify **at least one representation** (`hex` or `components`), but may include both. See [below](#hex-and-components) for more information.
:::

## Properties

### `id` (optional)

- **Type:** string
- **Pattern:** `^[A-Za-z0-9][A-Za-z0-9._-]*$`
- **Purpose:** stable identifier for referencing colors programmatically.

### `name` (optional)

- **Type:** string
- **Purpose:** Human-readable label.

### `hex` and `components` \* {#hex-and-components}

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

- **Type:** array of numbers (3 or 4 values, depending on color representation).
- **Purpose:** expresses the color using numeric components in the palette's declared color representation.

:::note
Interpretation depends on the parent palette's `colorRepresentation`. Declare it on the [Palette](./palette.md) object whenever any color uses components. Valid component shapes and ranges are documented in [Color Representations](./color-representations.md).
:::

#### Alpha Channel Encoding

Alpha channels behave differently depending on how the color is represented:

**In Component Arrays:**

Alpha is **always linear** (not gamma-encoded):
- Range: 0–1 (0 = fully transparent, 1 = fully opaque)
- Applies uniformly across all color spaces
- Fourth component in arrays: `[R, G, B, A]`, `[L, a, b, A]`, `[L, C, h, A]`, etc.

**Example:**
```json
{
  "components": [1.0, 0.5, 0.2, 0.85]  // 85% opaque
}
```

**In Hex Colors (#RRGGBBAA):**

Alpha **IS gamma-encoded** (matches CSS Color Module 4):
- Last 2 hex digits represent gamma-corrected alpha
- Matches browser behavior for compatibility

**Example:**
```json
{
  "hex": "#ff336680"  // 80 hex = 128 decimal ≈ 50% gamma-encoded alpha
}
```

:::warning Hex vs Component Alpha
The hex value `#ff336680` does **not** equal `components: [1.0, 0.2, 0.4, 0.5]` due to gamma encoding in hex alpha. Use color conversion libraries (e.g., colorjs.io, Culori) to ensure consistency when converting between hex and component representations.
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

### `groupId` (optional)

- **Type:** string
- **Pattern:** `^[A-Za-z0-9][A-Za-z0-9._-]*$`
- **Purpose:** Group identifier for organizing related colors (e.g., tonal scales, color harmonies, semantic families).

:::info
Colors with the same `groupId` value are considered related. This enables tools to:
- Recognize color families programmatically
- Export/filter color groups as units
- Visualize relationships between colors

**Valid examples:** `blue-scale`, `brand.primary.tints`, `red-family_2024`

**Invalid examples:** `-blue` (can't start with hyphen), `blue scale` (no spaces), `blue@scale!` (invalid characters)
:::

**Common use cases:**
- **Tonal scales:** Group variants by lightness (e.g., Tailwind blue-300, blue-400, blue-500)
- **Brand families:** Group primary color with tints/shades/variants
- **Color harmonies:** Group complementary, analogous, or triadic colors
- **Semantic groupings:** Group error/warning/success color families

### `referenceInGroup` (optional)

- **Type:** boolean
- **Default:** `false` (when omitted)
- **Purpose:** Marks this color as the reference/canonical member of its `groupId`.

:::info
This field identifies the "base" color from which variants derive:
- The base tone in a tonal scale (e.g., Tailwind blue-500)
- The canonical brand color in a color family
- The starting point for tints/shades

**When to use:**
- **Set to `true`:** For hierarchical groups with a clear reference color
- **Omit (or set to `false`):** For peer relationships (harmonies) or non-reference variants

**Business rule:** At most **one** color per `groupId` should have `referenceInGroup: true`. This constraint requires external validation beyond JSON Schema.
:::

### `notes` (optional)

- **Type:** string
- **Purpose:** Freeform comments.

### `altRepresentations` (optional)

- **Type:** array of objects
- **Fields:**
  - `colorRepresentation` — string (required, one of: `sRGB`, `DisplayP3`, `Lab`, `OKLCH`, `sRGB-linear-extended`, `HSL`)
  - `components` — array of numbers (required, following the specified color representation rules)
- **Purpose:** Alternative color representations of the same color.
- See [Color representations](./color-representations.md) for component ranges.

:::info
Unlike the palette-level `colorRepresentation` which applies to all `components`, each `altRepresentations` entry declares its own `colorRepresentation` and must be self-contained. This allows a single color to be expressed in multiple color representations simultaneously.
:::

### `legibility` (optional)

- **Type:** object
- **Purpose:** Stores contrast metrics and recommended text color for this swatch.
- See [Legibility](./legibility).

## Validation rules

- A color must have **at least one** of `hex` or `components`.
- Having both is allowed and sometimes recommended.
- `hex` is always interpreted in display sRGB.
- `components` must match the parent palette's `colorRepresentation`.
- If positions are used, all colors in the palette must include one.
- **Grouping constraint:** At most **one** color per `groupId` may have `referenceInGroup: true`. This business rule requires external validation beyond JSON Schema.
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
  <TabItem value="grouping" label="With Grouping">

```json
{
  "id": "blue-500",
  "name": "Blue 500",
  "hex": "#3B82F6",
  "position": 3,
  "groupId": "blue-scale",
  "referenceInGroup": true,
  "notes": "Reference color in blue tonal scale"
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
      "colorRepresentation": "OKLCH",
      "components": [0.65, 0.25, 12.5]
    },
    {
      "colorRepresentation": "Lab",
      "components": [55.2, 75.8, 35.1]
    }
  ]
}
```

  </TabItem>
</Tabs>

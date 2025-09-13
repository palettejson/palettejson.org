---
id: colour
title: Colour Object
sidebar_label: Colour
sidebar_position: 3
description: Defines individual colours within a palette, supporting hex codes, colour-space components, optional metadata, and references.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Colour Object

Each entry in a palette’s `colors` array is a **Colour object**.  
A colour must specify **at least one representation** (`hex` or `components`), but may include both.

:::info

- **Required:** at least one of `hex` or `components`.
- **Allowed:** both may appear together — the schema does not forbid it.
- **Authoritative:** when both are present, `components` should be considered canonical, with `hex` provided for preview or interop.
  :::

## Properties

### `id` (optional)

- **Type:** string
- Must match pattern:
  ```regex
  ^[A-Za-z0-9][A-Za-z0-9._-]*$
  ```
- Purpose: stable identifier for referencing colours programmatically.

### `name` (optional)

- **Type:** string
- Human-readable label.

### `hex` (optional, but one of `hex` or `components` required)

- **Type:** string
- Formats supported:
  - `#RRGGBB` (6-digit)
  - `#RRGGBBAA` (8-digit, with alpha as the last pair)
- Always interpreted as **display sRGB**.

### `components` (optional, but one of `hex` or `components` required)

- **Type:** array of numbers (3 or 4 values depending on colour space).
- Interpretation depends on the parent palette’s `colorSpace`.
- Examples:
  - `sRGB` or `DisplayP3`: `[R, G, B]` or `[R, G, B, A]`, values in [0, 1].
  - `Lab`: `[L, a, b]` where `L ∈ [0, 100]`, a/b unbounded.
  - `OKLCH`: `[L, C, h]` where `L ∈ [0, 1]`, `C ≥ 0`, `h ∈ [0, 360)`.
  - `sRGB-linear-extended`: either `[R, G, B]` unbounded, or `[R, G, B, A]` with `A ∈ [0, 1]`.

### `references` (optional)

- **Type:** array of objects, each with:
  - `system` — one of `pantone`, `ral`, `ncs`, `other` (required).
  - `code` — string (required).
  - `library`, `collection`, `note` — optional strings.

### `position` (optional)

- **Type:** integer (≥ 1)
- Purpose: explicit ordering index.

:::caution  
If any colour in the palette has `position`, **all** colours must.  
:::

### `notes` (optional)

- **Type:** string
- Freeform comments.

### `legibility` (optional)

- **Type:** object
- See [Legibility](./legibility).

## Examples

Below are common ways to represent colours.

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
  "name": "Light Grey",
  "hex": "#EEEEEE",
  "position": 1,
  "notes": "Background shade"
}
```

  </TabItem>
</Tabs>

## Validation rules

- A colour must have **at least one** of `hex` or `components`.
- Having both is allowed and sometimes recommended.
- `hex` is always interpreted in display sRGB.
- `components` must match the parent palette’s `colorSpace`.
- If positions are used, all colours in the palette must include one.
- Extra fields are not permitted.

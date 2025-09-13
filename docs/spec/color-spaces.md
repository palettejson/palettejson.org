---
id: color-spaces
title: Color Spaces
sidebar_label: Color Spaces
sidebar_position: 4
description: Lists supported colour spaces and explains how component arrays are interpreted and validated.
---

# Colour Spaces

When a colour is defined with `components`, the numbers must be interpreted in the context of the palette’s declared `colorSpace`.

If **any** colour in a palette uses `components`, the palette must define a `colorSpace`.

## Supported values

- `sRGB` (default)
- `DisplayP3`
- `Lab`
- `OKLCH`
- `sRGB-linear-extended`

### sRGB

- **Array form:** `[R, G, B]` or `[R, G, B, A]`
- **Range:** each component in **[0, 1]**
- **Alpha (optional):** in [0, 1]

Example:

```json
{
  "components": [0.25, 0.5, 0.75, 1.0]
}
```

### DisplayP3

- **Array form:** `[R, G, B]` or `[R, G, B, A]`
- **Range:** each component in **[0, 1]**
- **Alpha (optional):** in [0, 1]

Example:

```json
{
  "components": [0.1, 0.6, 0.3]
}
```

### Lab

- **Array form:** `[L, a, b]`
- **Ranges:**
  - **L:** 0 ≤ L ≤ 100
  - **a/b:** unbounded (schema does not clamp them)

:::note
Values of `a` or `b` with very large magnitude may indicate an unrealistic colour.  
The schema does not enforce limits here — linting tools can warn about suspicious values.
:::

Example:

```json
{
  "components": [65.0, 30.5, -18.2]
}
```

### OKLCH

- **Array form:** `[L, C, h]`
- **Ranges:**
  - **L:** 0 ≤ L ≤ 1
  - **C:** ≥ 0
  - **h (hue):** 0 ≤ h < 360

Example:

```json
{
  "components": [0.72, 0.14, 210.5]
}
```

### sRGB-linear-extended

- **Array form:**

  - `[R, G, B]` (each a number, unbounded)
  - `[R, G, B, A]` where alpha ∈ [0, 1]

- **Notes:**
  - Unlike gamma-encoded sRGB, these values are linear light.
  - No enforced min/max on R, G, B.

Example:

```json
{
  "components": [1.2, -0.1, 0.8, 0.5]
}
```

## Summary

- `hex` values are **always** treated as display sRGB, regardless of palette `colorSpace`.
- `components` must match the palette’s declared `colorSpace`.
- If a palette mixes hex and components, the hex values remain in display sRGB; components follow the palette-level colour space.

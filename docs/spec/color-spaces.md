---
id: color-spaces
title: Color Space Components
sidebar_label: Color Space Components
sidebar_position: 4
description: Details how component arrays must be structured for each palette colorSpace and the validation rules that apply to them.
---

# Color Spaces Components

When a color is defined with `components`, the numbers must be interpreted in the context of a declared `colorSpace`. This applies in two scenarios:

1. **Palette-level:** When any color in a palette uses `components`, the palette must define a `colorSpace` that applies to all such colors.
2. **Color-level:** Individual colors can specify alternative representations using `altRepresentations`, where each entry declares its own `colorSpace`.

<details>
  <summary>Choosing between palette-level and color-level methods</summary>

Both approaches have distinct advantages and trade-offs depending on your use case.

<h2>Palette-level (`colorSpace` + `components`)</h2>

<h3>Pros:</h3>

- Consistency - entire palette uses one color space
- Simpler tooling - tools know upfront what space all colors are in
- Smaller file size - no repeated colorSpace declarations

<h3>Cons:</h3>

- Inflexible - can't mix color spaces within one palette
- Lossy conversion - if source colors are from different spaces, you're forced to convert everything to one space

<h2>Color-level (`altRepresentations`)</h2>

<h3>Pros:</h3>

- Preserve original values - keep colors in their native spaces without conversion
- Multiple representations - same color in Lab, sRGB, OKLCH simultaneously
- Tool flexibility - apps can pick the most appropriate representation

<h3>Cons:</h3>

- Larger files - repeated colorSpace declarations and multiple representations
- Complexity - tools must handle mixed color spaces
- Potential inconsistency - same color with different representations might not match exactly

</details>

## Supported values by color spaces

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
Values of `a` or `b` with very large magnitude may indicate an unrealistic color.  
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

### HSL

- **Array form:** `[H, S, L]` or `[H, S, L, A]`
- **Ranges:**
  - **H (hue):** 0 ≤ H < 360 (degrees)
  - **S (saturation):** 0 ≤ S ≤ 1
  - **L (lightness):** 0 ≤ L ≤ 1
  - **Alpha (optional):** 0 ≤ A ≤ 1

Example:

```json
{
  "components": [240, 0.8, 0.5, 1.0]
}
```

## Validation rules

- `hex` values are **always** treated as display sRGB, regardless of palette `colorSpace`.
- `components` must match the palette's declared `colorSpace`.
- `altRepresentations` entries are self-contained: each must declare its own `colorSpace` and follow the corresponding component validation rules.
- If a palette mixes hex and components, the hex values remain in display sRGB; components follow the palette-level color space.

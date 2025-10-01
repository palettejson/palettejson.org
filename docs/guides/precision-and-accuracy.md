---
id: precision-and-accuracy
title: Component Precision and Accuracy
sidebar_label: Precision & Accuracy
sidebar_position: 2
description: Guidelines for decimal precision to maintain color fidelity across transformations
---

# Component Precision and Accuracy

The number of decimal places you use in component arrays directly impacts color fidelity, especially during color space conversions and round-trip transformations. This guide explains how to maintain accuracy while avoiding unnecessarily bloated files.

## Why Precision Matters

Color space conversions involve complex mathematical transformations. Insufficient decimal precision causes:

- **Drift:** Colors shift after round-trip conversion (sRGB → Lab → sRGB)
- **Banding:** Visible steps in smooth gradients
- **Accumulation:** Errors compound across multiple transformations
- **Perceptual shifts:** Subtle hue or saturation changes that become visible

For design systems shared across tools, precision ensures your brand colors remain consistent.

## Recommended Decimal Places by Color Space

### sRGB and DisplayP3

**Recommendation:** 4 decimal places

**Example:**

```json
{
  "components": [0.9608, 0.8784, 0.8627]
}
```

**Rationale:**

- Ensures sub-0.4% precision per component
- Sufficient for representing 8-bit source data (255 levels)
- 4 decimals ≈ 12-bit effective precision (4096 levels)
- Matches typical color picker precision in design tools

**Impact of lower precision:**

- **2 decimals:** Only 100 distinct levels → visible banding in gradients
- **3 decimals:** Acceptable for draft work, but may cause drift in conversions
- **6+ decimals:** Excessive for 8-bit workflows, increases file size unnecessarily

:::tip Practical Test
Convert `#F5E0DC` to components:

- **2 decimals:** `[0.96, 0.88, 0.86]` → back to hex: `#F5E0DB` (off by 1)
- **4 decimals:** `[0.9608, 0.8784, 0.8627]` → back to hex: `#F5E0DC` (exact)
  :::

### Lab

**Recommendation:** 4-5 decimal places for L, a, b

**Example:**

```json
{
  "components": [51.2345, 80.1234, -70.5678]
}
```

**Rationale:**

- Required for accurate round-trip conversions
- Lab is often an intermediate space (sRGB → Lab → OKLCH → sRGB)
- a/b values are unbounded; precision prevents cumulative drift
- Critical for maintaining perceptual accuracy (ΔE < 1.0)

**Impact of insufficient precision:**

- **2 decimals:** Significant color shifts (ΔE > 2.0 common)
- **3 decimals:** Acceptable for some workflows, but may fail scientific use cases
- **4-5 decimals:** Ensures ΔE < 1.0 (imperceptible difference) in round trips

**Critical for:**

- Design systems with strict color fidelity requirements
- Scientific/technical color work
- Cross-media color matching (print + digital)
- Color difference calculations (ΔE 2000, ΔE 94)

:::warning Round-Trip Accuracy
Lab is commonly used as an intermediate space for conversions. If you're converting sRGB → Lab → OKLCH, insufficient Lab precision will corrupt the final OKLCH values even if OKLCH itself uses high precision.
:::

### OKLCH

**Recommendation:** 4-5 decimal places for L and C, 1-2 for H

**Example:**

```json
{
  "components": [0.72045, 0.14523, 210.5]
}
```

**Rationale:**

- Lightness (L) and Chroma (C) require high precision (similar to Lab)
- Hue (H) is coarse-grained (360° scale); 1-2 decimals usually sufficient
- Ensures perceptual uniformity is preserved across conversions
- Critical for perceptual color scales (e.g., design system color ramps)

**Component-specific guidance:**

- **L (Lightness):** 4-5 decimals (0 ≤ L ≤ 1)
- **C (Chroma):** 4-5 decimals (C ≥ 0)
- **H (Hue):** 1-2 decimals (0 ≤ H < 360) — more precision adds little value

### HSL

**Recommendation:** 0-2 decimals for H, 2-4 for S/L

**Example:**

```json
{
  "components": [10, 0.56, 0.91]
}
```

**Rationale:**

- **Hue (H):** Coarse-grained (360° scale); integers often sufficient
- **Saturation/Lightness (S/L):** 2-4 decimals needed for accurate round trips
- HSL is typically a presentation format, not a storage format

**Precision by component:**

- **H (Hue):** 0-2 decimals (integer degrees are usually fine)
- **S (Saturation):** 2-4 decimals (0 ≤ S ≤ 1)
- **L (Lightness):** 2-4 decimals (0 ≤ L ≤ 1)

:::note HSL as Storage Format
HSL is popular for designer-facing tools, but it's not perceptually uniform. If storing authoritative color values, consider sRGB or OKLCH instead, and provide HSL in `altRepresentations` for convenience.
:::

### sRGB-linear-extended

**Recommendation:** 4-5 decimal places (may be unbounded)

**Example:**

```json
{
  "components": [1.2345, -0.0678, 0.8901, 0.5]
}
```

**Rationale:**

- Linear light requires high precision for HDR workflows
- Values can exceed 1.0 (HDR) or be negative (wide-gamut)
- Used for physically accurate compositing
- Precision requirements similar to sRGB but with unbounded range

### Alpha Channels

**Recommendation:** 2-4 decimal places (all color spaces)

**Example:**

```json
{
  "components": [1.0, 0.5, 0.2, 0.85]
}
```

**Rationale:**

- Transparency typically doesn't require extreme precision
- 2 decimals = 100 levels (usually sufficient)
- 4 decimals matches other component precision (consistency)
- Perceptual difference in alpha is less critical than in color

## Testing Round-Trip Accuracy

Here's how to verify your precision is sufficient using JavaScript and [colorjs.io](https://colorjs.io):

```javascript
import Color from "colorjs.io";

// Original sRGB color
const original = new Color("srgb", [0.9608, 0.8784, 0.8627]);

// Convert to Lab and back
const lab = original.to("lab");
const roundTrip = lab.to("srgb");

// Calculate perceptual difference
const deltaE = original.deltaE(roundTrip, "2000");
console.log(`ΔE 2000: ${deltaE.toFixed(4)}`);

// ΔE < 1.0 = imperceptible difference (good!)
// ΔE 1.0-3.0 = noticeable under scrutiny
// ΔE > 3.0 = clearly visible difference (bad!)
```

**Interpreting ΔE 2000 values:**

- **< 1.0:** Imperceptible difference (excellent precision)
- **1.0-2.0:** Perceptible only under close comparison (acceptable for most use cases)
- **2.0-3.0:** Noticeable difference (marginally acceptable)
- **> 3.0:** Clearly visible difference (insufficient precision)

:::tip Rule of Thumb
If round-trip ΔE 2000 exceeds 1.0, increase decimal precision by one place and test again.
:::

## Common Pitfalls

### Over-Precision

**Problem:** Using 8+ decimal places from floating-point calculations

**Example:**

```json
{
  "components": [0.96078431372549, 0.87843137254902, 0.86274509803922]
}
```

**Solution:** Round to 4 decimals — additional precision adds no value for 8-bit workflows.

### Under-Precision

**Problem:** Using 2 decimals for Lab values

**Example:**

```json
{
  "components": [65.0, 30.5, -18.2] // Lab with insufficient a/b precision
}
```

**Solution:** Use 4-5 decimals for Lab/OKLCH to prevent drift.

### Inconsistent Precision

**Problem:** Mixing high and low precision within a palette

**Example:**

```json
{
  "colors": [
    { "components": [0.96, 0.88, 0.86] }, // 2 decimals
    { "components": [0.9608, 0.8784, 0.8627] } // 4 decimals
  ]
}
```

**Solution:** Standardise precision across your palette for consistency.

## Precision vs File Size

### File Size Impact

For a 100-color palette (sRGB, 3 components each):

| Precision  | Example Value | File Size Estimate |
| ---------- | ------------- | ------------------ |
| 2 decimals | `0.96`        | ~1.2 KB (baseline) |
| 4 decimals | `0.9608`      | ~1.6 KB (+33%)     |
| 6 decimals | `0.960784`    | ~2.0 KB (+67%)     |
| 8 decimals | `0.96078431`  | ~2.4 KB (+100%)    |

**Recommendation:** 4 decimals strikes the right balance between accuracy and file size for most use cases. Use gzip compression for distribution (typically 60-70% reduction).

## Summary Table

| Color Space              | Component | Recommended Decimals | Rationale                        |
| ------------------------ | --------- | -------------------- | -------------------------------- |
| **sRGB**                 | R, G, B   | 4                    | Matches 8-bit source precision   |
| **DisplayP3**            | R, G, B   | 4                    | Matches 8-bit source precision   |
| **Lab**                  | L         | 4-5                  | Critical for perceptual accuracy |
| **Lab**                  | a, b      | 4-5                  | Unbounded, prevents drift        |
| **OKLCH**                | L, C      | 4-5                  | Perceptual uniformity            |
| **OKLCH**                | H         | 1-2                  | Coarse-grained hue scale         |
| **HSL**                  | H         | 0-2                  | Integer degrees usually fine     |
| **HSL**                  | S, L      | 2-4                  | Saturation/lightness precision   |
| **sRGB-linear-extended** | R, G, B   | 4-5                  | HDR requires precision           |
| **Alpha (all)**          | A         | 2-4                  | Transparency less critical       |

:::tip Next Steps

- **Gamut mapping:** Learn about converting between color spaces in the [Gamut Mapping guide](./gamut-mapping.md)
- **Color space selection:** Choose the right color space for your workflow in the [Choosing Color Spaces guide](./choosing-color-spaces.md)
- **Technical reference:** See component validation rules in the [Color Representations spec](../spec/color-representations.md)
  :::

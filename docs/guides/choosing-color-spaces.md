---
id: choosing-color-spaces
title: Choosing the Right Color Space
sidebar_label: Choosing Color Spaces
sidebar_position: 1
description: Decision guide for selecting the appropriate color representation for your palette
---

# Choosing the Right Color Space

PaletteJSON supports six color representations, each optimized for different workflows and display targets. This guide helps you choose the right one for your use case.

## Quick Decision Tree

**Start here:**

1. **Do you need wide-gamut colors beyond sRGB?**

   - Yes → Consider **DisplayP3** (modern displays) or **sRGB-linear-extended** (HDR workflows)
   - No → Continue to question 2

2. **Do you need perceptually uniform color manipulation?**

   - Yes → Consider **OKLCH** (modern) or **Lab** (industry standard)
   - No → Continue to question 3

3. **Do you need intuitive hue-based controls for designers?**
   - Yes → Consider **HSL** or **OKLCH**
   - No → Use **sRGB** (maximum compatibility)

## Color Space Comparison

### sRGB

**Best for:** Maximum device compatibility, web content, 8-bit workflows

**Reference:** IEC 61966-2-1 standard RGB

**Characteristics:**

- Industry standard for web and displays since 1996
- Limited to ~35% of human-visible colors (small gamut)
- Gamma-encoded (non-linear)
- Components: R, G, B (0–1 range), optional alpha (0–1)

**Use when:**

- Targeting legacy displays or unknown hardware
- Working with 8-bit image sources (PNG, JPEG)
- Maximum interoperability is critical
- Building design systems for web applications

**Avoid when:**

- You need vibrant, saturated colors beyond sRGB gamut
- Performing perceptual color adjustments
- Targeting modern wide-gamut displays exclusively

**Example use case:** Corporate brand colors for maximum compatibility across devices

### DisplayP3

**Best for:** Modern displays (iPhone 7+, 2016+ Macs), rich media content

**Reference:** DCI-P3 primaries with D65 white point (Apple Display P3)

**Characteristics:**

- ~45% wider gamut than sRGB (~50% of human-visible colors)
- Gamma-encoded (2.2 approximate)
- Components: R, G, B (0–1 range), optional alpha (0–1)
- Supported by Safari, modern browsers on compatible hardware

**Use when:**

- Targeting modern Apple devices
- Creating vibrant brand colors for mobile apps
- Working with photography or rich media
- Source content originates in DisplayP3

**Avoid when:**

- Need compatibility with older displays
- Working exclusively with web content (not all browsers support it)
- Source material is sRGB-native

**Example use case:** Mobile app design system for iOS with vibrant accent colors

### Lab

**Best for:** Scientific color work, cross-media color matching, perceptual uniformity

**Reference:** CIE L\*a\*b\* with D50 illuminant (per CSS Color Module 4)

**Characteristics:**

- Perceptually uniform (equal ΔE distances appear equally different)
- Device-independent color space
- Components: L (0–100), a/b (unbounded), optional alpha (0–1)
- Industry standard for color science and ICC profiles

**Use when:**

- Performing color science calculations
- Matching colors across print and digital media
- Need precise perceptual color differences (ΔE calculations)
- Working with ICC color profiles

**Avoid when:**

- Designers need intuitive color controls (a/b axes are non-obvious)
- Building simple web design systems (sRGB or OKLCH may be simpler)

**Example use case:** Brand color palette shared across print (CMYK) and digital (RGB) with precise matching

:::note Lab Illuminant
PaletteJSON uses **D50 illuminant** for Lab colors, matching CSS Color Module 4 and ICC v4 standards. If working with D65 Lab values (common in scientific contexts), convert to D50 before export.
:::

### OKLCH

**Best for:** Modern perceptual workflows, hue-based color systems

**Reference:** Björn Ottosson's Oklab with cylindrical transformation

**Characteristics:**

- Perceptually uniform (improved over Lab for modern displays)
- Cylindrical coordinates (hue-based, like HSL but perceptually accurate)
- Components: L (0–1), C (≥0), H (0–360°), optional alpha (0–1)
- Optimised for sRGB and DisplayP3 gamuts

**Use when:**

- Creating design systems with perceptual color scales
- Need hue-based manipulation with perceptual accuracy
- Building accessible color palettes (predictable contrast)
- Modern workflows with CSS Color Module 4 support

**Avoid when:**

- Targeting legacy browsers without CSS Color 4 support
- Working with print workflows (Lab is more established)

**Example use case:** Design system with perceptually uniform color scales for accessibility (e.g., Background-50 to Background-900)

### HSL

**Best for:** Designer-friendly color selection, intuitive hue-based adjustments

**Reference:** sRGB-based cylindrical color model

**Characteristics:**

- Intuitive hue/saturation/lightness controls
- Familiar to designers from tools like Photoshop, Figma
- Components: H (0–360°), S (0–1), L (0–1), optional alpha (0–1)
- **Not perceptually uniform** (hue shifts affect perceived brightness)

**Use when:**

- Designers need intuitive color controls
- Building color pickers or palette generators
- Hue-based theming systems (e.g., accent color variations)
- Familiarity is more important than perceptual accuracy

**Avoid when:**

- Need perceptually uniform color scales (use OKLCH instead)
- Calculating color contrast for accessibility (convert to sRGB first)
- Scientific color work

**Example use case:** Theme customisation UI where users adjust hue/saturation sliders

:::warning HSL Perceptual Non-Uniformity
Pure yellow (HSL: `60, 1.0, 0.5`) appears much brighter than pure blue (HSL: `240, 1.0, 0.5`) despite identical lightness values. For perceptually uniform scales, use OKLCH or Lab instead.
:::

### sRGB-linear-extended

**Best for:** HDR workflows, physical light calculations, compositing

**Reference:** Linear light sRGB (pre-gamma correction, unbounded)

**Characteristics:**

- Linear light (no gamma encoding)
- Unbounded RGB values (can exceed 1.0 for HDR)
- Components: R, G, B (unbounded), optional alpha (0–1)
- Used for physically accurate light compositing

**Use when:**

- Working with HDR displays and content
- Performing physically accurate lighting calculations
- Compositing operations requiring linear light
- Storing pre-gamma-corrected values

**Avoid when:**

- Target is standard dynamic range (SDR) displays
- Working with typical web/mobile design systems
- Need compatibility with standard image formats (PNG, JPEG)

**Example use case:** HDR video grading palette for Dolby Vision content

:::tip Linear vs Gamma-Encoded RGB
Linear RGB values represent physical light intensity. Gamma-encoded sRGB/DisplayP3 values are perceptually uniform for display. Most design work uses gamma-encoded values; linear is for compositing and HDR workflows.
:::

## Mixing Color Spaces with altRepresentations

You can provide the same color in multiple spaces using `altRepresentations`:

```json
{
  "id": "vibrant-red",
  "name": "Vibrant Red",
  "hex": "#ff3366",
  "components": [1.0, 0.2, 0.4],
  "altRepresentations": [
    {
      "colorRepresentation": "DisplayP3",
      "components": [1.0, 0.15, 0.38]
    },
    {
      "colorRepresentation": "OKLCH",
      "components": [0.68, 0.25, 12.3]
    }
  ]
}
```

**Use this when:**

- Preserving original wide-gamut colors alongside sRGB fallbacks
- Providing both designer-friendly (HSL) and accurate (Lab) representations
- Future-proofing palettes for wider gamut displays

See the [Gamut Mapping guide](./gamut-mapping.md) for workflows involving multiple color spaces.

## Summary Table

| Color Space              | Gamut        | Perceptual | Intuitive | Use Case              |
| ------------------------ | ------------ | ---------- | --------- | --------------------- |
| **sRGB**                 | Small        | No         | Medium    | Maximum compatibility |
| **DisplayP3**            | Wide         | No         | Medium    | Modern displays       |
| **Lab**                  | Full         | Yes        | No        | Color science, print  |
| **OKLCH**                | Full         | Yes        | Yes       | Modern design systems |
| **HSL**                  | Small (sRGB) | No         | Yes       | Designer tools        |
| **sRGB-linear-extended** | Unbounded    | No         | No        | HDR, compositing      |

:::tip Next Steps

- **Precision matters:** Read the [Precision & Accuracy guide](./precision-and-accuracy.md) to ensure color fidelity
- **Gamut mapping:** See the [Gamut Mapping guide](./gamut-mapping.md) for converting between color spaces
- **Technical reference:** Check the [Color Representations spec](../spec/color-representations.md) for validation rules
  :::

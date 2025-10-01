---
id: interoperability
title: Interoperability and Integration
sidebar_label: Interoperability
sidebar_position: 4
description: Best practices for converting colors, common pitfalls, and integration considerations
---

# Interoperability and Integration

This guide covers best practices for integrating PaletteJSON into tools and workflows, including conversion techniques, common pitfalls, and standards compliance.

## Core Assumptions and Standards

### PaletteJSON Standards

- **Lab colors use D50 illuminant** (CSS Color Module 4 standard)
- **Hex colors are always display sRGB** (gamma-encoded)
- **Component arrays follow declared colorRepresentation**
- **Colors are assumed in-gamut** for their declared space
- **Alpha in components is linear**; alpha in hex is gamma-encoded

:::info CSS Color Module 4 Alignment
PaletteJSON follows CSS Color Module 4 where applicable (Lab D50, hex alpha encoding, gamut mapping). This ensures maximum compatibility with modern web standards.
:::

## Conversion Best Practices

### Use Proper Color Conversion Libraries

**Never implement color conversions from scratch.** Color space mathematics is complex and error-prone.

**Recommended libraries:**

- **JavaScript:** [colorjs.io](https://colorjs.io), [Culori](https://culorijs.org)
- **Python:** [coloraide](https://facelessuser.github.io/coloraide/), [color-science](https://www.color-science.org/)
- **Rust:** [palette](https://crates.io/crates/palette)
- **Swift:** [SwiftColor](https://github.com/jordanbaird/SwiftColor)

**Why libraries matter:**

```javascript
// ❌ WRONG: Naive sRGB to HSL
function badRGBtoHSL(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  // ... missing gamma correction, edge cases, etc.
}

// ✅ CORRECT: Use a library
import Color from "colorjs.io";
const hsl = new Color("srgb", [r, g, b]).to("hsl");
```

### Maintain Precision Through Conversion Chains

Color conversions accumulate errors. Follow precision guidelines from the [Precision & Accuracy guide](./precision-and-accuracy.md):

**Example: sRGB → Lab → OKLCH chain**

```javascript
import Color from "colorjs.io";

// Start with high precision
const srgb = new Color("srgb", [0.9608, 0.8784, 0.8627]);

// Convert to Lab (maintain 4-5 decimals)
const lab = srgb.to("lab");
console.log(lab.coords); // [91.2345, 6.7890, 5.4321]

// Convert to OKLCH (maintain 4-5 decimals)
const oklch = lab.to("oklch");
console.log(oklch.coords); // [0.92345, 0.01234, 45.6789]

// Round-trip back to sRGB
const backToSRGB = oklch.to("srgb");
const deltaE = srgb.deltaE(backToSRGB, "2000");
console.log(`ΔE 2000: ${deltaE.toFixed(4)}`); // Should be < 1.0
```

**If ΔE > 1.0, increase precision** in intermediate steps.

### Test Round-Trip Accuracy for Critical Colors

Always test critical brand colors through conversion chains:

```javascript
function testRoundTrip(hexColor) {
  const original = new Color(hexColor);

  // Test via Lab
  const viaLab = original.to("lab").to("srgb");
  const labDelta = original.deltaE(viaLab, "2000");

  // Test via OKLCH
  const viaOKLCH = original.to("oklch").to("srgb");
  const oklchDelta = original.deltaE(viaOKLCH, "2000");

  console.log(`Lab round-trip ΔE: ${labDelta.toFixed(4)}`);
  console.log(`OKLCH round-trip ΔE: ${oklchDelta.toFixed(4)}`);

  // Both should be < 1.0 for imperceptible difference
  return { labDelta, oklchDelta };
}

testRoundTrip("#f5e0dc");
```

## Common Pitfalls

### Pitfall 1: Mixing Gamma-Encoded and Linear RGB

**Problem:** Confusing display sRGB (gamma-encoded) with linear RGB.

**Example:**

```javascript
// ❌ WRONG: Averaging gamma-encoded RGB
const mid = [(r1 + r2) / 2, (g1 + g2) / 2, (b1 + b2) / 2];

// ✅ CORRECT: Convert to linear, average, convert back
const linear1 = new Color("srgb", [r1, g1, b1]).to("srgb-linear");
const linear2 = new Color("srgb", [r2, g2, b2]).to("srgb-linear");
const avg = [
  (linear1.r + linear2.r) / 2,
  (linear1.g + linear2.g) / 2,
  (linear1.b + linear2.b) / 2,
];
const result = new Color("srgb-linear", avg).to("srgb");
```

**When to use linear vs gamma-encoded:**

- **Gamma-encoded (sRGB/DisplayP3):** Storage, display, most design work
- **Linear (sRGB-linear-extended):** Blending, compositing, HDR, physical light calculations

### Pitfall 2: Using D65 Lab When Schema Expects D50

**Problem:** Scientific/industrial workflows often use D65 illuminant for Lab.

**Solution:** Convert D65 Lab to D50 before exporting to PaletteJSON.

```python
from coloraide import Color

# Lab with D65 illuminant (scientific context)
lab_d65 = Color("lab-d65", [65.0, 30.5, -18.2])

# Convert to D50 (PaletteJSON requirement)
lab_d50 = lab_d65.convert("lab")  # coloraide defaults to D50

print(lab_d50.coords())  # Slightly different values
```

:::warning Lab Illuminant
Always verify which illuminant your source Lab values use. PaletteJSON requires **D50**. Importing D65 Lab values directly will cause color shifts.
:::

### Pitfall 3: Insufficient Decimal Precision Causing Drift

**Problem:** Using 2-3 decimals for Lab/OKLCH causes perceptual shifts.

**Example:**

```javascript
// Original Lab color
const original = new Color("lab", [65.12345, 30.56789, -18.23456]);

// Exported with insufficient precision
const exported = new Color("lab", [65.12, 30.57, -18.23]);

// Check drift
const deltaE = original.deltaE(exported, "2000");
console.log(`ΔE: ${deltaE.toFixed(4)}`); // Likely > 1.0 (visible)
```

**Solution:** Use 4-5 decimals for Lab/OKLCH. See [Precision & Accuracy guide](./precision-and-accuracy.md).

### Pitfall 4: Simple RGB Clipping Instead of Perceptual Gamut Mapping

**Problem:** Using `Math.min(1, Math.max(0, value))` to bring out-of-gamut colors into range.

**Why it fails:** Causes hue shifts and unnatural desaturation.

**Example:**

```javascript
// Out-of-gamut DisplayP3 color
const p3Color = new Color("p3", [1.2, 0.5, 0.3]);

// ❌ WRONG: Simple clipping
const clipped = new Color("srgb", [
  Math.min(1, 1.2), // Clips to 1.0
  Math.min(1, 0.5),
  Math.min(1, 0.3),
]);

// ✅ CORRECT: Perceptual gamut mapping
const mapped = p3Color.to("srgb").toGamut({
  method: "css",
  space: "oklch",
});

// Compare
console.log(`Clipped hue: ${clipped.to("oklch").h}`); // Hue shifted!
console.log(`Mapped hue: ${mapped.to("oklch").h}`); // Hue preserved
```

See the [Gamut Mapping guide](./gamut-mapping.md) for details.

### Pitfall 5: Inconsistent Alpha Handling

**Problem:** Treating hex alpha and component alpha as equivalent.

**Example:**

```javascript
// Hex alpha (gamma-encoded)
const hexColor = new Color("#ff336680");

// Component alpha (linear)
const componentColor = new Color("srgb", [1.0, 0.2, 0.4, 0.5]);

// These are NOT equivalent!
console.log(hexColor.alpha); // ~0.5 (gamma-decoded from 0x80)
console.log(componentColor.alpha); // 0.5 (linear)
// Actual display will differ slightly
```

**Solution:** Use libraries to handle conversion, or be explicit about alpha encoding.

See [Alpha Channel Encoding](../spec/color.md#alpha-channel-encoding) for details.

## Integration Considerations

### Parsing PaletteJSON Files

**Basic validation:**

```javascript
import Ajv from "ajv";
import addFormats from "ajv-formats";
import schema from "./palettejson.schema.json" assert { type: "json" };

const ajv = new Ajv({ strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

// Load and validate
const data = JSON.parse(fileContents);
if (!validate(data)) {
  console.error("Validation errors:", validate.errors);
}
```

**Extract colors:**

```javascript
import Color from "colorjs.io";

function extractColors(palette) {
  const { colorRepresentation, colors } = palette;

  return colors.map((color) => {
    // Prefer components over hex
    if (color.components) {
      return new Color(colorRepresentation.toLowerCase(), color.components);
    } else if (color.hex) {
      return new Color(color.hex);
    }
  });
}
```

### Exporting to PaletteJSON

**From design tool (e.g., Figma plugin):**

```javascript
async function exportToPaletteJSON(figmaColors) {
  const palette = {
    name: "Design System",
    slug: "design-system",
    type: "categorical",
    colorRepresentation: "sRGB",
    colors: [],
  };

  for (const figmaColor of figmaColors) {
    // Figma uses DisplayP3 internally
    const p3Color = new Color("p3", [figmaColor.r, figmaColor.g, figmaColor.b]);

    // Map to sRGB for compatibility
    const srgbColor = p3Color.to("srgb").toGamut({
      method: "css",
      space: "oklch",
    });

    palette.colors.push({
      id: figmaColor.id,
      name: figmaColor.name,
      hex: srgbColor.toString({ format: "hex" }),
      components: srgbColor.coords.map((c) => parseFloat(c.toFixed(4))),
      altRepresentations: [
        {
          colorRepresentation: "DisplayP3",
          components: p3Color.coords.map((c) => parseFloat(c.toFixed(4))),
        },
      ],
    });
  }

  return { palettes: [palette] };
}
```

### Tool-Specific Considerations

#### Figma

- Uses **DisplayP3** internally
- Export colors via plugin API: `figma.getStyleById(id).paints[0].color`
- Map to sRGB for compatibility (use `altRepresentations` to preserve P3)

#### Sketch

- Uses **sRGB** by default
- Export via Sketch JS API or plugins
- No special conversion needed (already sRGB)

#### Adobe Creative Suite (Photoshop, Illustrator)

- Uses **Adobe RGB** or **sRGB** depending on document color mode
- Export via JSX scripting
- May need Adobe RGB → sRGB conversion

#### CSS Variables / Tailwind Config

```javascript
// Generate CSS variables from PaletteJSON
function generateCSSVars(palette) {
  const vars = palette.colors.map((color) => {
    const cssColor = color.hex || `rgb(${color.components.join(" ")})`;
    return `  --color-${color.id}: ${cssColor};`;
  });

  return `:root {\n${vars.join("\n")}\n}`;
}
```

## Recommended Tools and Workflows

### Color Conversion

**JavaScript:**

```bash
npm install colorjs.io
```

**Python:**

```bash
pip install coloraide
```

**Online:**

- [Color.js Playground](https://colorjs.io/apps/convert/)
- [OKLCH Color Picker](https://oklch.com)

### Validation

**Node.js:**

```bash
npm install ajv ajv-formats
```

**Python:**

```bash
pip install jsonschema
```

See [Quick Start: Validating a file](../quick-start.md#validating-a-file) for examples.

### Design Tool Integration

**Figma:**

- [Figma Plugin API Docs](https://www.figma.com/plugin-docs/)
- Access colors via `figma.getLocalPaintStyles()`

**Sketch:**

- [Sketch JS API](https://developer.sketch.com/reference/api/)
- Use `sketch.getSharedStyles()` or plugins

**Adobe:**

- [ExtendScript Toolkit](https://www.adobe.com/devnet/scripting.html)
- JSX scripting for automation

## Edge Cases and Advanced Topics

### HDR and Wide-Gamut Workflows

For HDR content (Rec. 2020, Dolby Vision):

- Use **sRGB-linear-extended** with unbounded RGB values
- Store HDR metadata externally (PaletteJSON doesn't support HDR metadata yet)
- Consider ACES AP1 for film/VFX workflows (not natively supported; use altRepresentations)

### ICC Profile Handling

PaletteJSON doesn't embed ICC profiles. For workflows requiring embedded profiles:

- Store ICC profile metadata in `notes` field (freeform text)
- Use external `.icc` files referenced by palette `slug` or `id`
- For print workflows, provide Lab (D50) representation (matches ICC PCS)

### Spectral Data

PaletteJSON doesn't support spectral reflectance data. For scientific workflows:

- Store spectral data externally
- Use Lab (D50) as the interchange format
- Reference spectral files in `notes` or custom metadata

## Summary: Integration Checklist

- [ ] Use proper color conversion libraries (never roll your own)
- [ ] Maintain 4-5 decimal precision for Lab/OKLCH
- [ ] Test round-trip accuracy (ΔE < 1.0 for critical colors)
- [ ] Use perceptual gamut mapping (not simple clipping)
- [ ] Convert D65 Lab to D50 if importing from scientific sources
- [ ] Handle alpha encoding correctly (linear in components, gamma in hex)
- [ ] Validate against schema before distribution
- [ ] Preserve wide-gamut originals in `altRepresentations` when mapping to sRGB

:::tip Next Steps

- **Learn about precision:** [Precision & Accuracy guide](./precision-and-accuracy.md)
- **Handle gamut mapping:** [Gamut Mapping guide](./gamut-mapping.md)
- **Choose the right space:** [Choosing Color Spaces guide](./choosing-color-spaces.md)
- **Validation reference:** [Quick Start: Validating a file](../quick-start.md#validating-a-file)
  :::

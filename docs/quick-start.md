---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

This guide shows how to create and validate your first **PaletteJSON** file.

## Minimal file

A minimal valid file contains at least one palette, with a name, slug, type, and two or more colors.

<Tabs>
  <TabItem value="node" label="Bare Minimum" default>

```json
{
  "palettes": [
    {
      "name": "Example",
      "slug": "example",
      "type": "categorical",
      "colors": [{ "hex": "#FFFFFF" }, { "hex": "#000000" }]
    }
  ]
}
```

  </TabItem>
</Tabs>

- **name** — human-readable label for the palette.
- **slug** — URL-safe identifier (lowercase letters, numbers, hyphens).
- **type** — one of `categorical`, `sequential`, `diverging`.
- **colors** — array with **at least two** colors.

:::note color values
Each color can be defined with **`hex`** (`#RRGGBB` or `#RRGGBBAA`) **or** **`components`** (numeric array interpreted by a palette-level `colorSpace`).  
If both are present, consumers should treat **`components`** as authoritative and use `hex` for preview/interoperability.
:::

## File identification

To make your file portable:

- **Extension:** `.palette.json`
- **Encoding:** UTF-8
- **Media type:** `application/prs.palettejson+json` (fall back to `application/json` if needed)
- **Apple UTI (optional):** `org.palettejson.json`.

:::note
These identifiers are recommendations for tooling and do not affect schema validity.
:::

## Validating a file

You can validate PaletteJSON against the official schema (`palettejson.schema.json`), which targets **JSON Schema draft 2020-12**.

<Tabs>
  <TabItem value="node" label="Node.js (AJV v8)" default>

```js
// Install: npm i ajv
import Ajv from "ajv";
import addFormats from "ajv-formats";
import schema from "./palettejson.schema.json" assert { type: "json" };

// Example data
const data = {
  palettes: [
    {
      name: "Example",
      slug: "example",
      type: "categorical",
      colors: [{ hex: "#FFFFFF" }, { hex: "#000000" }],
    },
  ],
};

const ajv = new Ajv({ strict: false }); // strict off if you prefer fewer warnings
addFormats(ajv);

const validate = ajv.compile(schema);
const valid = validate(data);

if (valid) {
  console.log("Valid!");
} else {
  console.error("Validation errors:", validate.errors);
}
```

  </TabItem>

  <TabItem value="python" label="Python (jsonschema)">

```python
# Install: pip install jsonschema
import json
from jsonschema import validate, Draft202012Validator

# Load the schema file (placed next to this script)
with open("palettejson.schema.json", "r", encoding="utf-8") as f:
    schema = json.load(f)

# Example data
data = {
    "palettes": [
        {
            "name": "Example",
            "slug": "example",
            "type": "categorical",
            "colors": [{"hex": "#FFFFFF"}, {"hex": "#000000"}]
        }
    ]
}

# Optional: sanity-check the schema itself
Draft202012Validator.check_schema(schema)

# Validate
validate(instance=data, schema=schema)
print("Valid!")
```

  </TabItem>
</Tabs>

## Validation rules

- If **any** color in a palette uses `components`, the palette **must** declare `colorSpace`.
- If **any** color has a `position`, **all** colors in that palette must have a `position` (1-based).
- `hex` is always interpreted as **display sRGB**; alpha (if present) is the last pair: `#RRGGBBAA`.
- Component ranges depend on `colorSpace`:
  - `sRGB` / `DisplayP3`: 3–4 numbers, each in **[0, 1]**
  - `sRGB-linear-extended`: either 3 numbers (unbounded) **or** 4 with alpha in **[0, 1]**
  - `Lab`: exactly 3 numbers; **L** in **[0, 100]** (a/b unbounded)
  - `OKLCH`: exactly 3 numbers; **L** in **[0, 1]**, **C ≥ 0**, **h ∈ [0, 360)**

---

:::tip Next steps

- Read the [Root object](./spec/root) and [Palette](./spec/palette) specs for required/optional fields.
- See the [Color](./spec/color) page for `hex` vs `components`, `references`, `position`, and legibility metadata.
- Explore [Examples](./examples) for richer use cases.
  :::

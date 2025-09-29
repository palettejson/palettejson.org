---
id: root
title: Root Object
sidebar_label: Root
sidebar_position: 1
description: Defines the PaletteJSON root object and its required properties.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Root Object

Every PaletteJSON file is a single JSON object that follows the schema definition. At the root level, three properties are recognized.

```json
{
  "$schema": "https://palettejson.org/schema/v0.1/palettejson.schema.json",
  "specVersion": "0.1",
  "palettes": [
    /* ... */
  ]
}
```

## Properties

### `$schema` (optional)

- **Type:** string (URI)
- **Purpose:** Points to the schema file used for validation.

Example:

```json
"$schema": "https://palettejson.org/schema/v0.1/palettejson.schema.json"
```

### `specVersion` (optional)

- **Type:** string
- **Pattern:** `^0\.1(\..*)?$`
- **Purpose:** Declares the version of the PaletteJSON spec used in the file.

Example:

```json
"specVersion": "0.1"
```

:::note
If `specVersion` is omitted, consumers should assume the file follows the latest version.
:::

### `palettes` (required)

- **Type:** array
- **Min items:** 1 (each entry must be a valid [Palette](./palette.md) object).
- **Purpose:** Holds one or more palette definitions.

Example with a single palette:

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

## Validation rules

- The root object must **not** contain any properties other than the three listed above.
- At least one palette must be present in the `palettes` array.
- Each palette must conform to the [Palette object](./palette.md).

:::caution Additional properties
Files with extra root-level properties are invalid under v0.1.  
Keep only `$schema`, `specVersion`, and `palettes`.
:::

## Examples

<Tabs>
  <TabItem value="minimal" label="Minimal file" default>
  A single palette with both `$schema` and `specVersion` declared.

```json
{
  "$schema": "https://palettejson.org/schema/v0.1/palettejson.schema.json",
  "specVersion": "0.1",
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
  <TabItem value="schema-implicit" label="Implicit schema">
  Omits `$schema`; consumers should assume the latest spec.

```json
{
  "specVersion": "0.1",
  "palettes": [
    {
      "name": "Brand core",
      "slug": "brand-core",
      "type": "categorical",
      "colors": [
        { "hex": "#1269F2" },
        { "hex": "#0B192E" },
        { "hex": "#F25F29" }
      ]
    }
  ]
}
```

  </TabItem>
  <TabItem value="multi" label="Multiple palettes">
  Demonstrates several palettes in one file, mixing hex and component definitions.

```json
{
  "$schema": "https://palettejson.org/schema/v0.1/palettejson.schema.json",
  "specVersion": "0.1",
  "palettes": [
    {
      "name": "UI categorical",
      "slug": "ui-categorical",
      "type": "categorical",
      "colors": [
        { "hex": "#154785" },
        { "hex": "#0E8F8F" },
        { "hex": "#F2A516" }
      ]
    },
    {
      "name": "Heatmap",
      "slug": "heatmap",
      "type": "sequential",
      "colorRepresentation": "OKLCH",
      "colors": [
        { "components": [0.18, 0.07, 260] },
        { "components": [0.58, 0.13, 120] },
        { "components": [0.86, 0.04, 80] }
      ]
    }
  ]
}
```

  </TabItem>
</Tabs>

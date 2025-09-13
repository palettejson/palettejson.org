---
id: file-format
title: File Format
sidebar_label: File Format
sidebar_position: 1
description: Describes the PaletteJSON file structure and root object.
---

# File Format

Every PaletteJSON file is a single JSON object that follows the schema definition. At the root level, three properties are recognised.

## Root object

```json
{
  "$schema": "https://palettejson.org/schema/v0.1/palettejson.schema.json",
  "specVersion": "0.1",
  "palettes": [
    /* ... */
  ]
}
```

### `$schema` (optional)

- **Type:** string (URI)
- **Purpose:** Points to the schema file used for validation.
- **Example:**
  ```json
  "$schema": "https://palettejson.org/schema/v0.1/palettejson.schema.json"
  ```

### `specVersion` (optional)

- **Type:** string
- **Pattern:** `^0\.1(\..*)?$`
- **Purpose:** Declares the version of the PaletteJSON spec used in the file.
- **Example:**
  ```json
  "specVersion": "0.1"
  ```

:::note
If `specVersion` is omitted, consumers should assume the file follows the latest version.
:::

### `palettes` (required)

- **Type:** array
- **Min items:** 1
- **Items:** each entry must be a valid [Palette](./palette.md) object.
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

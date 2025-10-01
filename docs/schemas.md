---
id: schemas
title: Schema Versions
sidebar_label: Versions
sidebar_position: 99
description: Download and access all versions of the PaletteJSON schema specification.
---

# Schema Versions

This page provides access to all versions of the PaletteJSON schema specification. Each version includes the complete JSON Schema definition that can be used for validation and tooling.

## Current Version

| Version  | Release Date   | Schema File                                                                            | Description                                                    |
| -------- | -------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **v0.1** | September 2025 | [palettejson.schema.json](https://palettejson.org/schema/v0.1/palettejson.schema.json) | Initial release with core palette and color object definitions |

## Using Schema Files

### Direct Download

Click any schema file link above to download or view the JSON Schema definition.

### Programmatic Access

Reference schemas directly in your applications:

```json
{
  "$schema": "https://palettejson.org/schema/v0.1/palettejson.schema.json",
  "specVersion": "0.1",
  "palettes": [
    // your palette data
  ]
}
```

### Latest Version

For always-current schema access, use the `/latest/` path:

```
https://palettejson.org/schema/latest/palettejson.schema.json
```

:::tip Choosing a Version
We recommend using specific version URLs (like `v0.1`) in production applications to ensure schema stability. Use the `/latest/` URL only during development or when you want to automatically adopt new schema features.
:::

## Version History

### v0.1 (September 2025)

- Initial specification release
- Core [root object](./spec/root.md), [palette object](./spec/palette.md), and [color object](./spec/color.md) definitions
- Support for hex colors and color representation components
- Optional accessibility and metadata properties
- [Color representation](./spec/color-representations.md) specifications for RGB, HSL, HSV, CMYK, LAB, and LCH

## Schema Repository

The canonical source for all schema files is maintained in the [palettejson-schema repository](https://github.com/palettejson/palettejson-schema) on GitHub.

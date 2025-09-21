---
id: references
title: References
sidebar_label: References
sidebar_position: 5
description: Explains how colors can reference external systems such as Pantone, RAL, or NCS within the PaletteJSON schema.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# References

A color may include a `references` array to link it to external systems such as Pantone or RAL.  
This makes it possible to align PaletteJSON data with widely used color standards.

:::caution Copyright notice
External systems such as **Pantone**, **RAL**, and **NCS** are proprietary.  
Because of copyright and licensing restrictions, documentation cannot show **both** real color values _and_ real reference codes together.

In this guide, examples either:

- use **invented or invalid color values** with real-looking codes, or
- use **realistic color values** with placeholder codes.

This ensures PaletteJSON remains open without infringing on third-party rights.
:::

## Properties

Each entry in `references` is an object with the following properties:

### `system` (required)

- **Type:** string
- **Allowed values:** `pantone`, `ral`, `ncs`, `other`
- **Purpose:** Identifies which external reference catalogue the code belongs to.

### `code` (required)

- **Type:** string
- **Purpose:** Identifier in the external system.

### `library` (optional)

- **Type:** string
- **Purpose:** Specific catalogue/edition within the system (e.g. “Solid Coated”).

### `collection` (optional)

- **Type:** string
- **Purpose:** Higher-level family or marketing bundle (e.g. “RAL Classic”).

### `note` (optional)

- **Type:** string
- **Purpose:** Free text, useful for clarifications.

## Examples

<Tabs>
<TabItem value="pantone" label="Pantone">

```json
{
  "id": "brand-blue",
  "hex": "#XXXXXX",
  "references": [
    {
      "system": "pantone",
      "code": "2728 C",
      "library": "Solid Coated"
    }
  ]
}
```

</TabItem>
<TabItem value="ral" label="RAL">

```json
{
  "id": "signal-red",
  "hex": "#XXXXXX",
  "references": [
    {
      "system": "ral",
      "code": "3020",
      "collection": "RAL Classic"
    }
  ]
}
```

</TabItem>
<TabItem value="ncs" label="NCS">

```json
{
  "id": "ncs-sample",
  "hex": "#XXXXXX",
  "references": [
    {
      "system": "ncs",
      "code": "S 4030-Y30R"
    }
  ]
}
```

</TabItem>
<TabItem value="other" label="Other system">

```json
{
  "id": "legacy-code",
  "hex": "#00AACC",
  "references": [
    {
      "system": "other",
      "code": "Brand123",
      "note": "Internal brand color identifier"
    }
  ]
}
```

</TabItem>
</Tabs>

---

## Usage guidance

- Provide references only when you have an authoritative mapping.
- Stick to one reference per system for clarity.
- Use `note` to record uncertainties or special cases.

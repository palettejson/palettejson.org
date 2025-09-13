---
id: references
title: References
sidebar_label: References
sidebar_position: 5
description: Explains how colours can reference external systems such as Pantone, RAL, or NCS within the PaletteJSON schema.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# References

A colour may include a `references` array to link it to external systems such as Pantone or RAL.  
This makes it possible to align PaletteJSON data with widely used colour standards.

:::caution Copyright notice
External systems such as **Pantone**, **RAL**, and **NCS** are proprietary.  
Because of copyright and licensing restrictions, documentation cannot show **both** real colour values _and_ real reference codes together.

In this guide, examples either:

- use **invented colour values** with real-looking codes, or
- use **realistic colour values** with placeholder codes.

This ensures PaletteJSON remains open without infringing on third-party rights.
:::

## Structure

Each entry in `references` is an object with the following properties:

- **`system`** — string _(required)_  
  Must be one of:

  - `pantone`
  - `ral`
  - `ncs`
  - `other`

- **`code`** — string _(required)_  
  Identifier in the external system.

- **`library`** — string _(optional)_  
  Collection or subset within the system (e.g. “Solid Coated”).

- **`collection`** — string _(optional)_  
  Broader grouping (e.g. “RAL Classic”).

- **`note`** — string _(optional)_  
  Free text, useful for clarifications.

:::note
The schema enforces only `system` and `code`.  
The other fields are optional, for descriptive or organisational purposes.
:::

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
      "note": "Internal brand colour identifier"
    }
  ]
}
```

</TabItem>
</Tabs>

---

## Best practices

- Provide references only when you have an authoritative mapping.
- Stick to one reference per system for clarity.
- Use `note` to record uncertainties or special cases.

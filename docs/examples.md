---
id: examples
title: Examples
sidebar_label: Examples
sidebar_position: 4
description: Sample PaletteJSON files demonstrating real-world palettes from Apple and Microsoft.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Examples

This section provides full PaletteJSON files that illustrate the schema in practice.

<Tabs>
  <TabItem value="apple" label="Apple Crayons">
  Demonstrates named colors with hex values only.

```json
{
  "palettes": [
    {
      "name": "Apple Crayons",
      "slug": "apple-crayons",
      "type": "categorical",
      "description": "A collection of specific hues available on macOS and iOS, originally named for the feel of old crayons",
      "author": {
        "name": "Apple Corporation",
        "url": "https://apple.com"
      },
      "colors": [
        { "name": "Licorice", "hex": "#000000" },
        { "name": "Lead", "hex": "#212121" },
        { "name": "Tungsten", "hex": "#424242" },
        { "name": "Iron", "hex": "#5E5E5E" },
        { "name": "Steel", "hex": "#797979" },
        { "name": "Tin", "hex": "#919191" },
        { "name": "Nickel", "hex": "#929292" },
        { "name": "Aluminium", "hex": "#A9A9A9" },
        { "name": "Magnesium", "hex": "#C0C0C0" },
        { "name": "Silver", "hex": "#D6D6D6" },
        { "name": "Mercury", "hex": "#EBEBEB" },
        { "name": "Snow", "hex": "#FFFFFF" },
        { "name": "Cayenne", "hex": "#941100" },
        { "name": "Mocha", "hex": "#945200" },
        { "name": "Asparagus", "hex": "#929000" },
        { "name": "Fern", "hex": "#4F8F00" },
        { "name": "Clover", "hex": "#008F00" },
        { "name": "Moss", "hex": "#009051" },
        { "name": "Teal", "hex": "#009193" },
        { "name": "Ocean", "hex": "#005493" },
        { "name": "Midnight", "hex": "#011993" },
        { "name": "Eggplant", "hex": "#531B93" },
        { "name": "Plum", "hex": "#942193" },
        { "name": "Maroon", "hex": "#941751" },
        { "name": "Maraschino", "hex": "#FF2600" },
        { "name": "Tangerine", "hex": "#FF9300" },
        { "name": "Lemon", "hex": "#FFFB00" },
        { "name": "Lime", "hex": "#8EFA00" },
        { "name": "Spring", "hex": "#00F900" },
        { "name": "Sea Foam", "hex": "#00FA92" },
        { "name": "Turquoise", "hex": "#00FDFF" },
        { "name": "Aqua", "hex": "#0096FF" },
        { "name": "Blueberry", "hex": "#0433FF" },
        { "name": "Grape", "hex": "#9437FF" },
        { "name": "Magenta", "hex": "#FF40FF" },
        { "name": "Strawberry", "hex": "#FF2F92" },
        { "name": "Salmon", "hex": "#FF7E79" },
        { "name": "Cantaloupe", "hex": "#FFD479" },
        { "name": "Banana", "hex": "#FFFC79" },
        { "name": "Honeydew", "hex": "#D4FB79" },
        { "name": "Flora", "hex": "#73FA79" },
        { "name": "Spindrift", "hex": "#73FCD6" },
        { "name": "Ice", "hex": "#73FDFF" },
        { "name": "Sky", "hex": "#76D6FF" },
        { "name": "Orchid", "hex": "#7A81FF" },
        { "name": "Lavender", "hex": "#D783FF" },
        { "name": "Bubblegum", "hex": "#FF85FF" },
        { "name": "Carnation", "hex": "#FF8AD8" }
      ]
    }
  ]
}
```

  </TabItem>

  <TabItem value="microsoft" label="Microsoft Office">
  Multiple palettes in a single file, each with a description and author metadata.
  Only three palettes included for brevity.

```json
{
  "palettes": [
    {
      "name": "Office 2024",
      "slug": "mso24",
      "type": "categorical",
      "description": "Default Microsoft Office 2024 color theme",
      "author": {
        "name": "Microsoft Corporation",
        "url": "https://microsoft.com"
      },
      "colors": [
        { "hex": "#0D2841" },
        { "hex": "#E8E8E8" },
        { "hex": "#156082" },
        { "hex": "#E97030" },
        { "hex": "#176B25" },
        { "hex": "#0C9FD5" },
        { "hex": "#A02C92" },
        { "hex": "#4DA72D" }
      ]
    },
    {
      "name": "Office 2013",
      "slug": "mso13",
      "type": "categorical",
      "description": "Default Microsoft Office 2013 color theme",
      "author": {
        "name": "Microsoft Corporation",
        "url": "https://microsoft.com"
      },
      "colors": [
        { "hex": "#43536A" },
        { "hex": "#E7E6E6" },
        { "hex": "#4572C4" },
        { "hex": "#EE7D30" },
        { "hex": "#A5A5A5" },
        { "hex": "#FFC000" },
        { "hex": "#5B9CD5" },
        { "hex": "#71AD47" }
      ]
    },
    {
      "name": "Office 2007",
      "slug": "mso07",
      "type": "categorical",
      "description": "Default Microsoft Office 2007 color theme",
      "author": {
        "name": "Microsoft Corporation",
        "url": "https://microsoft.com"
      },
      "colors": [
        { "hex": "#1D497D" },
        { "hex": "#EEECE1" },
        { "hex": "#4E81BE" },
        { "hex": "#BF504D" },
        { "hex": "#9BBB59" },
        { "hex": "#8064A2" },
        { "hex": "#4AACC6" },
        { "hex": "#F79644" }
      ]
    }
  ]
}
```

  </TabItem>

  <TabItem value="catppuccin" label="Cattpuccin">
  Demonstrates a rich palette with IDs, metadata, and both hex and component values for each color.
  Only one palette included for brevity.

```json
{
  "$schema": "https://palettejson.org/schema/v0.1/palettejson.schema.json",
  "specVersion": "0.1",
  "palettes": [
    {
      "name": "Catppuccin Mocha",
      "slug": "catppuccin-mocha",
      "type": "categorical",
      "author": { "name": "Catppuccin", "url": "https://catppuccin.com/" },
      "license": "MIT",
      "tags": ["catppuccin", "mocha", "theme", "ui"],
      "colorSpace": "sRGB",
      "colors": [
        {
          "id": "rosewater",
          "name": "Rosewater",
          "hex": "#f5e0dc",
          "components": [0.961, 0.878, 0.863]
        },
        {
          "id": "flamingo",
          "name": "Flamingo",
          "hex": "#f2cdcd",
          "components": [0.949, 0.804, 0.804]
        },
        {
          "id": "pink",
          "name": "Pink",
          "hex": "#f5c2e7",
          "components": [0.961, 0.761, 0.906]
        },
        {
          "id": "mauve",
          "name": "Mauve",
          "hex": "#cba6f7",
          "components": [0.796, 0.651, 0.969]
        },
        {
          "id": "red",
          "name": "Red",
          "hex": "#f38ba8",
          "components": [0.953, 0.545, 0.659]
        },
        {
          "id": "maroon",
          "name": "Maroon",
          "hex": "#eba0ac",
          "components": [0.922, 0.627, 0.675]
        },
        {
          "id": "peach",
          "name": "Peach",
          "hex": "#fab387",
          "components": [0.98, 0.702, 0.529]
        },
        {
          "id": "yellow",
          "name": "Yellow",
          "hex": "#f9e2af",
          "components": [0.976, 0.886, 0.686]
        },
        {
          "id": "green",
          "name": "Green",
          "hex": "#a6e3a1",
          "components": [0.651, 0.89, 0.631]
        },
        {
          "id": "teal",
          "name": "Teal",
          "hex": "#94e2d5",
          "components": [0.58, 0.886, 0.835]
        },
        {
          "id": "sky",
          "name": "Sky",
          "hex": "#89dceb",
          "components": [0.537, 0.863, 0.922]
        },
        {
          "id": "sapphire",
          "name": "Sapphire",
          "hex": "#74c7ec",
          "components": [0.455, 0.78, 0.925]
        },
        {
          "id": "blue",
          "name": "Blue",
          "hex": "#89b4fa",
          "components": [0.537, 0.706, 0.98]
        },
        {
          "id": "lavender",
          "name": "Lavender",
          "hex": "#b4befe",
          "components": [0.706, 0.745, 0.996]
        },
        {
          "id": "text",
          "name": "Text",
          "hex": "#cdd6f4",
          "components": [0.804, 0.839, 0.957]
        },
        {
          "id": "subtext1",
          "name": "Subtext 1",
          "hex": "#bac2de",
          "components": [0.729, 0.761, 0.871]
        },
        {
          "id": "subtext0",
          "name": "Subtext 0",
          "hex": "#a6adc8",
          "components": [0.651, 0.678, 0.784]
        },
        {
          "id": "overlay2",
          "name": "Overlay 2",
          "hex": "#9399b2",
          "components": [0.576, 0.6, 0.698]
        },
        {
          "id": "overlay1",
          "name": "Overlay 1",
          "hex": "#7f849c",
          "components": [0.498, 0.518, 0.612]
        },
        {
          "id": "overlay0",
          "name": "Overlay 0",
          "hex": "#6c7086",
          "components": [0.424, 0.439, 0.525]
        },
        {
          "id": "surface2",
          "name": "Surface 2",
          "hex": "#585b70",
          "components": [0.345, 0.357, 0.439]
        },
        {
          "id": "surface1",
          "name": "Surface 1",
          "hex": "#45475a",
          "components": [0.271, 0.278, 0.353]
        },
        {
          "id": "surface0",
          "name": "Surface 0",
          "hex": "#313244",
          "components": [0.192, 0.196, 0.267]
        },
        {
          "id": "base",
          "name": "Base",
          "hex": "#1e1e2e",
          "components": [0.118, 0.118, 0.18]
        },
        {
          "id": "mantle",
          "name": "Mantle",
          "hex": "#181825",
          "components": [0.094, 0.094, 0.145]
        },
        {
          "id": "crust",
          "name": "Crust",
          "hex": "#11111b",
          "components": [0.067, 0.067, 0.106]
        }
      ]
    }
  ]
}
```

 </TabItem>
</Tabs>

---

Next: return to the [Specification](./category/specification/) or explore other parts of the docs.

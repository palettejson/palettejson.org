---
id: examples
title: Examples
sidebar_label: Examples
sidebar_position: 5
description: Sample PaletteJSON files demonstrating real-world palettes from Apple and Microsoft.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Examples

This section provides full PaletteJSON files that illustrate the schema in practice. More examples can be found in the paletteJSON schema repository ([link](https://github.com/palettejson/palettejson-schema/tree/main/examples)).

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
  Only three palettes included for brevity. Full example can be found in the paletteJSON schema repository.

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
  Only one palette included for brevity. Full example can be found in the paletteJSON schema repository.

```json
{
  "$schema": "https://palettejson.org/schema/v0.1/palettejson.schema.json",
  "specVersion": "0.1",
  "palettes": [
    {
      "name": "Catppuccin Mocha",
      "slug": "catppuccin-mocha",
      "type": "categorical",
      "author": {
        "name": "Catppuccin",
        "url": "https://catppuccin.com/"
      },
      "license": "MIT",
      "tags": ["catppuccin", "mocha", "theme", "ui"],
      "colorRepresentation": "HSL",
      "colors": [
        {
          "id": "rosewater",
          "name": "Rosewater",
          "hex": "#f5e0dc",
          "components": [10, 0.56, 0.91],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.9608, 0.8784, 0.8627]
            }
          ]
        },
        {
          "id": "flamingo",
          "name": "Flamingo",
          "hex": "#f2cdcd",
          "components": [0, 0.59, 0.88],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.949, 0.8039, 0.8039]
            }
          ]
        },
        {
          "id": "pink",
          "name": "Pink",
          "hex": "#f5c2e7",
          "components": [316, 0.72, 0.86],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.9608, 0.7608, 0.9059]
            }
          ]
        },
        {
          "id": "mauve",
          "name": "Mauve",
          "hex": "#cba6f7",
          "components": [267, 0.84, 0.81],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.7961, 0.651, 0.9686]
            }
          ]
        },
        {
          "id": "red",
          "name": "Red",
          "hex": "#f38ba8",
          "components": [343, 0.81, 0.75],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.9529, 0.5451, 0.6588]
            }
          ]
        },
        {
          "id": "maroon",
          "name": "Maroon",
          "hex": "#eba0ac",
          "components": [350, 0.65, 0.79],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.9216, 0.6275, 0.6745]
            }
          ]
        },
        {
          "id": "peach",
          "name": "Peach",
          "hex": "#fab387",
          "components": [23, 0.92, 0.75],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.9804, 0.702, 0.5294]
            }
          ]
        },
        {
          "id": "yellow",
          "name": "Yellow",
          "hex": "#f9e2af",
          "components": [41, 0.86, 0.83],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.9765, 0.8863, 0.6863]
            }
          ]
        },
        {
          "id": "green",
          "name": "Green",
          "hex": "#a6e3a1",
          "components": [115, 0.54, 0.76],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.651, 0.8902, 0.6314]
            }
          ]
        },
        {
          "id": "teal",
          "name": "Teal",
          "hex": "#94e2d5",
          "components": [170, 0.57, 0.73],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.5804, 0.8863, 0.8353]
            }
          ]
        },
        {
          "id": "sky",
          "name": "Sky",
          "hex": "#89dceb",
          "components": [189, 0.71, 0.73],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.5373, 0.8627, 0.9216]
            }
          ]
        },
        {
          "id": "sapphire",
          "name": "Sapphire",
          "hex": "#74c7ec",
          "components": [199, 0.76, 0.69],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.4549, 0.7804, 0.9255]
            }
          ]
        },
        {
          "id": "blue",
          "name": "Blue",
          "hex": "#89b4fa",
          "components": [217, 0.92, 0.76],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.5373, 0.7059, 0.9804]
            }
          ]
        },
        {
          "id": "lavender",
          "name": "Lavender",
          "hex": "#b4befe",
          "components": [232, 0.97, 0.85],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.7059, 0.7451, 0.9961]
            }
          ]
        },
        {
          "id": "text",
          "name": "Text",
          "hex": "#cdd6f4",
          "components": [226, 0.64, 0.88],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.8039, 0.8392, 0.9569]
            }
          ]
        },
        {
          "id": "subtext1",
          "name": "Subtext 1",
          "hex": "#bac2de",
          "components": [227, 0.35, 0.82],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.7294, 0.7608, 0.8706]
            }
          ]
        },
        {
          "id": "subtext0",
          "name": "Subtext 0",
          "hex": "#a6adc8",
          "components": [228, 0.24, 0.72],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.651, 0.6784, 0.7843]
            }
          ]
        },
        {
          "id": "overlay2",
          "name": "Overlay 2",
          "hex": "#9399b2",
          "components": [228, 0.17, 0.64],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.5765, 0.6, 0.698]
            }
          ]
        },
        {
          "id": "overlay1",
          "name": "Overlay 1",
          "hex": "#7f849c",
          "components": [230, 0.13, 0.55],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.498, 0.5176, 0.6118]
            }
          ]
        },
        {
          "id": "overlay0",
          "name": "Overlay 0",
          "hex": "#6c7086",
          "components": [231, 0.11, 0.47],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.4235, 0.4392, 0.5255]
            }
          ]
        },
        {
          "id": "surface2",
          "name": "Surface 2",
          "hex": "#585b70",
          "components": [233, 0.12, 0.39],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.3451, 0.3569, 0.4392]
            }
          ]
        },
        {
          "id": "surface1",
          "name": "Surface 1",
          "hex": "#45475a",
          "components": [234, 0.13, 0.31],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.2706, 0.2784, 0.3529]
            }
          ]
        },
        {
          "id": "surface0",
          "name": "Surface 0",
          "hex": "#313244",
          "components": [237, 0.16, 0.23],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.1922, 0.1961, 0.2667]
            }
          ]
        },
        {
          "id": "base",
          "name": "Base",
          "hex": "#1e1e2e",
          "components": [240, 0.21, 0.15],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.1176, 0.1176, 0.1804]
            }
          ]
        },
        {
          "id": "mantle",
          "name": "Mantle",
          "hex": "#181825",
          "components": [240, 0.21, 0.1],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.0941, 0.0941, 0.1451]
            }
          ]
        },
        {
          "id": "crust",
          "name": "Crust",
          "hex": "#11111b",
          "components": [240, 0.23, 0.09],
          "altRepresentations": [
            {
              "colorRepresentation": "sRGB",
              "components": [0.0667, 0.0667, 0.1059]
            }
          ]
        }
      ]
    }
  ]
}
```

 </TabItem>

  <TabItem value="alpha" label="With Alpha Channels">
  Demonstrates transparency using the 4th component in multiple color spaces.

```json
{
  "$schema": "https://palettejson.org/schema/v0.1/palettejson.schema.json",
  "specVersion": "0.1",
  "palettes": [
    {
      "name": "Translucent UI",
      "slug": "translucent-ui",
      "type": "categorical",
      "description": "Glass morphism design system with translucent surfaces",
      "colorRepresentation": "sRGB",
      "colors": [
        {
          "id": "glass-light",
          "name": "Glass Light",
          "hex": "#FFFFFFCC",
          "components": [1.0, 1.0, 1.0, 0.8]
        },
        {
          "id": "glass-dark",
          "name": "Glass Dark",
          "hex": "#00000080",
          "components": [0.0, 0.0, 0.0, 0.5],
          "altRepresentations": [
            {
              "colorRepresentation": "OKLCH",
              "components": [0.0, 0.0, 0.0, 0.5]
            }
          ]
        },
        {
          "id": "accent-translucent",
          "name": "Accent Translucent",
          "hex": "#3B82F699",
          "components": [0.2314, 0.5098, 0.9647, 0.6],
          "altRepresentations": [
            {
              "colorRepresentation": "Lab",
              "components": [51.2345, 25.6789, -65.4321, 0.6]
            }
          ]
        },
        {
          "id": "overlay",
          "name": "Overlay",
          "hex": "#1E293B4D",
          "components": [0.1176, 0.1608, 0.2314, 0.3]
        }
      ]
    }
  ]
}
```

  </TabItem>
</Tabs>

Next: return to the [Specification](./category/specification/) or explore other parts of the docs.

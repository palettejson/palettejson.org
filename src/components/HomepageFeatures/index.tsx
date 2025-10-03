import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* Two-column layout */}
        <div className="row">
          {/* Left column */}
          <div className="col col--6">
            <h2>What is PaletteJSON?</h2>
            <p>
              PaletteJSON is an open schema for defining color palettes in a
              structured, machine-readable way. Its goal is to make palettes
              easy to store, exchange, and extend across different tools and
              workflows.
            </p>
          </div>

          {/* Right column */}
          <div className="col col--6">
            <h2>Design Goals</h2>
            <ul>
              <li>
                💡 <strong>Clarity</strong>: palettes are just JSON.
              </li>
              <li>
                📦 <strong>Extensibility</strong>: metadata, references,
                multiple color spaces.
              </li>
              <li>
                🔗 <strong>Interoperability</strong>:a bridgeable “hub” format
                for palettes, designed as a lingua franca for color.
              </li>
            </ul>
          </div>
        </div>

        {/* Full-width row */}
        <div className="row">
          <div className="col col--12">
            <h2>Examples</h2>

            <Tabs>
              <TabItem value="simple" label="Simple" default>
                <p>A palette can be as simple as two or more HEX values.</p>
                <CodeBlock language="json">{`{
  "palettes": [
    {
      "name": "Cool Tones",
      "type": "categorical",
      "colors": [
        { "hex": "#1F77B4" },
        { "hex": "#17BECF" },
        { "hex": "#AEC7E8" }
      ]
    }
  ]
}`}</CodeBlock>
              </TabItem>

              <TabItem value="complex" label="Complex">
                <p>
                  A palette can be comprehensive: multiple color
                  representations, accessibility testing, legibility metrics,
                  and external color references.
                </p>
                <CodeBlock language="json">{`{
 "palettes": [
      {
        "name": "Accessible Brand Core",
        "slug": "accessible-brand-core",
        "type": "categorical",
        "description": "Core brand palette tested for accessibility across CVD conditions",
        "version": "2.1.0",
        "author": {
          "name": "Design Systems Team",
          "url": "https://example.design"
        },
        "license": "Apache-2.0",
        "tags": ["brand", "ui", "accessible", "wcag-aa"],
        "colorRepresentation": "OKLCH",
        "accessibility": {
          "cvdTestedFor": ["protanopia", "deuteranopia", "tritanopia"],
          "cvdMaxDistinctClasses": {
            "overall": 4,
            "protanopia": 3,
            "deuteranopia": 3
          },
          "tools": ["Sim Daltonism", "Coblis"],
          "notes": "All colors meet WCAG 2.1 AA contrast requirements."
        },
        "colors": [
          {
            "id": "primary-light",
            "name": "Primary Blue Light",
            "hex": "#4D94DB",
            "components": [0.6420, 0.1368, 255.8297],
            "position": 1,
            "groupId": "primary-family",
            "notes": "Lighter variant for hover states."
          },
          {
            "id": "primary",
            "name": "Primary Blue",
            "hex": "#0066CC",
            "components": [0.5220, 0.1771, 255.8297],
            "altRepresentations": [
              {
                "colorRepresentation": "Lab",
                "components": [43.0415, 6.7780, -60.8838]
              },
              {
                "colorRepresentation": "sRGB",
                "components": [0.0000, 0.4000, 0.8000]
              }
            ],
            "references": [
              {
                "system": "pantone",
                "code": "PLACEHOLDER-P",
                "library": "Solid Coated",
                "note": "Closest match for screen-to-print"
              }
            ],
            "position": 2,
            "groupId": "primary-family",
            "referenceInGroup": true,
            "notes": "Core interactive element color.",
            "legibility": {
              "luminance": 0.1386,
              "contrastVsWhite": 5.57,
              "contrastVsBlack": 3.77,
              "preferredText": "light"
            }
          },
          {
            "id": "primary-dark",
            "name": "Primary Blue Dark",
            "hex": "#004C99",
            "components": [0.3990, 0.1340, 255.8297],
            "position": 3,
            "groupId": "primary-family",
            "notes": "Darker variant for active states."
          },
          {
            "id": "accent",
            "name": "Accent Coral",
            "hex": "#FF6B4A",
            "components": [0.7066, 0.1875, 34.0776],
            "altRepresentations": [
              {
                "colorRepresentation": "Lab",
                "components": [64.3263, 56.1317, 47.7416]
              }
            ],
            "position": 4,
            "legibility": {
              "luminance": 0.3202,
              "contrastVsWhite": 2.82,
              "preferredText": "dark"
            }
          },
          {
            "id": "success",
            "name": "Success Green",
            "hex": "#00A676",
            "components": [0.6240, 0.1020, 164.0161],
            "position": 5
          }
        ]
      }
    ]
}`}</CodeBlock>
              </TabItem>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

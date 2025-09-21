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
                <CodeBlock language="json">{`{
  "palettes": [
    {
      "name": "Sunset Gradient",
      "slug": "sunset-gradient",
      "type": "sequential",
      "colors": [
        {
          "hex": "#003f5c",
          "position": 0,
          "references": { "pantone": { "code": "YYZ-2112 Not a Real Pantone Code" } }
        },
        { "hex": "#58508d", "position": 1 },
        { "hex": "#bc5090", "position": 2 },
        { "hex": "#ff6361", "position": 3 },
        { "hex": "#ffa600", "position": 4 }
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

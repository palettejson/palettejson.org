import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "PaletteJSON",
  tagline: "Colors, structured.",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://palettejson.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "PaletteJSON", // Usually your GitHub org/user name.
  projectName: "PaletteJSON Schema", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US"],
    localeConfigs: {
      "en-US": {
        htmlLang: "en-US",
      },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/palettejson/palettejson.org/blob/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Use project's social card, not the docsite one
    image: "img/palettejson_social.png",
    metadata: [
      {
        name: "keywords",
        content:
          "PaletteJSON, color palettes, JSON schema, design systems, color management, interoperability, open standard",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "algolia-site-verification", content: "2F7228F03C7CA83E" },
    ],

    algolia: {
      // The application ID provided by Algolia
      appId: "5X2IZ9DOOB",

      // Public API key: it is safe to commit it
      apiKey: "c7f0bbc7352d8e74cd962eb8b201a4e1",

      indexName: "palettejson",
    },

    navbar: {
      title: "PaletteJSON",
      logo: {
        alt: "PaletteJSON: Colors, structured.",
        src: "img/logo192px.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://palettejson.org/schema/latest/palettejson.schema.json",
          label: "Latest Schema",
          position: "left",
        },
        {
          href: "https://github.com/palettejson/palettejson-schema",
          label: "Schema GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "/docs/intro",
            },
            {
              label: "Quick Start",
              to: "/docs/quick-start",
            },
          ],
        },
        {
          title: "PaletteJSON.org",
          items: [
            {
              label: "Github Profile",
              href: "https://github.com/palettejson/",
            },
            {
              label: "Watch this space!",
              href: "https://github.com/palettejson/",
            },
          ],
        },
        {
          title: "The Author",
          items: [
            {
              label: "pedroinnecco.com",
              href: "https://pedroinnecco.com",
            },
            {
              label: "GitHub",
              href: "https://github.com/pmdci/",
            },
          ],
        },
      ],
      copyright: `<div class="footer-left"><br/>
  Copyright © ${new Date().getFullYear()} PaletteJSON.org (Pedro Innecco and contributors).<br/>
  Licensed under the Apache License, Version 2.0. | Built with Docusaurus.
  </div>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

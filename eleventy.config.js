import {
  EleventyHtmlBasePlugin,
  IdAttributePlugin,
  InputPathToUrlTransformPlugin,
} from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import Shiki from "@shikijs/markdown-it";
import site from "./src/_data/site.json" with { type: "json" };

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "notes",
      limit: 0,
      sort: "descending",
    },
    metadata: {
      language: "en",
      title: `${site.title} - Notes`,
      subtitle: site.description,
      base: `${site.url}/`,
      author: {
        name: site.author,
      },
    },
  });

  // Exclude draft pages from production builds (still visible during dev/serve)
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  const shikiPlugin = await Shiki({
    themes: {
      light: "catppuccin-latte",
      dark: "tokyo-night",
    },
    defaultColor: "light-dark()",
    colorsRendering: "none",
  });
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.use(shikiPlugin);
  });

  // Passthrough copy root static files and assets
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ ".nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // Collection: notes sorted reverse-chronologically by date
  eleventyConfig.addCollection("notes", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/notes/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Date formatting filters (UTC so dates don't shift by timezone)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return d.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return d.toISOString().slice(0, 10);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}

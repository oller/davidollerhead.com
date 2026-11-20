import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import rssPlugin from "@11ty/eleventy-plugin-rss";
import Shiki from "@shikijs/markdown-it";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(rssPlugin);

  const shikiPlugin = await Shiki({
    themes: {
      light: "github-light",
      dark: "tokyo-night",
    },
  });
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.use(shikiPlugin);

    // Wrap Markdown tables in a scrollable region and add scope="col" to headers
    const render = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
    mdLib.renderer.rules.table_open = (...args) =>
      `<div class="table-wrapper" tabindex="0" role="region" aria-label="Table">${render(...args)}`;
    mdLib.renderer.rules.table_close = (...args) => `${render(...args)}</div>`;
    mdLib.renderer.rules.th_open = (tokens, idx, ...rest) => {
      tokens[idx].attrSet("scope", "col");
      return render(tokens, idx, ...rest);
    };
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

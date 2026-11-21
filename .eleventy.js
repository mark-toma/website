import featherIcons from 'feather-icons';

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  
  eleventyConfig.addFilter("icon", (iconName, options = {}) => {
    const svg = featherIcons.icons[iconName];
    if (!svg) {
      console.warn(`Icon "${iconName}" not found in Feather Icons`);
      return '';
    }
    return svg.toSvg(options);
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};

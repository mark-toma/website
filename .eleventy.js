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

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split('T')[0];
  });

  eleventyConfig.addFilter("url", (path, basePath = "/") => {
    if (!path) return path;
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:")) {
      return path;
    }
    if (basePath === "/") {
      return path;
    }
    return basePath.replace(/\/$/, "") + (path.startsWith("/") ? path : "/" + path);
  });

  eleventyConfig.addCollection("blog", (collection) => {
    const blog = collection
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => b.date - a.date);
    
    // Add previous and next references to each post
    for (let i = 0; i < blog.length; i++) {
      blog[i].data.previousPost = blog[i + 1] || null;
      blog[i].data.nextPost = blog[i - 1] || null;
    }
    
    return blog;
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

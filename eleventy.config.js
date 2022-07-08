module.exports = function (eleventyConfig) {
  eleventyConfig.dataFilterSelectors.add('page')

  return {
    dir: {
      input: 'src'
    }
  }
}
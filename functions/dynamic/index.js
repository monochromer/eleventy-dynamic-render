const { EleventyServerless } = require('@11ty/eleventy')

async function handler(event) {
  const eleventy = new EleventyServerless('dynamic', {
    path: event.path,
    query: event.queryStringParameters,
  })

  try {
    // If you want some of the data cascade available in `page.data`, use `eleventyConfig.dataFilterSelectors`.
    // Read more: https://www.11ty.dev/docs/config/#data-filter-selectors
    const [page] = await eleventy.getOutput()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html, charset=UTF-8',
      },
      body: page.content,
    }
  } catch (error) {
    // Only console log for matching serverless paths
    // (otherwise you’ll see a bunch of BrowserSync 404s for non-dynamic URLs during --serve)
    if (eleventy.isServerlessUrl(event.path)) {
      console.log('Serverless Error:', error)
    }

    return {
      statusCode: error.httpStatusCode || 500,
      body: JSON.stringify(
        {
          error: error.message,
        },
        null,
        2
      ),
    }
  }
}

exports.handler = handler

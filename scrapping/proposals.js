const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const _ = require('lodash')

const url = 'https://sansfiltre.les150.fr/'
const file = 'src/data/proposals.json'

const main = async () => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    const proposals = []
    const promises = []

    $('.measures-col article.measure-wrapper').each(async function () {
      const title = $(this).find('.measure-title').text()
      const color = $(this).find('.measure-title').css('background-color')
      const link = $(this).find('.measure-content .measure-meta a').attr('href')

      promises.push(axios.get(link))

      proposals.push({
        title,
        color,
        link
      })
    })

    axios.all(promises).then(axios.spread((...responses) => {
      _.each(responses, response => {
        const link = response.config.url
        const $2 = cheerio.load(response.data)
        const section = $2('section.elementor-top-section.elementor-section-boxed.elementor-section-height-default section .jet-listing-dynamic-field__content')
        const thematic = $2(section[0]).text()
        const goal = $2(section[1]).text()
        const proposal = _.find(proposals, { link })
        proposal.thematic = thematic
        proposal.goal = goal
      })

      const data = JSON.stringify(proposals, null, 2)
      fs.writeFileSync(file, data)
    }))
  } catch (err) {
    console.log(err)
  }
}

main ()

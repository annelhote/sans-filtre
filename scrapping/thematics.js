const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')

const url = 'https://www.franceinter.fr/environnement/les-150-propositions-de-la-convention-citoyenne-sur-le-climat';
const file = 'src/data/thematics.json'

axios(url)
  .then(async response => {
    const html = response.data
    const $ = cheerio.load(html)
    const children = $('.content-body').children()
    let thematic = ''
    let goal = ''
    const thematics = []

    children.each(function (_, child) {
      switch (child.name) {
        case 'h2':
          thematic = $(child).text()
          break
        case 'p':
          goal = $(child).text()
          break
        case 'ul':
          $(child).find('li').each(function (_, li) {
            const title = $(li).text()
            thematics.push({ thematic, goal, title })
          })
      }
    })

    const data = JSON.stringify(thematics, null, 2);
    fs.writeFileSync(file, data);
  })
  .catch(console.error);

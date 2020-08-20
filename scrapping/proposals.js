const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')

const url = 'https://sansfiltre.les150.fr/';
const file = 'src/data/proposals.json'

axios(url)
  .then(async response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const dataTable = $('.measures-col article.measure-wrapper');
    const measures = [];

    await dataTable.each(async function () {
      const title = $(this).find('.measure-title').text();
      const color = $(this).find('.measure-title').css('background-color')
      const link = $(this).find('.measure-content .measure-meta a').attr('href')

      measures.push({
        title,
        color,
        link
      });
    });

    const data = JSON.stringify(measures, null, 2);
    fs.writeFileSync(file, data);
  })
  .catch(console.error);

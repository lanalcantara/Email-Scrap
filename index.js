const sendEmail = require('./emailSender');
const scrapNews = require('./scraper');

// Função principal que executa o scraping e envia o e-mail
(async () => {
  const headlines = await scrapNews();
  await sendEmail(headlines);
})();

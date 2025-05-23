require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

// Função para fazer o scrapinggg
async function scrapNews() {
  try {
    const { data } = await axios.get('https://g1.globo.com/');
    const $ = cheerio.load(data);

    const headlines = [];
    $('a.feed-post-link').slice(0, 5).each((i, el) => {
      headlines.push($(el).text().trim());
    });

    return headlines;
  } catch (error) {
    console.error('Erro ao fazer o scraping:', error);
    return [];
  }
}

async function sendEmail(headlines) {
  if (headlines.length === 0) {
    console.log('Nenhuma manchete encontrada!!.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: 'Top Manchetes do G1',
    html: `<h2>Últimas manchetes:</h2><ul>${headlines.map(h => `<li>${h}</li>`).join('')}</ul>`,
  };

  try {
    await transporter.sendMail(message);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

// Executar tudo
(async () => {
  const headlines = await scrapNews();
  await sendEmail(headlines);
})();

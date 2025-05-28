// emailSender.js
require('dotenv').config();
const nodemailer = require('nodemailer');

/**
 * Enviandndo um e-mail com as manchetes recebidas
 * @param {string[]} headlines 
 */
async function sendEmail(headlines) {
  if (!headlines || headlines.length === 0) {
    console.log('Nenhuma manchete para enviar.');
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
    console.log('✅ E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

module.exports = sendEmail;

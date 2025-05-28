# Email-Scrap

Projeto em **Node.js** para coletar as principais manchetes do site [G1](https://g1.globo.com/) automaticamente e enviar por e-mail.

---

## Funcionalidades

- Faz scraping das 5 últimas manchetes do portal G1 usando `axios` e `cheerio`.
- Envia as manchetes coletadas por e-mail utilizando `nodemailer`.
- Código modularizado com separação entre scraping e envio de e-mail.
- Uso de variáveis de ambiente para segurança das credenciais.

---

## Tecnologias usadas

- Node.js
- axios
- cheerio
- nodemailer
- dotenv

---

## Como usar

### 1. Clone este repositório

```bash
git clone https://github.com/lanalcantara/Email-Scrap.git
cd Email-Scrap

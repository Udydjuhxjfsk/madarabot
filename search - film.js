import axios from 'axios';

const MYCIMA_API = 'https://mycima.zenonhs.store/search/?query=';

let handler = async (m, { text }) => {
  if (!text) {
    throw '*[❗] يرجى إدخال اسم الفيلم للبحث عنه*';
  }

  try {
    const response = await axios.get(`${MYCIMA_API}${encodeURIComponent(text)}`);
    const results = response.data;

    if (!results || results.length === 0) {
      m.reply(`⚠ لم يتم العثور على أي نتائج للفيلم: *${text}*`);
      return;
    }

    let reply = `*نتائج البحث عن الفيلم:* ${text}\n`;
    results.forEach((movie, index) => {
      const title = movie.title;
      const link = movie.link;
      reply += `${index + 1}. ${title} - ${link}\n`;
    });

    m.reply(reply);
  } catch (error) {
    console.error(error);
    m.reply(`⚠ حدث خطأ أثناء البحث:\n${error.response ? error.response.data : error.message}`);
  }
};

handler.help = ['بحث'];
handler.tags = ['tools'];
handler.command = ['بحث'];

export default handler;

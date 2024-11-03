import axios from 'axios';

const MYCIMA_DOWNLOAD_API = 'https://mycima.zenonhs.store/download_servers/?url=';

let downloadHandler = async (m, { text }) => {
  if (!text) {
    throw '*[❗] يرجى إدخال رابط الفيلم للحصول على روابط التحميل*';
  }

  try {
    const response = await axios.get(`${MYCIMA_DOWNLOAD_API}${encodeURIComponent(text)}`);
    const downloadInfo = response.data;

    if (!downloadInfo || downloadInfo.length === 0) {
      m.reply(`⚠ لم يتم العثور على روابط تحميل للفيلم باستخدام الرابط: *${text}*`);
      return;
    }

    let reply = `*روابط تحميل الفيلم:*\n`;
    downloadInfo.slice(0, 5).forEach((link, index) => {
      const url = link.url || 'غير متوفر';
      const label = link.label || 'رابط';
      reply += `*${index + 1}.* ${label} - (${url})\n`;
    });
    reply += `*الرابط الأصلي:* ${text}\n`;

    m.reply(reply);
  } catch (error) {
    console.error(error);
    m.reply(`⚠ حدث خطأ أثناء الحصول على روابط التحميل:\n${error.response ? error.response.data : error.message}`);
  }
};

downloadHandler.help = ['تحميل'];
downloadHandler.tags = ['tools'];
downloadHandler.command = ['تحميل-فلم'];

export default downloadHandler;

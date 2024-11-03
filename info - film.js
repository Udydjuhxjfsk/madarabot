import axios from 'axios';

const MYCIMA_INFO_API = 'https://mycima.zenonhs.store/info/?url=';

let infoHandler = async (m, { text }) => {
  if (!text) {
    throw '*[❗] يرجى إدخال رابط الفيلم للحصول على المعلومات*';
  }

  try {
    const response = await axios.get(`${MYCIMA_INFO_API}${encodeURIComponent(text)}`);
    const movieInfo = response.data;

    if (!movieInfo) {
      m.reply(`⚠ لم يتم العثور على معلومات للفيلم باستخدام الرابط: *${text}*`);
      return;
    }

    let reply = `*معلومات الفيلم:*\n`;
    reply += `*العنوان:* ${movieInfo.title || 'غير متوفر'}\n`;
    reply += `*الاسم بالعربي:* ${movieInfo.ar_name || 'غير متوفر'}\n`;
    reply += `*البلد:* ${movieInfo.lang_country || 'غير متوفر'}\n`;
    reply += `*القصة:* ${movieInfo.story || 'غير متوفر'}\n`;
    reply += `*النوع:* ${movieInfo.type || 'غير متوفر'}\n`;
    reply += `*الشركة:* ${movieInfo.companies || 'غير متوفر'}\n`;
    reply += `*معروف بـ:* ${movieInfo.known_as || 'غير متوفر'}\n`;
    reply += `*يعرض في:* ${movieInfo.locations || 'غير متوفر'}\n`;
    reply += `*الرابط:* ${text}\n`;

    m.reply(reply);
  } catch (error) {
    console.error(error);
    m.reply(`⚠ حدث خطأ أثناء الحصول على المعلومات:\n${error.response ? error.response.data : error.message}`);
  }
};

infoHandler.help = ['معلومات'];
infoHandler.tags = ['tools'];
infoHandler.command = ['معلومات-فلم'];

export default infoHandler;

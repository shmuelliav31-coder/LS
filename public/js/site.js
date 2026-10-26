// LS Devs — language switch, dark mode, store, cart and contact form.
(function () {
  'use strict';

  // ===== CHANGE THESE to your real details =====
  var CONFIG = {
    email: 'shmuelliav91@gmail.com',
    whatsapp: '972502126236' // country code + number, no "+" or dashes
  };

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // ---------------------------------------------------------------- Text
  // English lives in the HTML; this holds Hebrew plus English strings used only by JS.
  var T = {
    en: {
      'cart.add': 'Add to cart', 'cart.added': 'In cart', 'cart.empty': 'Your cart is empty.', 'cart.browse': 'Browse the store',
      'cart.remove': 'Remove', 'cart.toast': 'Added to cart', 'cart.month': '/mo', 'cart.monthly': 'monthly',
      'cart.mailSubject': 'New order from the LS Devs website', 'cart.mailIntro': 'Hi LS Devs, I would like to order:',
      'kind.template': 'Template', 'kind.addon': 'Add-on', 'kind.care': 'Monthly care', 'kind.plan': 'Package',
      'form.need': 'Please fill in your name, a valid email and a short message.', 'form.opened': 'Your email app is opening with the message ready to send.',
      'form.mailSubject': 'New project inquiry', 'cart.copied': 'Order copied', 'form.opened2': 'WhatsApp is opening with your message.',
      'form.intro': 'Hi LS Devs, I have a new project:', 'theme.dark': 'Dark mode', 'theme.light': 'Light mode', 'lang.other': 'עברית',
      'mock.h': 'Fresh bread, every morning.'
    },
    he: {
      skip: 'דלגו לתוכן',
      'nav.work': 'עיצובים', 'hero.badge': 'סטודיו לבניית אתרים בישראל', 'chip.speed': 'ציון מהירות', 'chip.mobile': 'מושלם במובייל',
      'mq.1': 'אתרים', 'mq.2': 'חנויות אונליין', 'mq.3': 'אפליקציות ווב', 'mq.4': 'עברית + אנגלית', 'mq.5': 'SEO', 'mq.6': 'נגישות', 'mq.7': 'זימון תורים', 'mq.8': 'אחסון מהיר',
      'show.title': 'דוגמאות לעיצובים', 'show.intro': 'טעימה מהסגנונות שאנחנו בונים. האתר שלכם יקבל עיצוב משלו, שנבנה סביב העסק שלכם.',
      'show.1': 'מאפייה', 'show.1t': 'הזמנות אונליין ואיסוף עצמי', 'show.2': 'קליניקה', 'show.2t': 'קביעת תור בשתי לחיצות', 'show.3': 'חנות אופנה', 'show.3t': 'תשלום בפחות מדקה',
      'show.m1': 'מחמצת וקפה', 'show.m2': 'להרגיש טוב יותר, מהר יותר.', 'show.m3': 'קולקציה חדשה', 'show.book': 'לקביעת תור',
      'nav.services': 'שירותים', 'nav.pricing': 'מחירים', 'nav.store': 'חנות', 'nav.process': 'איך זה עובד', 'nav.faq': 'שאלות', 'nav.contact': 'צור קשר',
      'hero.title': 'אתרים שמדברים בשפה של הלקוחות שלכם.',
      'hero.lead': 'LS Devs בונים אתרים מהירים, חנויות אונליין ואפליקציות ווב לעסקים קטנים — בעברית, באנגלית או בשתיהן. מחירים קבועים, תוספות מוכנות, והקוד שייך לכם.',
      'hero.cta1': 'למחירים', 'hero.cta2': 'לחנות',
      'hero.f1a': 'החל מ־₪590', 'hero.f1b': 'לדף נחיתה',
      'hero.f2a': '1–3 שבועות', 'hero.f2b': 'מההתחלה ועד העלייה לאוויר',
      'hero.f3a': 'עב / EN', 'hero.f3b': 'דו־לשוני, מותאם מימין לשמאל',
      'mock.h': 'לחם טרי, כל בוקר.', 'mock.p': 'מזמינים עד 10:00, אוספים עד הצהריים.', 'mock.btn': 'להזמנה',
      'svc.title': 'מה אנחנו בונים', 'svc.intro': 'שלושה סוגי פרויקטים, עשויים כמו שצריך. כולם מותאמים למובייל, נטענים מהר וקל לעדכן אותם.',
      'svc.1t': 'אתרי תדמית לעסקים', 'svc.1p': 'אתר ברור שמסביר מה אתם עושים ומקל על לקוחות להתקשר, לשלוח הודעה או לקבוע תור.',
      'svc.2t': 'חנויות אונליין', 'svc.2p': 'דפי מוצר, תשלום קצר, וחיבור לסליקה, חשבוניות ומשלוחים בישראל.',
      'svc.3t': 'אפליקציות ווב וכלים', 'svc.3p': 'מערכות זימון תורים, פורטלים ללקוחות ודשבורדים שבנויים לפי איך שהעסק שלכם עובד.',
      'price.title': 'מחירים', 'price.intro': 'מחיר חד־פעמי לבניית האתר, כולל מע״מ. צריכים משהו באמצע? הוסיפו תוספות מהחנות.',
      'plan.popular': 'הכי נבחר',
      'plan.1n': 'דף נחיתה', 'plan.1f': 'לעסק חדש, לקמפיין או לשירות אחד.',
      'plan.1a': 'עמוד אחד, עד 4 חלקים', 'plan.1b': 'טופס יצירת קשר + כפתור וואטסאפ', 'plan.1c': 'עיצוב שמתחיל מהמובייל', 'plan.1d': 'הגדרת SEO בסיסית', 'plan.1e': 'מוכן תוך כשבוע',
      'plan.2n': 'אתר לעסק', 'plan.2f': 'לעסק שצריך בית אמיתי ברשת.',
      'plan.2a': 'עד 5 עמודים, עיצוב אישי', 'plan.2b': 'עריכת טקסטים ותמונות בעצמכם', 'plan.2c': 'עברית או אנגלית (שתיהן: ‎+₪290)', 'plan.2d': 'SEO בסיסי + Google Business', 'plan.2e': '7 ימים של תיקונים חינם אחרי העלייה',
      'plan.3n': 'חנות אונליין', 'plan.3f': 'למכירת מוצרים ברשת עם תשלומים אמיתיים.',
      'plan.3a': 'עד 50 מוצרים', 'plan.3b': 'תשלום באשראי ובביט', 'plan.3c': 'חשבוניות וקבלות אוטומטיות', 'plan.3d': 'אפשרויות משלוח ואיסוף עצמי', 'plan.3e': 'הדרכה קצרה',
      'price.custom': 'בונים משהו גדול יותר, כמו אפליקציית ווב?', 'price.customLink': 'ספרו לנו וקבלו הצעת מחיר כתובה.',
      'store.title': 'חנות', 'store.intro': 'תבניות מוכנות, תוספות לאתר ותחזוקה חודשית. הוסיפו מה שצריך, שלחו את ההזמנה, ונאשר תוך יום.',
      'store.all': 'הכל', 'store.templates': 'תבניות', 'store.addons': 'תוספות', 'store.care': 'תחזוקה חודשית',
      'proc.title': 'איך זה עובד', 'proc.intro': 'ארבעה שלבים. רואים התקדמות אמיתית כל שבוע, לא רק בסוף.',
      'proc.1t': 'שיחה קצרה', 'proc.1p': '20 דקות על מה שאתם צריכים, למי זה מיועד ומה התקציב. בחינם.',
      'proc.2t': 'תוכנית ומחיר', 'proc.2p': 'תוכנית כתובה עם עמודים, פיצ׳רים, לוח זמנים ומחיר קבוע.',
      'proc.3t': 'עיצוב ובנייה', 'proc.3p': 'מקבלים קישור תצוגה פרטי ויכולים להעיר לאורך הדרך.',
      'proc.4t': 'עולים לאוויר', 'proc.4p': 'מעלים את האתר, מחברים את הדומיין ומראים לכם איך לעדכן אותו.',
      'faq.title': 'שאלות', 'faq.intro': 'לא מצאתם תשובה?', 'faq.ask': 'שאלו אותנו ישירות.',
      'faq.1q': 'איך משלמים?', 'faq.1a': 'אחרי שנאשר את ההזמנה תקבלו קישור לתשלום. בפרויקטים משלמים 50% בהתחלה ו־50% בעלייה לאוויר. אפשר בהעברה בנקאית, באשראי או בביט.',
      'faq.2q': 'האתר שייך לי?', 'faq.2a': 'כן. ברגע שהוא שולם, העיצוב, הקוד והדומיין שלכם. אנחנו מעבירים לכם את כל הסיסמאות.',
      'faq.3q': 'אפשר לעדכן את האתר לבד?', 'faq.3a': 'כן. אתרים לעסקים וחנויות מגיעים עם עורך פשוט לטקסטים, תמונות ומוצרים, וגם הדרכה קצרה.',
      'faq.4q': 'האחסון כלול?', 'faq.4a': 'האחסון לא כלול במחיר. אפשר להוסיף תחזוקה חודשית החל מ־₪49, שכוללת אחסון, SSL וגיבויים, או לאחסן איפה שתרצו.',
      'faq.5q': 'האתר יכול להיות בעברית ובאנגלית?', 'faq.5a': 'כן, עם כפתור החלפת שפה בדיוק כמו כאן. תמיכה מימין לשמאל בנויה מההתחלה, לא מודבקת אחר כך.',
      'faq.6q': 'מה אם כבר יש לי אתר?', 'faq.6a': 'אפשר לעצב אותו מחדש, להאיץ אותו או רק לתחזק אותו. שלחו קישור ונגיד לכם בכנות מה שווה לעשות.',
      'contact.title': 'בואו נבנה את שלכם.', 'contact.intro': 'ספרו לנו קצת על העסק. אנחנו עונים תוך יום עסקים.', 'contact.wa': 'שלחו לנו הודעה בוואטסאפ',
      'form.name': 'שם', 'form.phone': 'טלפון', 'form.email': 'אימייל', 'form.type': 'מה אתם צריכים?', 'form.other': 'משהו אחר',
      'form.msg': 'ספרו לנו על הפרויקט', 'form.send': 'שליחה בוואטסאפ',
      'form.need': 'נא למלא שם, אימייל תקין והודעה קצרה.', 'form.opened': 'אפליקציית המייל נפתחת עם ההודעה מוכנה לשליחה.', 'form.mailSubject': 'פנייה חדשה לפרויקט',
      'footer.line': 'אתרים, חנויות אונליין ואפליקציות ווב. נבנה בישראל.',
      'cart.title': 'העגלה שלכם', 'cart.total': 'סה״כ', 'cart.note': 'עוד לא משלמים. נאשר את הפרטים ונשלח לכם קישור לתשלום מאובטח.',
      'cart.sendWa': 'שליחת ההזמנה בוואטסאפ', 'cart.copy': 'העתקת ההזמנה', 'cart.copied': 'ההזמנה הועתקה', 'cart.orEmail': 'או שלחו במייל ל־',
      'form.ready': 'ההודעה מוכנה. לחצו כדי לשלוח אותה בוואטסאפ:', 'form.openWa': 'פתיחת וואטסאפ', 'form.opened2': 'וואטסאפ נפתח עם ההודעה שלכם.',
      'form.intro': 'היי LS Devs, יש לי פרויקט חדש:',
      'cart.add': 'הוספה לעגלה', 'cart.added': 'בעגלה', 'cart.empty': 'העגלה ריקה.', 'cart.browse': 'לחנות',
      'cart.remove': 'הסרה', 'cart.toast': 'נוסף לעגלה', 'cart.month': '/חודש', 'cart.monthly': 'חודשי',
      'cart.mailSubject': 'הזמנה חדשה מאתר LS Devs', 'cart.mailIntro': 'היי LS Devs, אשמח להזמין:',
      'kind.template': 'תבנית', 'kind.addon': 'תוספת', 'kind.care': 'תחזוקה חודשית', 'kind.plan': 'חבילה',
      'theme.dark': 'מצב כהה', 'theme.light': 'מצב בהיר', 'lang.other': 'English'
    }
  };
  var EN = {}; // captured from the HTML on first run
  var lang = root.lang === 'he' ? 'he' : 'en';
  var t = function (k) { return (T[lang] && T[lang][k]) || EN[k] || T.en[k] || k; };

  // ---------------------------------------------------------------- Catalogue
  var PRODUCTS = [
    { id: 'plan-landing', kind: 'plan', price: 590, en: ['Landing page package'], he: ['חבילת דף נחיתה'] },
    { id: 'plan-business', kind: 'plan', price: 990, en: ['Business site package'], he: ['חבילת אתר לעסק'] },
    { id: 'plan-store', kind: 'plan', price: 1990, en: ['Online store package'], he: ['חבילת חנות אונליין'] },

    { id: 't-cafe', kind: 'template', price: 290, art: ['#ffd23f', '#0e1a3a', 0],
      en: ['Café & bakery template', 'Menu, opening hours, map and an order button. We set it up with your text and photos.'],
      he: ['תבנית לבית קפה ומאפייה', 'תפריט, שעות פתיחה, מפה וכפתור הזמנה. אנחנו מתקינים עם הטקסטים והתמונות שלכם.'] },
    { id: 't-clinic', kind: 'template', price: 290, art: ['#bfe7d6', '#0e1a3a', 1],
      en: ['Clinic & therapist template', 'Calm design with services, about you and a clear booking button.'],
      he: ['תבנית לקליניקה ומטפלים', 'עיצוב רגוע עם שירותים, עליכם וכפתור ברור לקביעת תור.'] },
    { id: 't-portfolio', kind: 'template', price: 250, art: ['#c9b8ff', '#0e1a3a', 2],
      en: ['Portfolio template', 'For photographers, designers and makers. Big images, simple gallery, contact page.'],
      he: ['תבנית תיק עבודות', 'לצלמים, מעצבים ויוצרים. תמונות גדולות, גלריה פשוטה ועמוד יצירת קשר.'] },
    { id: 't-shop', kind: 'template', price: 390, art: ['#2340ff', '#ffffff', 3],
      en: ['Small shop template', 'Up to 20 products with cart and checkout. A quick start before a full store.'],
      he: ['תבנית חנות קטנה', 'עד 20 מוצרים עם עגלה ותשלום. התחלה מהירה לפני חנות מלאה.'] },

    { id: 'a-bilingual', kind: 'addon', price: 290, art: ['#ffe2d6', '#0e1a3a', 4],
      en: ['Hebrew + English', 'A second language with a switch button and full right-to-left support.'],
      he: ['עברית + אנגלית', 'שפה שנייה עם כפתור החלפה ותמיכה מלאה מימין לשמאל.'] },
    { id: 'a-booking', kind: 'addon', price: 390, art: ['#d7defd', '#2340ff', 5],
      en: ['Online booking', 'Customers pick a time slot, you get an email and a calendar invite.'],
      he: ['זימון תורים אונליין', 'לקוחות בוחרים שעה, ואתם מקבלים מייל והזמנה ליומן.'] },
    { id: 'a-access', kind: 'addon', price: 290, art: ['#bfe7d6', '#0e1a3a', 6],
      en: ['Accessibility compliance', 'Checks and fixes for Israeli standard IS 5568, plus an accessibility statement page.'],
      he: ['הנגשת אתר לפי התקן', 'בדיקה ותיקונים לפי ת״י 5568, כולל עמוד הצהרת נגישות.'] },
    { id: 'a-seo', kind: 'addon', price: 250, art: ['#ffd23f', '#0e1a3a', 7],
      en: ['SEO starter pack', 'Titles, descriptions, Google Search Console and a Google Business profile.'],
      he: ['חבילת SEO למתחילים', 'כותרות, תיאורים, Google Search Console ופרופיל Google Business.'] },
    { id: 'a-speed', kind: 'addon', price: 190, art: ['#0e1a3a', '#ffd23f', 8],
      en: ['Speed boost', 'For an existing site: we compress images, trim scripts and set up caching.'],
      he: ['האצת אתר', 'לאתר קיים: דחיסת תמונות, צמצום סקריפטים והגדרת מטמון.'] },
    { id: 'a-logo', kind: 'addon', price: 250, art: ['#c9b8ff', '#2340ff', 9],
      en: ['Logo & brand colors', 'Three logo directions, one refined final, and a color and font guide.'],
      he: ['לוגו וצבעי מותג', 'שלושה כיווני לוגו, אחד סופי ומלוטש, ומדריך צבעים ופונטים.'] },

    { id: 'c-basic', kind: 'care', price: 49, monthly: true, art: ['#d7defd', '#0e1a3a', 11],
      en: ['Care Basic', 'Hosting, SSL, daily backups, security updates and uptime monitoring.'],
      he: ['תחזוקה בסיסית', 'אחסון, SSL, גיבוי יומי, עדכוני אבטחה וניטור זמינות.'] },
    { id: 'c-plus', kind: 'care', price: 99, monthly: true, art: ['#2340ff', '#ffd23f', 12],
      en: ['Care Plus', 'Everything in Basic, plus 2 hours of changes a month and a monthly report.'],
      he: ['תחזוקה פלוס', 'כל מה שבבסיסית, ועוד שעתיים של שינויים בחודש ודוח חודשי.'] }
  ];
  var byId = {};
  PRODUCTS.forEach(function (p) { byId[p.id] = p; });
  var nameOf = function (p) { return (p[lang] || p.en)[0]; };
  var money = function (n) { return '₪' + n.toLocaleString('en-US'); };

  // Small generated cover art per product, so the store needs no image files.
  function art(p) {
    var bg = p.art[0], fg = p.art[1], v = p.art[2] % 4;
    var s = '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="320" height="180" fill="' + bg + '"/>';
    var o = 'fill="' + fg + '"';
    var soft = 'fill="' + fg + '" opacity=".18"';
    if (p.kind === 'template') {
      s += '<rect x="56" y="30" width="208" height="150" rx="12" fill="#fff" opacity=".9"/>';
      s += '<rect x="72" y="46" width="22" height="8" rx="4" ' + o + '/><rect x="200" y="47" width="48" height="6" rx="3" ' + soft + '/>';
      if (v === 0) s += '<rect x="72" y="70" width="110" height="14" rx="4" ' + o + '/><rect x="72" y="92" width="80" height="8" rx="4" ' + soft + '/><circle cx="222" cy="98" r="28" ' + soft + '/><rect x="72" y="112" width="54" height="16" rx="8" ' + o + '/>';
      if (v === 1) s += '<rect x="72" y="70" width="176" height="44" rx="8" ' + soft + '/><rect x="88" y="84" width="90" height="10" rx="4" ' + o + '/><rect x="72" y="124" width="54" height="40" rx="6" ' + soft + '/><rect x="133" y="124" width="54" height="40" rx="6" ' + soft + '/><rect x="194" y="124" width="54" height="40" rx="6" ' + soft + '/>';
      if (v === 2) s += '<rect x="72" y="68" width="84" height="96" rx="6" ' + soft + '/><rect x="164" y="68" width="84" height="44" rx="6" ' + o + ' opacity=".55"/><rect x="164" y="120" width="84" height="44" rx="6" ' + soft + '/>';
      if (v === 3) s += '<rect x="72" y="68" width="54" height="54" rx="6" fill="#2340ff" opacity=".25"/><rect x="133" y="68" width="54" height="54" rx="6" fill="#2340ff" opacity=".45"/><rect x="194" y="68" width="54" height="54" rx="6" fill="#2340ff" opacity=".25"/><rect x="72" y="130" width="40" height="7" rx="3" fill="#0e1a3a"/><rect x="133" y="130" width="40" height="7" rx="3" fill="#0e1a3a"/><rect x="194" y="130" width="40" height="7" rx="3" fill="#0e1a3a"/>';
    } else if (p.kind === 'care') {
      s += '<path d="M160 34 214 54v40c0 32-24 50-54 60-30-10-54-28-54-60V54Z" ' + o + '/>';
      s += '<path d="m138 94 16 16 30-32" fill="none" stroke="' + bg + '" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>';
      if (p.id === 'c-plus') s += '<circle cx="232" cy="46" r="18" ' + o + '/><path d="M232 37v18M223 46h18" stroke="' + bg + '" stroke-width="5" stroke-linecap="round"/>';
    } else {
      // add-ons: a big glyph that hints at what it is
      var g = {
        'a-bilingual': '<text x="160" y="118" text-anchor="middle" font-family="Secular One, Rubik, sans-serif" font-size="64" ' + o + '>א / A</text>',
        'a-booking': '<rect x="102" y="40" width="116" height="104" rx="14" fill="none" stroke="' + fg + '" stroke-width="8"/><path d="M102 72h116" stroke="' + fg + '" stroke-width="8"/><path d="M132 30v22M188 30v22" stroke="' + fg + '" stroke-width="8" stroke-linecap="round"/><circle cx="160" cy="108" r="14" ' + o + '/>',
        'a-access': '<circle cx="160" cy="90" r="58" fill="none" stroke="' + fg + '" stroke-width="8"/><circle cx="160" cy="62" r="9" ' + o + '/><path d="M128 80h64M160 80v28l-16 28M160 108l16 28" fill="none" stroke="' + fg + '" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
        'a-seo': '<circle cx="148" cy="84" r="38" fill="none" stroke="' + fg + '" stroke-width="10"/><path d="m176 112 30 30" stroke="' + fg + '" stroke-width="12" stroke-linecap="round"/><path d="M130 94l12-14 10 8 14-18" fill="none" stroke="' + fg + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>',
        'a-speed': '<path d="M174 26 116 102h40l-12 54 62-80h-42Z" ' + o + '/>',
        'a-logo': '<rect x="112" y="42" width="96" height="96" rx="24" ' + o + '/><text x="160" y="108" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="46" fill="' + bg + '">Aa</text>',
        'a-page': '<rect x="118" y="34" width="84" height="112" rx="8" fill="#fff" stroke="' + fg + '" stroke-width="6"/><path d="M134 62h52M134 80h52M134 98h32" stroke="' + fg + '" stroke-width="6" stroke-linecap="round" opacity=".5"/><circle cx="208" cy="138" r="20" fill="#2340ff"/><path d="M208 128v20M198 138h20" stroke="#fff" stroke-width="5" stroke-linecap="round"/>'
      };
      s += g[p.id] || '';
    }
    return s + '</svg>';
  }

  // ---------------------------------------------------------------- Cart state
  // The cart comes back from localStorage, which anyone can edit, so only
  // keep known product ids with a sane quantity.
  var MAX_QTY = 20;
  function loadCart() {
    var clean = {};
    var raw = store.get('ls-cart');
    if (!raw || raw.length > 2000) return clean;
    try {
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || Array.isArray(data)) return clean;
      Object.keys(data).forEach(function (id) {
        var qty = data[id];
        if (Object.prototype.hasOwnProperty.call(byId, id) && Number.isInteger(qty) && qty >= 1 && qty <= MAX_QTY) {
          clean[id] = qty;
        }
      });
    } catch (e) { /* corrupt value, start empty */ }
    return clean;
  }
  var cart = loadCart();
  var saveCart = function () { store.set('ls-cart', JSON.stringify(cart)); };

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // The product art is static SVG written in this file. Parse it as SVG
  // (scripts never run in parsed documents) instead of using innerHTML.
  var svgParser = new DOMParser();
  function svgNode(markup) {
    var doc = svgParser.parseFromString(markup.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '), 'image/svg+xml');
    return document.importNode(doc.documentElement, true);
  }

  // ---------------------------------------------------------------- Motion
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Page-wide transitions (theme / language) via the View Transitions API, with a plain fallback.
  function withTransition(kind, update) {
    if (reduceMotion || !document.startViewTransition) { update(); return; }
    root.classList.add(kind);
    var vt = document.startViewTransition(update);
    vt.finished.then(function () { root.classList.remove(kind); }, function () { root.classList.remove(kind); });
  }

  // Scroll reveal: things slide in as they enter the screen, siblings slightly staggered.
  var io = ('IntersectionObserver' in window && !reduceMotion) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }) : null;
  function reveal(els) {
    els.forEach(function (el) {
      el.classList.add('rv');
      var i = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.setProperty('--i', Math.min(i, 7));
      if (io) io.observe(el); else el.classList.add('in');
    });
  }

  // ---------------------------------------------------------------- Store grid
  var grid = $('[data-products]');
  var filter = 'all', booted = false;
  function renderProducts(animate) {
    if (!grid) return;
    var list = PRODUCTS.filter(function (p) { return p.kind !== 'plan' && (filter === 'all' || p.kind === filter); });
    var fragment = document.createDocumentFragment();
    list.forEach(function (p) {
      var d = p[lang] || p.en;
      var card = el('article', 'product rv');

      var artBox = el('div', 'product__art');
      artBox.appendChild(svgNode(art(p)));
      artBox.appendChild(el('span', 'product__kind', t('kind.' + p.kind)));
      card.appendChild(artBox);

      var body = el('div', 'product__body');
      body.appendChild(el('h3', 'product__name', d[0]));
      body.appendChild(el('p', 'product__desc', d[1]));
      var row = el('div', 'product__row');
      var price = el('span', 'product__price', money(p.price));
      if (p.monthly) price.appendChild(el('small', null, t('cart.month')));
      row.appendChild(price);
      var add = el('button', 'btn btn--brand');
      add.type = 'button';
      add.setAttribute('data-add', p.id);
      row.appendChild(add);
      body.appendChild(row);
      card.appendChild(body);

      fragment.appendChild(card);
    });
    grid.replaceChildren(fragment);
    var cards = Array.prototype.slice.call(grid.children);
    if (animate === false) cards.forEach(function (c) { c.classList.add('in'); });
    else reveal(cards);
    syncAddButtons();
  }
  function syncAddButtons() {
    $$('[data-add]').forEach(function (b) {
      var inCart = !!cart[b.getAttribute('data-add')];
      b.classList.toggle('is-added', inCart);
      b.textContent = inCart ? '✓ ' + t('cart.added') : t('cart.add');
    });
  }

  $$('[data-filter]').forEach(function (b) {
    b.addEventListener('click', function () {
      filter = b.getAttribute('data-filter');
      $$('[data-filter]').forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
      renderProducts();
    });
  });

  // ---------------------------------------------------------------- Cart drawer
  var drawer = $('[data-cart]'), scrim = $('[data-cart-scrim]'), itemsEl = $('[data-cart-items]');
  var countEl = $('[data-cart-count]'), totalEl = $('[data-cart-total]');
  var lastFocus = null;

  function totals() {
    var once = 0, monthly = 0, count = 0;
    Object.keys(cart).forEach(function (id) {
      var p = byId[id], q = cart[id];
      count += q;
      if (p.monthly) monthly += p.price * q; else once += p.price * q;
    });
    return { once: once, monthly: monthly, count: count };
  }
  function totalText(x) {
    var parts = [];
    if (x.once || !x.monthly) parts.push(money(x.once));
    if (x.monthly) parts.push(money(x.monthly) + t('cart.month'));
    return parts.join(' + ');
  }

  function renderCart() {
    var x = totals();
    countEl.textContent = x.count;
    countEl.hidden = x.count === 0;
    totalEl.textContent = totalText(x);
    var wa = $('[data-checkout-wa]'), empty = x.count === 0;
    wa.classList.toggle('is-disabled', empty);
    wa.setAttribute('aria-disabled', String(empty));
    wa.href = 'https://wa.me/' + CONFIG.whatsapp + (empty ? '' : '?text=' + encodeURIComponent(orderText()));
    $('[data-copy-order]').disabled = empty;
    var ids = Object.keys(cart);
    if (!ids.length) {
      var empty = el('div', 'cart__empty');
      empty.appendChild(el('p', null, t('cart.empty')));
      var browse = el('a', 'btn btn--ghost', t('cart.browse'));
      browse.href = '#store';
      browse.setAttribute('data-cart-close', '');
      empty.appendChild(browse);
      itemsEl.replaceChildren(empty);
    } else {
      var fragment = document.createDocumentFragment();
      ids.forEach(function (id) {
        var p = byId[id], q = cart[id];
        var line = el('div', 'line');
        line.appendChild(el('span', 'line__name', nameOf(p)));
        line.appendChild(el('span', 'line__price', money(p.price * q) + (p.monthly ? t('cart.month') : '')));

        var ctrl = el('div', 'line__ctrl');
        var qty = el('span', 'qty');
        var dec = el('button', null, '−');
        dec.type = 'button';
        dec.setAttribute('data-dec', id);
        dec.setAttribute('aria-label', '−');
        var inc = el('button', null, '+');
        inc.type = 'button';
        inc.setAttribute('data-inc', id);
        inc.setAttribute('aria-label', '+');
        inc.disabled = q >= MAX_QTY;
        qty.appendChild(dec);
        qty.appendChild(el('span', null, String(q)));
        qty.appendChild(inc);
        ctrl.appendChild(qty);

        var remove = el('button', 'line__remove', t('cart.remove'));
        remove.type = 'button';
        remove.setAttribute('data-remove', id);
        ctrl.appendChild(remove);

        line.appendChild(ctrl);
        fragment.appendChild(line);
      });
      itemsEl.replaceChildren(fragment);
    }
    syncAddButtons();
  }

  function openCart() {
    lastFocus = document.activeElement;
    scrim.hidden = false;
    drawer.removeAttribute('inert');
    drawer.setAttribute('aria-hidden', 'false');
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { $('[data-cart-close]', drawer).focus(); }, 50);
  }
  function closeCart() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.setAttribute('inert', '');
    scrim.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  var toastEl = $('[data-toast]'), toastTimer = 0;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2200);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-add],[data-inc],[data-dec],[data-remove],[data-cart-open],[data-cart-close],[data-cart-scrim]');
    if (!el) return;
    if (el.hasAttribute('data-add')) {
      var id = el.getAttribute('data-add');
      if (!byId[id]) return;
      if (cart[id]) { openCart(); return; }
      cart[id] = 1;
      saveCart(); renderCart();
      countEl.classList.remove('is-bump'); void countEl.offsetWidth; countEl.classList.add('is-bump');
      toast(t('cart.toast') + ': ' + nameOf(byId[id]));
    } else if (el.hasAttribute('data-inc')) {
      var incId = el.getAttribute('data-inc');
      if (cart[incId] && cart[incId] < MAX_QTY) cart[incId]++;
      saveCart(); renderCart();
    } else if (el.hasAttribute('data-dec')) {
      var d = el.getAttribute('data-dec');
      if (!cart[d]) return;
      if (--cart[d] <= 0) delete cart[d];
      saveCart(); renderCart();
    } else if (el.hasAttribute('data-remove')) {
      delete cart[el.getAttribute('data-remove')]; saveCart(); renderCart();
      var c = $('[data-cart-close]', drawer); if (c) c.focus();
    } else if (el.hasAttribute('data-cart-open')) {
      openCart();
    } else {
      closeCart();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeCart();
  });

  function orderText() {
    var lines = [t('cart.mailIntro'), ''];
    Object.keys(cart).forEach(function (id) {
      var p = byId[id], q = cart[id];
      lines.push('• ' + nameOf(p) + (q > 1 ? ' ×' + q : '') + ' — ' + money(p.price * q) + (p.monthly ? t('cart.month') : ''));
    });
    lines.push('', t('cart.total') + ': ' + totalText(totals()));
    return lines.join('\n');
  }
  $('[data-checkout-wa]').addEventListener('click', function (e) {
    if (!Object.keys(cart).length) e.preventDefault();
  });
  $('[data-copy-order]').addEventListener('click', function () {
    var text = orderText() + '\n\n' + CONFIG.email;
    var done = function () { toast(t('cart.copied')); };
    var fallback = function () {
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (err) {} ta.remove();
    };
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (err) { fallback(); }
  });

  // ---------------------------------------------------------------- Language
  $$('[data-i18n]').forEach(function (el) { EN[el.getAttribute('data-i18n')] = el.textContent; });
  if (root.lang !== 'he') EN['__title'] = document.title;
  var TITLE_HE = 'LS Devs — אתרים, חנויות אונליין ואפליקציות ווב';
  var TITLE_EN = 'LS Devs — Websites, online stores and web apps';

  var codeLang = $('[data-code-lang]'), codeDir = $('[data-code-dir]'), codeTheme = $('[data-code-theme]');
  function flash(el, text) {
    if (!el || el.textContent === text) return;
    el.textContent = text;
    el.classList.remove('is-flash'); void el.offsetWidth; el.classList.add('is-flash');
  }

  function applyLang(next) {
    lang = next;
    root.lang = lang;
    root.dir = lang === 'he' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var v = lang === 'he' ? T.he[k] : EN[k];
      if (v != null && k !== 'cart.add') el.textContent = v;
    });
    document.title = lang === 'he' ? TITLE_HE : TITLE_EN;
    var lb = $('[data-lang-toggle]');
    $('[data-lang-label]').textContent = lang === 'he' ? 'EN' : 'עב';
    lb.setAttribute('aria-label', t('lang.other'));
    lb.setAttribute('lang', lang === 'he' ? 'en' : 'he');
    flash(codeLang, '"' + lang + '"');
    flash(codeDir, '"' + root.dir + '"');
    syncThemeButton();
    renderProducts(booted ? false : undefined);
    renderCart();
    store.set('ls-lang', lang);
  }
  $('[data-lang-toggle]').addEventListener('click', function () {
    var next = lang === 'he' ? 'en' : 'he';
    withTransition('vt-lang', function () { applyLang(next); });
  });

  // ---------------------------------------------------------------- Theme
  var themeBtn = $('[data-theme-toggle]');
  function syncThemeButton() {
    var dark = root.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? t('theme.light') : t('theme.dark'));
    flash(codeTheme, '"' + (dark ? 'dark' : 'light') + '"');
  }
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    // Circle that grows out of the button and paints the new theme over the page.
    var r = themeBtn.getBoundingClientRect();
    root.style.setProperty('--vt-x', (r.left + r.width / 2) + 'px');
    root.style.setProperty('--vt-y', (r.top + r.height / 2) + 'px');
    withTransition('vt-theme', function () {
      root.setAttribute('data-theme', next);
      store.set('ls-theme', next);
      syncThemeButton();
    });
  });

  // ---------------------------------------------------------------- Header + nav
  var header = $('[data-header]');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var navBtn = $('[data-nav-toggle]'), nav = $('[data-nav]');
  var setNav = function (open) { navBtn.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); };
  navBtn.addEventListener('click', function () { setNav(navBtn.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });

  // ---------------------------------------------------------------- Contact form
  $$('[data-email-link]').forEach(function (a) { a.href = 'mailto:' + CONFIG.email; a.textContent = CONFIG.email; });
  $$('[data-email-text]').forEach(function (s) { s.textContent = CONFIG.email; });
  $$('[data-whatsapp-link]').forEach(function (a) { a.href = 'https://wa.me/' + CONFIG.whatsapp; });
  var form = $('[data-contact-form]'), errEl = $('[data-form-error]');

  // Strip control characters, collapse blank lines and cap the length
  // before anything goes into the WhatsApp link.
  function cleanInput(value, max) {
    return String(value)
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
      .slice(0, max);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var v = {
      name: cleanInput(f.name.value, 80),
      phone: cleanInput(f.phone.value, 20).replace(/[^\d+\-\s()]/g, ''),
      email: cleanInput(f.email.value, 120),
      message: cleanInput(f.message.value, 1500)
    };
    var rules = {
      name: function (x) { return x.length > 1; },
      email: function (x) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x); },
      message: function (x) { return x.length > 3; }
    };
    var bad = false;
    Object.keys(rules).forEach(function (k) {
      var ok = rules[k](v[k]);
      f[k].closest('.field').classList.toggle('is-bad', !ok);
      f[k].setAttribute('aria-invalid', String(!ok));
      if (!ok) bad = true;
    });
    if (bad) { errEl.textContent = t('form.need'); errEl.hidden = false; return; }
    errEl.hidden = true;

    var body = [
      t('form.intro'), '',
      t('form.name') + ': ' + v.name,
      t('form.phone') + ': ' + (v.phone || '-'),
      t('form.email') + ': ' + v.email,
      t('form.type') + ' ' + f.type.options[f.type.selectedIndex].textContent,
      '', v.message
    ].join('\n');
    var url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(body);
    var ready = $('[data-form-ready]');
    $('[data-form-wa]').href = url;
    var w = null;
    try { w = window.open(url, '_blank', 'noopener,noreferrer'); } catch (err) { w = null; }
    // Some hosts block window.open. Then show a normal link to tap instead.
    if (w) { toast(t('form.opened2')); ready.hidden = true; } else { ready.hidden = false; $('[data-form-wa]').focus(); }
  });

  var y = $('[data-year]'); if (y) y.textContent = new Date().getFullYear();

  // ---------------------------------------------------------------- Init
  applyLang(lang);
  booted = true;

  // Hero: the device stack tilts gently toward the pointer.
  var tilt = $('[data-tilt]');
  if (tilt && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var raf = 0;
    document.querySelector('.hero').addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var r = tilt.getBoundingClientRect();
        var x = (e.clientX - (r.left + r.width / 2)) / r.width, y = (e.clientY - (r.top + r.height / 2)) / r.height;
        tilt.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
        tilt.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
        raf = 0;
      });
    });
    document.querySelector('.hero').addEventListener('pointerleave', function () {
      tilt.style.setProperty('--rx', '0deg'); tilt.style.setProperty('--ry', '0deg');
    });
  }
  // Spotlight that follows the pointer on cards.
  document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.plan, .product, .service, .shot');
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });
  root.classList.add('motion');
  reveal($$('.section .head, .service, .shot, .plan, .plans__note, .step, .faq__list details, .contact__copy, .form'));
})();

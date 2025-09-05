// Hinnat €/m² tai €/m (pensaat)
const hinnat = {
  nurmikko: 1.0,    // €/m²
  haravointi: 0.5,  // €/m²
  pensaat: 10.0,    // €/m (pensaiden pituus)
  lumi: 20.0        // €/kerta (kiinteä)
};

// Menu painike (liukuvalikko)
const menuButton = document.getElementById('menuButton');
const sideMenu = document.getElementById('navLinks'); // Huom: tämä ID pitää olla <ul id="navLinks">

menuButton.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

// Näytä/piilota pensaiden pituus -kenttä valinnan mukaan
document.getElementById('pensaatCheckbox').addEventListener('change', function () {
  const pensaatInput = document.getElementById('pensaatInputContainer');
  pensaatInput.style.display = this.checked ? 'block' : 'none';
});

function laskeHinta() {
  const area = parseFloat(document.getElementById('area').value);
  document.getElementById('areaError').innerText = '';
  if (isNaN(area) || area <= 0) {
    document.getElementById('areaError').innerText = 'Anna tontin koko oikeassa muodossa!';
    return;
  }

  const pensaatChecked = document.getElementById('pensaatCheckbox').checked;
  let bushLength = 0;
  if (pensaatChecked) {
    bushLength = parseFloat(document.getElementById('bushLength').value);
    document.getElementById('bushError').innerText = '';
    if (isNaN(bushLength) || bushLength < 0) {
      document.getElementById('bushError').innerText = 'Anna pensaiden pituus oikein (0 tai enemmän)!';
      return;
    }
  } else {
    document.getElementById('bushError').innerText = '';
  }

  const palvelut = document.querySelectorAll('input[name="service"]:checked');
  if (palvelut.length === 0) {
    document.getElementById('areaError').innerText = 'Valitse vähintään yksi palvelu!';
    return;
  }

  let kokonaisHinta = 0;

  palvelut.forEach(palvelu => {
    switch (palvelu.value) {
      case 'nurmikko':
        kokonaisHinta += hinnat.nurmikko * area;
        break;
      case 'haravointi':
        kokonaisHinta += hinnat.haravointi * area;
        break;
      case 'pensaat':
        kokonaisHinta += hinnat.pensaat * bushLength;
        break;
      case 'lumi':
        kokonaisHinta += hinnat.lumi;
        break;
    }
  });

  const kotitalousvahennys = kokonaisHinta * 0.35;
  const maksettava = kokonaisHinta - kotitalousvahennys;

  document.getElementById('priceResult').innerText =
    `Kokonaishinta: ${kokonaisHinta.toFixed(2)} €`;

  document.getElementById('taxCredit').innerText =
    `Kotitalousvähennyksen osuus: ${kotitalousvahennys.toFixed(2)} €`;
}

// === Lisäys: sulje valikko kun linkkiä klikataan ===

// --- KIELITUKI ---
const translations = {
  fi: {
    nav_home: 'Etusivu',
    nav_services: 'Palvelut',
    nav_calculator: 'Hintalaskuri',
    nav_contact: 'Ota yhteyttä',
    nav_faq: 'FAQ',
    nav_about: 'Tietoa meistä',
    home_title: 'Tervetuloa Puutarhapalveluihin',
    home_desc: 'Luotettavaa ja edullista piha- ja lumityöapua – juuri sinulle.',
    services_title: 'Palvelumme',
    services_lawn: '<strong>Nurmikon leikkuu</strong> – tarkka ja huolellinen leikkaus (€/m²)',
    services_rake: '<strong>Harjaus / Haravointi</strong> – piha siistiksi helposti (€/m²)',
    services_bush: '<strong>Pensaiden trimmaus</strong> – pituuden mukaan hinnoiteltu (€/m)',
    services_snow: '<strong>Lumityöt</strong> – kiinteä kerta- tai kausihinta',
    calculator_title: 'Hintalaskuri',
    calculator_area: 'Tontin koko (m²):',
    calculator_lawn: 'Nurmikon leikkuu',
    calculator_rake: 'Harjaus / Haravointi',
    calculator_bush: 'Pensaiden trimmaus',
    calculator_snow: 'Lumityöt',
    calculator_bushlength: 'Pensaiden pituus (m):',
    calculator_btn: 'Laske hinta',
    calculator_result: 'Kokonaishinta: -',
    contact_title: 'Ota yhteyttä',
    contact_name: 'Nimi:',
    contact_email: 'Sähköposti:',
    contact_message: 'Viesti:',
    contact_btn: 'Lähetä',
    contact_phone: 'Puhelin: 040 123 4567',
    contact_email2: 'Sähköposti: <a href="mailto:jesper.laihinen@gmail.com">jesper.laihinen@gmail.com</a>',
    payment_title: 'Maksutiedot',
    payment_desc: 'Voit maksaa työn jälkeen MobilePaylla tai käteisellä.',
    payment_mobilepay: 'MobilePay-numero: <strong>040 123 4567</strong>',
    faq_title: 'Usein kysytyt kysymykset',
    faq_q1: 'Miten kotitalousvähennys toimii?',
    faq_a1: 'Voit saada 35 % vähennyksen palvelun hinnasta verotuksessa.',
    faq_q2: 'Mitä työajat sisältävät?',
    faq_a2: 'Työajat sisältävät kaikki pihatyöt, sopimuksen mukaan.',
    about_title: 'Tietoa meistä',
    about_desc: 'Yritys perustettu 2025, tavoitteena luotettavat ja laadukkaat piha- ja lumityöt.',
    footer: '&copy; 2025 Jesper Laihinen',
  },
  en: {
    nav_home: 'Home',
    nav_services: 'Services',
    nav_calculator: 'Price Calculator',
    nav_contact: 'Contact',
    nav_faq: 'FAQ',
    nav_about: 'About Us',
    home_title: 'Welcome to Garden Services',
    home_desc: 'Reliable and affordable yard and snow work – just for you.',
    services_title: 'Our Services',
    services_lawn: '<strong>Lawn mowing</strong> – precise and careful cut (€/m²)',
    services_rake: '<strong>Raking / Sweeping</strong> – easy yard cleaning (€/m²)',
    services_bush: '<strong>Bush trimming</strong> – priced by length (€/m)',
    services_snow: '<strong>Snow work</strong> – fixed one-time or seasonal price',
    calculator_title: 'Price Calculator',
    calculator_area: 'Plot size (m²):',
    calculator_lawn: 'Lawn mowing',
    calculator_rake: 'Raking / Sweeping',
    calculator_bush: 'Bush trimming',
    calculator_snow: 'Snow work',
    calculator_bushlength: 'Bush length (m):',
    calculator_btn: 'Calculate price',
    calculator_result: 'Total price: -',
    contact_title: 'Contact',
    contact_name: 'Name:',
    contact_email: 'Email:',
    contact_message: 'Message:',
    contact_btn: 'Send',
    contact_phone: 'Phone: 040 123 4567',
    contact_email2: 'Email: <a href="mailto:jesper.laihinen@gmail.com">jesper.laihinen@gmail.com</a>',
    payment_title: 'Payment info',
    payment_desc: 'You can pay after the work by MobilePay or cash.',
    payment_mobilepay: 'MobilePay number: <strong>040 123 4567</strong>',
    faq_title: 'Frequently Asked Questions',
    faq_q1: 'How does the household tax credit work?',
    faq_a1: 'You can get a 35% deduction from the service price in taxation.',
    faq_q2: 'What do working hours include?',
    faq_a2: 'Working hours include all yard work, as agreed.',
    about_title: 'About Us',
    about_desc: 'Company founded in 2025, aiming for reliable and high-quality yard and snow work.',
    footer: '&copy; 2025 Jesper Laihinen',
  }
};

function setLanguage(lang) {
  const dict = translations[lang] || translations.fi;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'SUMMARY' || el.tagName === 'LABEL' || el.tagName === 'BUTTON' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'P' || el.tagName === 'SPAN' || el.tagName === 'LI' || el.tagName === 'DIV') {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Valikon sulkeminen linkkiä klikattaessa
  const sideMenu = document.getElementById('navLinks');
  const sideMenuLinks = document.querySelectorAll('#navLinks a');
  sideMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      sideMenu.classList.remove('open');
    });
  });

  // Kielivalitsin
  const langSel = document.getElementById('languageSelector');
  setLanguage(langSel.value);
  langSel.addEventListener('change', function() {
    setLanguage(this.value);
  });
});

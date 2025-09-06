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
  if (isNaN(area) || area <= 0) {
    alert('Anna tontin koko oikeassa muodossa!');
    return;
  }

  const pensaatChecked = document.getElementById('pensaatCheckbox').checked;
  let bushLength = 0;
  if (pensaatChecked) {
    bushLength = parseFloat(document.getElementById('bushLength').value);
    if (isNaN(bushLength) || bushLength < 0) {
      alert('Anna pensaiden pituus oikein (0 tai enemmän)!');
      return;
    }
  }

  const palvelut = document.querySelectorAll('input[name="service"]:checked');
  if (palvelut.length === 0) {
    alert('Valitse vähintään yksi palvelu!');
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
document.addEventListener('DOMContentLoaded', () => {
  const sideMenu = document.getElementById('navLinks');
  const sideMenuLinks = document.querySelectorAll('#navLinks a');

  sideMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      sideMenu.classList.remove('open');
    });
  });

  // Sähköpostin piilotus spämmiroboteilta
  const emailContainer = document.getElementById('emailContainer');
  const email = 'jesper.laihinen' + '@' + 'gmail.com';
  emailContainer.innerHTML = 'Sähköposti: <a href="mailto:' + email + '">' + email + '</a>';

  // Formspree-lomakkeen validointi ja AJAX-lähetys
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;
      // Nimi
      const name = contactForm.name.value.trim();
      if (name.length < 2) {
        document.getElementById('nameError').innerText = 'Anna vähintään 2 merkkiä.';
        valid = false;
      } else {
        document.getElementById('nameError').innerText = '';
      }
      // Sähköposti
      const email = contactForm.email.value.trim();
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Anna kelvollinen sähköpostiosoite.';
        valid = false;
      } else {
        document.getElementById('emailError').innerText = '';
      }
      // Viesti
      const message = contactForm.message.value.trim();
      if (message.length < 5) {
        document.getElementById('messageError').innerText = 'Viesti liian lyhyt.';
        valid = false;
      } else {
        document.getElementById('messageError').innerText = '';
      }
      // Honeypot
      if (contactForm._gotcha.value) {
        valid = false;
      }
      if (!valid) {
        return false;
      }
      // Lähetä lomake AJAX:lla
      const formData = new FormData(contactForm);
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          contactForm.style.display = 'none';
          document.getElementById('formSuccess').style.display = 'block';
          document.getElementById('formSuccess').style.color = 'green';
          document.getElementById('formSuccess').innerText = 'Kiitos viestistäsi! Otamme yhteyttä mahdollisimman pian.';
        } else {
          response.json().then(data => {
            let errorMsg = 'Lähetys epäonnistui.';
            if (data.errors && data.errors.length > 0) {
              errorMsg = data.errors.map(e => e.message).join(', ');
            }
            document.getElementById('formSuccess').style.display = 'block';
            document.getElementById('formSuccess').style.color = 'red';
            document.getElementById('formSuccess').innerText = errorMsg;
          });
        }
      })
      .catch(() => {
        document.getElementById('formSuccess').style.display = 'block';
        document.getElementById('formSuccess').style.color = 'red';
        document.getElementById('formSuccess').innerText = 'Lähetys epäonnistui. Yritä myöhemmin uudelleen.';
      });
    });
  }
});

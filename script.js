// Hinnat €/m² tai €/m (pensaat)
const hinnat = {
  nurmikko: 1.0,    // €/m²
  haravointi: 0.5,  // €/m²
  pensaat: 10.0,    // €/m (pensaiden pituus)
  lumi: 20.0        // €/kerta (kiinteä)
};

// Menu painike (liukuvalikko)
const menuButton = document.getElementById('menuButton');
const sideMenu = document.getElementById('sideMenu');

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
  
  document.getElementById('menuButton').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

let currentLang = 'fi';

function translatePage() {
  document.documentElement.lang = currentLang;
  document.querySelector('h1').textContent = currentLang === 'fi' ? 'Viherveikot' : 'Viherveikot';
  document.querySelector('#services h2').textContent = currentLang === 'fi' ? 'Palvelut' : 'Services';
  document.querySelector('#calculator h2').textContent = currentLang === 'fi' ? 'Hinta-arviolaskuri' : 'Cost Estimator';
  document.querySelector('#contact h2').textContent = currentLang === 'fi' ? 'Ota yhteyttä' : 'Contact Us';
  document.querySelector('#calc-form button').textContent = currentLang === 'fi' ? 'Laske hinta' : 'Calculate Cost';
  document.querySelector('#contact-form button').textContent = currentLang === 'fi' ? 'Lähetä' : 'Send';
  document.querySelector('footer p').textContent = currentLang === 'fi' ? '© 2025 Viherveikot' : '© 2025 Viherveikot';
}

function renderServices() {
  const list = document.getElementById('service-list');
  list.innerHTML = '';
  Object.keys(SERVICE_PRICES).forEach(key => {
    const service = SERVICE_PRICES[key];
    const li = document.createElement('li');
    li.textContent = currentLang === 'fi' ? service.fi : service.en;
    list.appendChild(li);
  });
}

function renderCalculatorForm() {
  const form = document.getElementById('calc-form');
  form.innerHTML = '';
  Object.keys(SERVICE_PRICES).forEach(key => {
    const service = SERVICE_PRICES[key];
    let label, input;
    if (key === 'bush_trimming') {
      label = document.createElement('label');
      label.textContent = currentLang === 'fi' ? `${service.fi} (metriä)` : `${service.en} (meters)`;
      input = document.createElement('input');
      input.type = 'number';
      input.min = '0';
      input.name = key;
      input.placeholder = currentLang === 'fi' ? 'Metrit' : 'Meters';
      form.appendChild(label);
      form.appendChild(input);
    } else {
      label = document.createElement('label');
      label.textContent = currentLang === 'fi' ? `${service.fi} (m²)` : `${service.en} (m²)`;
      input = document.createElement('input');
      input.type = 'number';
      input.min = '0';
      input.name = key;
      input.placeholder = currentLang === 'fi' ? 'Neliöt' : 'Square meters';
      form.appendChild(label);
      form.appendChild(input);
      if (key === 'snow_shoveling') {
        // Option for gravel layer
        const gravelLabel = document.createElement('label');
        gravelLabel.textContent = currentLang === 'fi' ? 'Lisää sorakerros?' : 'Add gravel layer?';
        const gravelCheckbox = document.createElement('input');
        gravelCheckbox.type = 'checkbox';
        gravelCheckbox.name = 'gravel_layer';
        form.appendChild(gravelLabel);
        form.appendChild(gravelCheckbox);
      }
    }
  });
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = currentLang === 'fi' ? 'Laske hinta' : 'Calculate Cost';
  form.appendChild(submitBtn);
}

function calculateCost(e) {
  e.preventDefault();
  let total = 0;
  let details = [];
  Object.keys(SERVICE_PRICES).forEach(key => {
    const service = SERVICE_PRICES[key];
    const value = parseFloat(e.target[key]?.value) || 0;
    if (value > 0) {
      let cost = 0;
      if (key === 'bush_trimming') {
        cost = value * service.price_per_meter;
        details.push(`${currentLang === 'fi' ? service.fi : service.en}: ${value}m × ${service.price_per_meter}€ = ${cost.toFixed(2)}€`);
      } else {
        cost = value * service.price_per_m2;
        let extra = 0;
        if (key === 'snow_shoveling' && e.target.gravel_layer?.checked) {
          extra = value * service.gravel_layer;
          details.push(`${currentLang === 'fi' ? 'Sorakerros' : 'Gravel layer'}: ${value}m² × ${service.gravel_layer}€ = ${extra.toFixed(2)}€`);
        }
        details.push(`${currentLang === 'fi' ? service.fi : service.en}: ${value}m² × ${service.price_per_m2}€ = ${(cost).toFixed(2)}€`);
        cost += extra;
      }
      total += cost;
    }
  });
  const result = document.getElementById('calc-result');
  result.innerHTML = `<div>${details.join('<br>')}</div><div>${currentLang === 'fi' ? 'Yhteensä' : 'Total'}: <strong>${total.toFixed(2)}€</strong></div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lang-fi').addEventListener('click', () => {
    currentLang = 'fi';
    translatePage();
    renderServices();
    renderCalculatorForm();
  });
  document.getElementById('lang-en').addEventListener('click', () => {
    currentLang = 'en';
    translatePage();
    renderServices();
    renderCalculatorForm();
  });
  translatePage();
  renderServices();
  renderCalculatorForm();
  document.getElementById('calc-form').addEventListener('submit', calculateCost);
});

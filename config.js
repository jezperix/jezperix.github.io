
// Service price configuration
// To modify prices or add new services, edit the SERVICE_PRICES object below.
// Each service can have Finnish (fi) and English (en) names, and price fields.
// Example for adding a new service:
// new_service: {
//   fi: 'Uusi palvelu',
//   en: 'New service',
//   price_per_m2: 1.0 // EUR per m²
// }
const SERVICE_PRICES = {
  grass_cutting: {
    fi: 'Nurmikon leikkaus',
    en: 'Grass cutting',
    price_per_m2: 0.5 // EUR per m²
  },
  snow_shoveling: {
    fi: 'Lumityöt',
    en: 'Snow shoveling',
    price_per_m2: 0.7, // EUR per m²
    gravel_layer: 1.5 // EUR per m² extra
  },
  leaf_raking: {
    fi: 'Lehtien haravointi',
    en: 'Leaf raking',
    price_per_m2: 0.4 // EUR per m²
  },
  bush_trimming: {
    fi: 'Pensaiden leikkaus',
    en: 'Bush trimming',
    price_per_meter: 2.0 // EUR per meter
  }
  // Add more services here as needed
};

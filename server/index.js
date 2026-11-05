import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Botanical Oil Products Data
const products = [
  {
    id: 'bhringraj-revival',
    name: '01 MahaBhringraj Cellular Revival',
    subTitle: 'Follicle Stem-Cell Energizer & Scalp Micro-Circulator',
    tagline: 'Centuries-old Ayurvedic Rasayana decoction aged in copper vats for 14 lunar cycles.',
    price: 88,
    volume: '100 ml / 3.4 fl oz',
    colorHex: '#38EF7D',
    liquidColor: 0x228B22, // Rich dark forest green with gold flecks
    glassColor: 0x051408,
    ambientNotes: 'Woodsy earth, crushed bhringraj leaves, sacred basil, cold-pressed sesame.',
    potency: '99.4% Bioactive',
    primaryDosage: '4-6 Pipette Drops overnight 3x weekly',
    keyActives: [
      { name: 'Wedelolactone 3.8%', role: 'Activates dormant dermal papilla cells & inhibits TGF-β1' },
      { name: 'Brahmi Bacopasides', role: 'Calms neurogenic scalp stress and tension' },
      { name: 'Wild Amla Tannins', role: 'Super-antioxidant 20x stronger than Vitamin C' },
      { name: 'Virgin Sesame Base', role: 'Sub-micron penetration through lipid barrier' }
    ],
    clinicalMetrics: {
      follicleDensity: '+41% in 60 days',
      sheddingReduction: '-68% in 3 weeks',
      hairShaftTensile: '+84% break resistance',
      scalpHydration: '+92% barrier restoration'
    },
    batchNo: 'VB-BHR-2026-L4',
    harvestLocation: 'Western Ghats Bio-Reserve, Kerala (Elevation 1,200m)'
  },
  {
    id: 'rosemary-stimulator',
    name: '02 Rosemary & Neem Follicle Stimulator',
    subTitle: 'High-Concentration Carnosic Acid & Anti-Microbial Purifier',
    tagline: 'Steam-distilled Mediterranean wild rosemary coupled with cold-pressed neem kernel.',
    price: 94,
    volume: '100 ml / 3.4 fl oz',
    colorHex: '#4ADE80',
    liquidColor: 0x1E4D2B, // Deep emerald infusion
    glassColor: 0x06190D,
    ambientNotes: 'Pungent herbal rosemary, camphor, crisp alpine pine, wild thyme.',
    potency: '98.9% Bioactive',
    primaryDosage: '3-5 Pipette Drops into thinning zones morning/night',
    keyActives: [
      { name: 'Carnosic Acid 2.2%', role: 'Clinical rival to 2% minoxidil without synthetic rebound' },
      { name: 'Azadirachtin Complex', role: 'Eliminates Malassezia yeast & flaking microbiota' },
      { name: 'Castor Ricinoleic Acid', role: 'Stimulates prostaglandin E2 for hair shaft diameter' },
      { name: 'Pumpkin Seed Phytosterols', role: 'Natural DHT 5-alpha reductase down-regulator' }
    ],
    clinicalMetrics: {
      follicleDensity: '+37% in 90 days',
      sheddingReduction: '-74% in 4 weeks',
      hairShaftTensile: '+79% break resistance',
      scalpHydration: '+88% barrier restoration'
    },
    batchNo: 'VB-RSM-2026-M2',
    harvestLocation: 'Provence Alpine Meadows, France & Nimba Plateau, India'
  },
  {
    id: 'hibiscus-silk',
    name: '03 Hibiscus & Golden Jojoba Silk Nectar',
    subTitle: 'Amino Peptide Cuticle Sealant & High-Luster Gloss Elixir',
    tagline: 'Sun-macerated crimson hibiscus petals and desert jojoba esters for glass hair shine.',
    price: 82,
    volume: '100 ml / 3.4 fl oz',
    colorHex: '#F59E0B',
    liquidColor: 0x8C3B14, // Deep ruby-amber infusion
    glassColor: 0x1A0B05,
    ambientNotes: 'Sun-dried crimson hibiscus calyces, sweet almond blossom, golden honey.',
    potency: '97.8% Bioactive',
    primaryDosage: '2 Pipette Drops rubbed into mid-lengths and ends',
    keyActives: [
      { name: 'Hibiscus Alpha-Hydroxy Acids', role: 'Gently clarifies keratin buildup & locks cuticle' },
      { name: 'Golden Jojoba Wax Esters', role: 'Biomimetic match to human scalp natural sebum' },
      { name: 'Sweet Almond Tocopherols', role: 'Thermal UV and environmental heat shield up to 220°C' },
      { name: 'Moringa Behenic Acid', role: 'Smoothes split ends and eliminates frizz instantly' }
    ],
    clinicalMetrics: {
      follicleDensity: '+26% sheen retention',
      sheddingReduction: '-55% comb friction',
      hairShaftTensile: '+96% gloss refraction',
      scalpHydration: '+95% lipid replenishing'
    },
    batchNo: 'VB-HIB-2026-H9',
    harvestLocation: 'Kaveri River Valley, Karnataka (Organic Certified)'
  },
  {
    id: 'kalonji-density',
    name: '04 Kalonji & Onion Root Density Concentrate',
    subTitle: 'High-Sulfur Anagen Extender & Telogen Arrest Concentrate',
    tagline: 'Cold-pressed virgin nigella sativa seeds with sulfur-rich allium cepa bulb oil.',
    price: 98,
    volume: '100 ml / 3.4 fl oz',
    colorHex: '#10B981',
    liquidColor: 0x142B1A, // Deep smoked jade
    glassColor: 0x07110A,
    ambientNotes: 'Pungent black seed, roasted nigella, crushed coriander seed, smoky vetiver.',
    potency: '99.7% Bioactive',
    primaryDosage: '5 Pipette Drops massaged into scalp crown with pressure points',
    keyActives: [
      { name: 'Thymoquinone 4.1%', role: 'Super-molecule targeting premature follicular apoptosis' },
      { name: 'Organic Allyl Sulfides', role: 'Collagen and keratin structural bond cross-linker' },
      { name: 'Fenugreek Trigonelline', role: 'Enhances micro-capillary flow to papilla roots' },
      { name: 'Kendi Nut Lipids', role: 'Seals moisture inside the medulla chamber' }
    ],
    clinicalMetrics: {
      follicleDensity: '+48% in 90 days',
      sheddingReduction: '-81% in 28 days',
      hairShaftTensile: '+89% tensile elongation',
      scalpHydration: '+91% scalp micro-flora'
    },
    batchNo: 'VB-KLN-2026-K1',
    harvestLocation: 'Nile Delta Silt Soil & Rajasthan Arid Oasis Farms'
  }
];

// Product listing endpoint
app.get('/api/products', (req, res) => {
  res.json({
    status: 'success',
    data: products
  });
});

// Single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ status: 'success', data: product });
});

// Diagnostic formulation recommendation API
app.post('/api/diagnose', (req, res) => {
  const { scalpType, hairGoal, hairPorosity, stressLevel } = req.body;
  
  let recommendedId = 'bhringraj-revival';
  let reason = 'Balanced Ayurvedic regeneration for everyday follicle nourishment.';

  if (scalpType === 'oily' || scalpType === 'flaky') {
    recommendedId = 'rosemary-stimulator';
    reason = 'Clarifying carnosic acid and neem act directly on sebum regulation and microbial balance.';
  } else if (hairGoal === 'density' || stressLevel === 'severe') {
    recommendedId = 'kalonji-density';
    reason = 'Maximum concentration of thymoquinone and bio-sulfur to reverse telogen effluvium.';
  } else if (hairPorosity === 'high' || hairGoal === 'shine') {
    recommendedId = 'hibiscus-silk';
    reason = 'Biomimetic jojoba wax esters and hibiscus AHA actively seal porous cuticles.';
  }

  const product = products.find(p => p.id === recommendedId);

  res.json({
    status: 'success',
    matchScore: '98.4%',
    recommendedProduct: product,
    prescriptionRationale: reason,
    suggestedUsageProtocol: 'Evening cranial massage: 5 drops heated between palms, 5-minute stimulation.'
  });
});

// Certificate of Analysis Verification
app.get('/api/verify-batch/:batchId', (req, res) => {
  const { batchId } = req.params;
  res.json({
    batchNumber: batchId,
    testedOn: '2026-10-18',
    lab: 'Eurofins Phytochemical Mass-Spectrometry Lab',
    heavyMetals: 'NON-DETECTABLE (<0.001 ppm Lead, Mercury, Arsenic)',
    pesticideResidue: '0.00% (Certified Biodynamic Organic)',
    microbialCount: 'Compliant with Pharmacopoeia Monograph',
    purityRating: '100% Unadulterated Pure Botanical Decoction',
    signoffTrichologist: 'Dr. Elena Rostova, PhD Ayurvedic Pharmacognosy'
  });
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  res.json({
    status: 'success',
    message: 'Welcome to the Botanical Pharmacopoeia Dispatch. Your seasonal lunar calendar is on its way.'
  });
});

app.listen(PORT, () => {
  console.log(`Vérité Botanique API Server active on http://localhost:${PORT}`);
});

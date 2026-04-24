import emaarLogo from '../assets/EMAAR.jpg';
import azizi from '../assets/azizi.png';
import sobha from '../assets/sobha.png';
import meraas from '../assets/merras.jpg';

const companyLogos = {
  'EMAAR': emaarLogo,
  'AZIZI': azizi,
  'SOBHA': sobha,
  'MERAAS': meraas
};

export const getCompanyLogo = (companyName) => {
  if (!companyName) return null;
  const normalized = companyName.toUpperCase().trim();
  return companyLogos[normalized] || null;
};

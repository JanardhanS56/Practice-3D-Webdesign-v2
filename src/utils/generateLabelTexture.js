import * as THREE from 'three';

/**
 * Generates an ultra-detailed procedural canvas texture for the apothecary bottle label.
 * Produces crisp, luxury foil-stamped apothecary graphics.
 */
export function generateLabelTexture(product) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Background: Deep dark matte charcoal with fine paper grain
  ctx.fillStyle = '#0B110D';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle noise / parchment paper texture
  for (let i = 0; i < 40000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const opacity = Math.random() * 0.035;
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Label outer hairline borders (Neon Lime & Gold)
  ctx.lineWidth = 4;
  ctx.strokeStyle = product?.colorHex || '#38EF7D';
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
  ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);

  // Corner decorative marks
  const drawCorner = (x, y, dx, dy) => {
    ctx.beginPath();
    ctx.moveTo(x, y + dy * 25);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * 25, y);
    ctx.strokeStyle = '#38EF7D';
    ctx.lineWidth = 3;
    ctx.stroke();
  };
  drawCorner(65, 65, 1, 1);
  drawCorner(canvas.width - 65, 65, -1, 1);
  drawCorner(65, canvas.height - 65, 1, -1);
  drawCorner(canvas.width - 65, canvas.height - 65, -1, -1);

  // Header Brand Name
  ctx.textAlign = 'center';
  ctx.font = '600 48px "Cinzel", "Cormorant Garamond", serif';
  ctx.fillStyle = '#C5A059'; // Pale gold
  ctx.letterSpacing = '12px';
  ctx.fillText('• V É R I T É   B O T A N I Q U E •', canvas.width / 2, 160);

  // Subtitle
  ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#8EA798';
  ctx.letterSpacing = '6px';
  ctx.fillText('BIODYNAMIC CELLULAR PHARMACOPOEIA', canvas.width / 2, 215);

  // Center Line Divider with emblem
  ctx.strokeStyle = 'rgba(56, 239, 125, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 380, 260);
  ctx.lineTo(canvas.width / 2 - 40, 260);
  ctx.moveTo(canvas.width / 2 + 40, 260);
  ctx.lineTo(canvas.width / 2 + 380, 260);
  ctx.stroke();

  // Emblem icon in center
  ctx.fillStyle = product?.colorHex || '#38EF7D';
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 260, 14, 0, Math.PI * 2);
  ctx.fill();

  // Product Name (Hero Title on Label)
  ctx.font = '700 84px "Cinzel", "Cormorant Garamond", serif';
  ctx.fillStyle = '#F3F4F6';
  ctx.letterSpacing = '3px';
  const nameParts = (product?.name || '01 MAHABHRINGRAJ').toUpperCase();
  ctx.fillText(nameParts, canvas.width / 2, 380);

  // Product Subtitle / Active Extract
  ctx.font = 'italic 500 36px "Cormorant Garamond", serif';
  ctx.fillStyle = product?.colorHex || '#38EF7D';
  ctx.letterSpacing = '2px';
  ctx.fillText(product?.subTitle || 'Follicle Stem-Cell Energizer & Scalp Elixir', canvas.width / 2, 450);

  // Botanical Specs Grid
  ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#E5E7EB';
  ctx.letterSpacing = '3px';
  ctx.fillText('ACTIVE EXTRACT: 99.4% BIO-STANDARDIZED', canvas.width / 2, 530);

  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#9CA3AF';
  ctx.fillText('COLD PRESSED EXTRACTION  |  AGED 14 LUNAR CYCLES  |  100 ML (3.4 FL. OZ)', canvas.width / 2, 580);

  // Secondary Divider
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.beginPath();
  ctx.moveTo(200, 640);
  ctx.lineTo(canvas.width - 200, 640);
  ctx.stroke();

  // Bottom Apothecary Details (3 Columns)
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#C5A059';
  ctx.textAlign = 'left';
  ctx.fillText('BATCH SERIAL', 180, 710);
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#E5E7EB';
  ctx.fillText(product?.batchNo || 'VB-BHR-2026-L4', 180, 745);

  ctx.textAlign = 'center';
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#C5A059';
  ctx.fillText('CERTIFIED AYUSH & GMP', canvas.width / 2, 710);
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#E5E7EB';
  ctx.fillText('100% UNREFINED ORGANIC', canvas.width / 2, 745);

  ctx.textAlign = 'right';
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#C5A059';
  ctx.fillText('ORIGIN', canvas.width - 180, 710);
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#E5E7EB';
  ctx.fillText('WESTERN GHATS, INDIA', canvas.width - 180, 745);

  // Micro-script along bottom
  ctx.textAlign = 'center';
  ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('STORE AWAY FROM DIRECT LIGHT • SHAKE BEFORE APPLICATION • FOR EXTERNAL SCALP USE ONLY', canvas.width / 2, 860);

  // Create Three.js Texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

export function getColors(imageData, headPalette, rgbToHexNoAlpha, rgbToHex, isColorInPalette, colorMargin) {
    const pixels = imageData.data;
    const colorMap = new Map();
    const paletteRgb = headPalette
        .map((color) => hexToRgb(color))
        .filter(Boolean);

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        const key = `${r},${g},${b},${a}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
    }

    const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([color, count]) => {
            const [r, g, b, a] = color.split(',').map(Number);
            const hexRgb = rgbToHexNoAlpha(r, g, b);
            return {
                r,
                g,
                b,
                a,
                count,
                hex: rgbToHex(r, g, b, a),
                inPalette: isColorInPalette(r, g, b, paletteRgb, colorMargin),
                hexRgb
            };
        });

    return sortedColors;
};

export function rgbToHex(r, g, b, a) {
        const rgb = [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
        if (a === 255) {
            return `#${rgb}`;
        }
        const alpha = a.toString(16).padStart(2, '0');
        return `#${rgb}${alpha}`;
};

export function rgbToHexNoAlpha(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
};

function hexToRgb(hex) {
    const normalized = hex.replace('#', '').trim();
    if (normalized.length !== 6) return null;
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)
        ? null
        : { r, g, b };
};

export function isColorInPalette(r, g, b, paletteRgb, colorMargin = 1) {
    return paletteRgb.some((palette) => (
        Math.abs(palette.r - r) <= colorMargin
        && Math.abs(palette.g - g) <= colorMargin
        && Math.abs(palette.b - b) <= colorMargin
    ));
};

export function findClosestPaletteColor(inputColor, palette) {
    // Convert input color to RGB if it's hex
    const inputRgb = typeof inputColor === 'string' 
        ? hexToRgb(inputColor)
        : inputColor;
    
    if (!inputRgb) return null;

    // Convert palette to RGB if needed
    const paletteRgb = palette.map(color => 
        typeof color === 'string' ? hexToRgb(color) : color
    ).filter(Boolean);

    if (paletteRgb.length === 0) return null;

    // Calculate Euclidean distance in RGB space
    let closest = paletteRgb[0];
    let minDistance = Infinity;

    paletteRgb.forEach((paletteColor) => {
        const distance = Math.sqrt(
            Math.pow(inputRgb.r - paletteColor.r, 2) +
            Math.pow(inputRgb.g - paletteColor.g, 2) +
            Math.pow(inputRgb.b - paletteColor.b, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closest = paletteColor;
        }
    });

    return closest;
};
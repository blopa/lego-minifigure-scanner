import usMexicoMapping from './json/us_mexico_minifigures.json';
import euMapping from './json/eu_minifigures.json';

export const determineMinifigure = (qrString) => {
    // Extract the region identifier and the figure code from the string
    const regionIdentifier = qrString.match(/[RS]/);

    // Extract the relevant part of the code
    const minifigureCode = qrString.split(' ')[0];

    // Determine the mapping based on the region
    const mapping = regionIdentifier === 'R' ? usMexicoMapping : euMapping;

    // Return the minifigure name if found
    return mapping[minifigureCode] || "Unknown Minifigure";
};

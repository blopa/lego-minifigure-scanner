import series25Mapping from './jsons/minifigure_series_25.json';

export const determineMinifigure = (qrString) => {
    // Extract the region identifier and the figure code from the string
    const regionIdentifier = qrString.match(/[RS]/)?.at(0);

    // Extract the relevant part of the code
    const minifigureCode = qrString.split(' ')?.at(0);

    // Find the minifigure
    const minifigure = series25Mapping.find(
        (minifigure) => minifigure.codes.includes(`${regionIdentifier}${minifigureCode}`)
    );

    // Return the minifigure name if found
    return minifigure || {
        name: 'Unknown Minifigure',
        image: "unknown.png",
    };
};

export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

import { countryCodeToCoordinates } from './countryCodeToCoordinates';
const geocodingPath = 'geocoding/v5';
const mapboxRootUrl = 'https://api.mapbox.com/';

type PlaceType = (
  | 'country'
  | 'region'
  | 'postcode'
  | 'district'
  | 'place'
  | 'locality'
  | 'neighborhood'
  | 'address'
  | 'poi'
)[];

export interface MapboxPlace {
  id: string;
  place_type: PlaceType;
  address?: string;
  text: string;
  place_name: string;
  center: [number, number]; // [longitude, latitude]
  geometry: {
    type: 'Point';
    coordinates: [number, number];
    interpolated?: boolean;
    omitted?: boolean;
  };
  context?: {
    id: string;
    text: string;
    short_code?: string;
  }[];
}

/* v8 ignore start */
export const getMatchingPlaces = async (
  mapboxAccessToken: string,
  locale: string,
  searchText: string,
  country?: string,
  proximityCountry?: string,
): Promise<MapboxPlace[] | undefined> => {
  const adjustedSearchText = sanitizeSearchText(searchText);
  const urlEncodedSearchText = encodeURIComponent(adjustedSearchText);
  const url = new URL(
    `${mapboxRootUrl}${geocodingPath}/mapbox.places/${urlEncodedSearchText}.json`,
  );
  const proximity = proximityCountry
    ? countryCodeToCoordinates[proximityCountry]
    : 'ip';
  const params: { [key in string]: string } = {
    limit: '5',
    ...(country ? { country } : {}),
    ...(proximity ? { proximity } : {}),
    language: locale,
    geometries: 'geojson',
    access_token: mapboxAccessToken,
    types: 'place,locality,neighborhood,address,poi',
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key]),
  );

  let response;
  try {
    response = await fetch(url.toString());
  } catch (error) {
    console.log('ERROR', error);
    return;
  }

  const { features }: { features: MapboxPlace[] } = await response.json();
  return features;
};
/* v8 ignore stop */

const mapboxLimits = {
  MAX_NUMBER_OF_TOKENS: 20,
  MAX_NUMBER_OF_CHAR: 256,
};

const spacesAndDashesRegex = /[\s-]+/;

export const sanitizeSearchText = (searchText: string): string => {
  const shortenSearchText = shortenLengthOfSearchText(searchText);
  return shortenSearchText.replace(/;/g, '');
};

const shortenLengthOfSearchText = (searchText: string): string => {
  const shortenedSearchText = searchText
    .trim()
    .substring(0, mapboxLimits.MAX_NUMBER_OF_CHAR);

  const searchArray = shortenedSearchText
    ? shortenedSearchText.split(spacesAndDashesRegex)
    : [];

  let adjustedSearchText = shortenedSearchText;
  if (searchArray.length > mapboxLimits.MAX_NUMBER_OF_TOKENS) {
    const shortenedSearchArray = searchArray.slice(
      0,
      mapboxLimits.MAX_NUMBER_OF_TOKENS,
    );
    adjustedSearchText = shortenedSearchArray.join(' ');
  }
  return adjustedSearchText;
};

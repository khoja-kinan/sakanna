export const baseUrl = "https://sakanna.net/backend/api";
export const baseImageUrl = "https://sakanna.net/backend/public/upload/";

export const GetAllCommunities = `${baseUrl}/communities`;
export const GetAllTypes = `${baseUrl}/alltypes`;
export const getAllAmenities = `${baseUrl}/allamenities`;
export const getAllContacts = `${baseUrl}/allcontacts`;
export const getAllFloors = `${baseUrl}/allfloors`;
export const getAllInteriorSamples = `${baseUrl}/allinteriorsamples`;

export const getComunityById = `${baseUrl}/community`;

export const getTypeById = `${baseUrl}/communityTypes/`;
export const deleteTypeUrl = `${baseUrl}/types/`;
export const EditTypeUrl = `${baseUrl}/types/`;
export const NewTypeUrl = `${baseUrl}/types`;

export const getAmenitiesByCommunityId = `${baseUrl}/communityAmenities`;
export const AddNewAmenity = `${baseUrl}/amenity`;

export const getComunityFloor = `${baseUrl}/community/`;
export const EditFloorUrl = `${baseUrl}/floors`;

export const getComunityInterior = `${baseUrl}/community/`;

export const contactUs = `${baseUrl}/contacts`;

export const search = `${baseUrl}/types/?`;
/* Front Apis */
export const getTypeByIdFront = `${baseUrl}/community/`;

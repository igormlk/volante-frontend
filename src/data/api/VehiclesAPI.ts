import { api } from "./config";

export const getVehiclesAPI = async (searchValue = '', page = 1) => (await api.get('vehicles/search', {params: { searchValue, page }})).data
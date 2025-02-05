import { api } from "./config";

export const getCustomersAPI = async (searchValue = '', page = 1) => (await api.get('customers/search', {params: { searchValue: searchValue.trim(), page }})).data
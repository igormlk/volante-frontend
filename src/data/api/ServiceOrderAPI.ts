import { ServiceOrder } from "@/pages/ServiceOrder/types";
import { api, estimateAPI } from "./config";
import { AxiosResponse } from "axios";

const createServiceOrderAPI = () => ({
    get: (searchValue = '', page = 1, filter: 'vehicle' | 'customer' = 'vehicle'): Promise<AxiosResponse> => {
        return api.get('service_orders/search', {params: { [filter]: searchValue, page, startDate: '2024-11-06T01:58:58.926Z', endDate: '2024-12-31T01:58:58.926Z' }})
    },
    put: (serviceOrder: Partial<ServiceOrder>):Promise<AxiosResponse<ServiceOrder>> => {
        const filteredSO: ServiceOrder = Object.keys(serviceOrder).reduce((acc, key) => {
            const value = serviceOrder[key as keyof ServiceOrder];
            if (value) {
              (acc as any)[key as keyof ServiceOrder] = value;
            }
            return acc;
          }, {} as ServiceOrder);

        return api.post('service_orders', filteredSO)
    },
    delete: (uuid: string) => {
        return api.delete(`service_order_items/${uuid}`)
    },
    uploadVehicleImage: (imageFile: File, orderId: string, description: string = "") => {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("order_id", orderId);
        formData.append("description", description);
    
        return estimateAPI.put("vehicle/photo", formData);
      }
})

const ServiceOrderAPI = createServiceOrderAPI()
export default ServiceOrderAPI
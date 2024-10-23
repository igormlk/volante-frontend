import { ServiceOrder } from "@/pages/ServiceOrder/types"
import { BASE_URL } from "@/routes/const";

// export async function getServiceOrderAPI(): Promise<ServiceOrder>{
//     return {
//         id: crypto.randomUUID(),
//         status: STATUS_SERVICE_ORDER.PENDING,
//         created_at: new Date().toJSON(),
//         last_saved_at: new Date().toJSON(),
//         customer: DEFAULT_CUSTOMER_VALUE,
//         vehicle: DEFAULT_VEHICLE_VALUES,
//         images: [],
//         insurance_company: '',
//         duration_quantity: 0,
//         duration_type: 'day',
//         items: []
//     }
// }

export const getServiceOrderAPI = (searchValue = '', page = 1, filter: 'vehicle' | 'customer' = 'vehicle') => fetch(BASE_URL + `service_orders/search?${filter}=` + searchValue + '&page=' + page).then(res => res.json());

// export async function putServiceOrderItemAPI(data: ServiceOrderItem){
//     return 
// }

// export async function putServiceOrderCustomerAPI(data: CustomerSchema){
//     return 
// }

// export async function putServiceOrderVehicleAPI(_data: VehicleSchema){
//     return 
// }

export async function putServiceOrderAPI(data: Partial<ServiceOrder>){
    return fetch(`${BASE_URL}service_orders`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify({...data})
    }).then(res => res.ok && res.json())
}

export async function deleteServiceOrderItem(id: string){
    return fetch(`${BASE_URL}service_order_items/` + id, {
        method: 'DELETE',
        headers: {
            'Accept': "application/json"
        },
    })
}
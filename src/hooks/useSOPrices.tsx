import { ServiceOrderItem } from "@/pages/ServiceOrder/types"
import { useEffect, useState } from "react"

const useSOPrices = (itemsList: ServiceOrderItem[]) => {

    const reducePrices = (list: ServiceOrderItem[]) => {
        return list.reduce((acc, item) => {
            const itemTotal = Number((item.value * (item.quantity || 1)) - item.discount)
            return {
                subtotal: acc.subtotal + Number((item.value * (item.quantity || 1))),
                totalPrice: acc.totalPrice + itemTotal,
                totalServicesPrice: acc.totalServicesPrice + (item.type !== "PARTS" ? itemTotal : 0),
                totalPartsPrice: acc.totalPartsPrice + (item.type === "PARTS" ? itemTotal : 0),
                totalDiscountPrice: acc.totalDiscountPrice + Number(item.discount)
            }
        }, {subtotal: 0, totalPrice: 0, totalServicesPrice: 0, totalPartsPrice: 0, totalDiscountPrice: 0})
    }

    const [prices, setPrices] = useState(reducePrices(itemsList || []))

    useEffect(() => {
        setPrices(reducePrices(itemsList))
    }, [JSON.stringify(itemsList)])

    return { ...prices };
}
 
export default useSOPrices;
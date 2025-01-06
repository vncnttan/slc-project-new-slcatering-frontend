import {toast} from "@zerodevx/svelte-toast";
import type { OrderType } from '../../types/order.type';


const ERROR_TYPE_TOAST_OPTIONS = [{
    "--toastBackground": "#B02000",
    "--toastColor": "#fff",
    "--toastProgressBackground": "#fff",
    "--toastProgressColor": "#B02000",
}, {
    "--toastBackground": "#008000",
    "--toastColor": "#fff",
    "--toastProgressBackground": "#fff",
    "--toastProgressColor": "#008000"
}, {
    "--toastBackground": "#0000FF",
    "--toastColor": "#fff",
    "--toastProgressBackground": "#fff",
    "--toastProgressColor": "#0000FF"
}, {
    "--toastBackground": "#FFA500",
    "--toastColor": "#fff",
    "--toastProgressBackground": "#fff",
    "--toastProgressColor": "#FFA500"
}]

export enum TOAST_TYPE {
    ERROR = 0,
    SUCCESS = 1,
    INFO = 2,
    WARNING = 3
}

export const showToast = (message: string, type: TOAST_TYPE) => {
    toast.push(message, {
        theme: {...ERROR_TYPE_TOAST_OPTIONS[type],
            "--toastMsgPadding": "1rem 1rem",
            "--toastWidth": "20rem",
        },
    })
}

export const formatPrice = (price: number) => {
    const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(price);

    return formatted.slice(0, -3) + ",-";
}

export const getOrderSummary = (orders: OrderType[]) => {
    const orderSummaries = {} as Record<string, number>

    for (const order of orders) {
        if (order.variant) {
            if (orderSummaries[order.variant.variant_name]) {
                orderSummaries[order.variant.variant_name] += order.quantity;
            } else {
                orderSummaries[order.variant.variant_name] = order.quantity;
            }
        } else {
            if (orderSummaries["Reguler"]) {
                orderSummaries["Reguler"] += order.quantity;
            } else {
                orderSummaries["Reguler"] = order.quantity;
            }
        }
    }
    return orderSummaries;
}
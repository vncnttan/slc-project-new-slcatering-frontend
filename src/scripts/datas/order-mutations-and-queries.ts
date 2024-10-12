import axios from "axios";

import type { OrderRequestType } from '../../../types/order-request.type';

const base_url = import.meta.env.VITE_BACKEND_BASE_URL;

export function getCateringOrders(id: string) {
    return axios.get(`${base_url}/order?id=${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export function getUserOrders(access_token: string) {
    return axios.get(`${base_url}/order`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    })
}

export function createOrder(order: OrderRequestType, access_token: string) {
    return axios.post(`${base_url}/order`, order, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    })
}
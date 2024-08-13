
import axios from "axios";
import type {MenuInformationType} from "../custom-type-declarations";


const base_url = import.meta.env.VITE_BACKEND_BASE_URL;

export function createMenu(menu: MenuInformationType, access_token: string) {
    return axios.post(`${base_url}/catering`, menu, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    })
}

export function getActiveMenus() {
    return axios.get(`${base_url}/catering?active=true`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export function getCateringByMerchantId(access_token: string) {
    return axios.get(`${base_url}/catering?active=false`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    })

}

export function getCateringDetailsById(id: string) {
    return axios.get(`${base_url}/catering?id=${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export function getMostPopularMenu(){
    return axios.get(`${base_url}/leaderboards?menu=true`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
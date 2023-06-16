import { Fetch, methodGet } from "./base";

export async function GetIPInfo() {
    return await Fetch(methodGet, '/ip')
}

export async function GetGeo(location:string,adm:string) {
    return await Fetch(methodGet,`/geo?location=${location}&adm=${adm}`)
}

export async function GetWeather(location:string) {
    return await Fetch(methodGet, `/weather/now?location=${location}`)
}
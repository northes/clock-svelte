export const baseUrl: string = "https://dev.apihut.co"
export const methodGet: string = "GET"
export const methodPost: string = "POST"

export const Fetch = async function (method: string, uri: string) {
    let response = await fetch(baseUrl + uri, {
        method: method,
    })

    if (response.ok) {
        return await response.json()
    } else {
        throw new Error(response.statusText)
    }
}
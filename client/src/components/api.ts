import axios from 'axios'

const endpoint =
    window.location.origin === 'http://localhost:3000'
        ? 'http://localhost:3080'
        : window.location.origin;



type Art = {
    name: string,
    imageurl: string,
    price: number,
    rating: number
}
export async function getArt() {
    try {
        const { data } = await axios.get(`${endpoint}/api/gallery`)
        // console.log(data);
        return data
    } catch (err) {
        console.error(err);
        return []
    }
}

export async function search(searchText: string) {

}
import axios from 'axios'
import { Orders } from './ContextTypes';

const endpoint =
    window.location.origin === 'http://localhost:3000'
        ? 'http://localhost:3080'
        : window.location.origin;

export async function getArt() {
    try {
        const { data } = await axios.get(`${endpoint}/api/gallery`)
        // // console.log(data);
        return data
    } catch (err) {
        console.error(err);
        return []
    }
}

export async function search(searchText: string) {
    try {
        const { data } = await axios.get(`${endpoint}/api/search/${searchText}`)
        return data
    } catch (err) {
        console.error(err);
        return null
    }
}

export async function getRating(artname: string) {
    try {
        const { data } = await axios.get(`${endpoint}/api/getrating/${artname}`)
        if (data.length === 0)
            return 5;
        const avg = data.reduce((total: any, next: { rating: any; }) => total + next.rating, 0) / data.length
        const avgLimit = Math.floor(avg * 100) / 100
        return avgLimit.toFixed(1)
    } catch (err) {
        console.error(err);
        return null
    }
}

export async function postRating(rating: number, username: string, artname: string) {
    try {
        axios.get(`${endpoint}/api/getratingid`).then(async function (resp) {
            const maxVal = Math.max(...resp.data.map((o: { rating_id: any; }) => o.rating_id), 0)
            console.log(maxVal);
            const { data } = await axios.post(`${endpoint}/api/postrating/`, {
                "rating": rating,
                "username": username,
                "artname": artname,
                "id": maxVal + 1
            })
            return data
        })

    } catch (err) {
        console.error(err);
        return null
    }
}

export async function getComments(artname: string) {
    try {
        const { data } = await axios.get(`${endpoint}/api/getcomment/${artname}`)
        if (data.length === 0) return []
        return data
    } catch (err) {
        console.log(err);
        return []
    }
}

export async function postComment(comment: string, username: string, artname: string) {
    try {
        axios.get(`${endpoint}/api/getcommentid`).then(async function (resp) {
            const maxVal = Math.max(...resp.data.map((o: { comment_id: any; }) => o.comment_id), 0)
            console.log(maxVal);
            const { data } = await axios.post(`${endpoint}/api/postcomment`, {
                "comment": comment,
                "artname": artname,
                "username": username,
                "id": maxVal + 1
            })
            console.log(data);
            return data
        })

    } catch (err) {
        console.error(err);
        return null
    }
}

export async function getUser(username: string) {
    try {
        const res = await axios.post(`${endpoint}/api/user`, { username: username })
        // // console.log(res);
        return res
    } catch (error) {
        console.error(error);

    }
}

export async function getDeliveries(artist: string) {
    try {
        const res = await axios.get(`${endpoint}/api/deliveries/${artist}`)
        return res.data
    } catch (err) {
        console.log(err);
        return null
    }
}

export async function getOrderList(username: string) {
    try {
        const res = await axios.post(`${endpoint}/api/listorders`, { username: username })
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export async function createArt(artist: string, artname: string, url: string, price: number, about: string) {
    try {
        const res = await axios.post(`${endpoint}/api/createart`, { artist: artist, artname: artname, imageurl: url, price: price, about: about })
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export async function getpostedart(username: string) {
    try {
        const res = await axios.post(`${endpoint}/api/getpostedart`, { username: username })
        return res.data
    } catch (err) {
        console.error(err)
    }
}

export async function placeOrder(order: Orders) {
    try {
        const res = await axios.post(`${endpoint}/api/placeorder`,
            { username: order.username, artname: order.artname, address: order.address, booked: order.booked, due: order.due })
        // console.log(res.data);

        return res.data
    } catch (error) {
        console.error(error);
    }
}

export async function deleteOrder(username: string, artname: string) {
    try {
        const res = await axios.post(`${endpoint}/api/deleteorder`, {
            username: username,
            artname: artname
        })
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export async function deleteArt(username: string, artname: string) {
    try {
        const res = await axios.post(`${endpoint}/api/deleteart`, {
            username: username,
            artname: artname
        })
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export async function register(username: string, usernameName: string, email: string, password: string, usertype: number,) {
    const sql = `insert into user (username, firstname, email, password, usertype) values ("${username}", "${usernameName}", "${email}", "${password}", ${usertype})` as string;
    try {
        const res = await axios.post(`${endpoint}/api/register`, { "sql": sql, "username": username })
        // console.log(res);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function login(username: string, password: string) {
    try {
        const res = await axios.post(`${endpoint}/api/login`, { username: username, password: password });
        return res
    } catch (Err) {
        console.error(Err);
    }
}

export async function logout() {
    try {
        const res = await axios.get(`${endpoint}/api/logout`)
        // console.log(res);
        return res
    } catch (err) {
        console.error(err)
    }
}

// Admin API

export async function allUsers() {
    try {
        const res = await axios.get(`${endpoint}/api/allusers`)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

export async function deleteUser(username: string) {
    try {
        const res = await axios.post(`${endpoint}/api/deleteuser`, {
            username: username
        })
        return res.data
    } catch (err) {
        console.error(err)
    }
}

export async function allOrders() {
    try {
        const res = await axios.get(`${endpoint}/api/allorders`)
        return res.data
    } catch (err) {
        console.error(err)
    }
}
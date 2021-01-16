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

export async function getUser(username: string) {
    try {
        const res = await axios.post(`${endpoint}/api/user`, { username: username })
        // // console.log(res);
        return res
    } catch (error) {
        console.error(error);

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
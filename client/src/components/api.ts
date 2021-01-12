import axios from 'axios'

const endpoint =
    window.location.origin === 'http://localhost:3000'
        ? 'http://localhost:3080'
        : window.location.origin;

export async function getArt() {
    try {
        const { data } = await axios.get(`${endpoint}/api/gallery`)
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
        console.log(res);
        return res
    } catch (error) {
        console.error(error);

    }
}

export async function register(username: string, usernameName: string, email: string, password: string, usertype: number,) {
    const sql = <string>`insert into user (username, firstname, email, password, usertype) values ("${username}", "${usernameName}", "${email}", "${password}", ${usertype})`;
    try {
        const res = await axios.post(`${endpoint}/api/register`, { "sql": sql, "username": username })
        console.log(res);
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
        console.log(res);
        return res
    } catch (err) {
        console.error(err)
    }
}
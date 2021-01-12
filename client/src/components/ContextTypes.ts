export interface Art {
    name: string,
    imageurl: string,
    price: number,
    rating: number,
    comment: string
}

export interface SearchArt {
    name: string,
    url: string,
    price: number,
    rating: number,
    comment: string
}

export type UserType = {
    email: string;
    firstname: string;
    username: string;
    usertype: number;
}
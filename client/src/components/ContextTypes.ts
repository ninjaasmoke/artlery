export interface Art {
    name: string,
    imageurl: string,
    price: number,
    about: string,
    rating: number,
    comment: string
}

export interface Orders {
    username: string;
    artname: string;
    address: string;
    booked: string;
    due: string;
}

export interface Comments {
    username: string;
    comment: string;
}

export type UserType = {
    email: string;
    firstname: string;
    username: string;
    usertype: number;
}
interface UserAdressGeo {
    lat: string;
    lng: string;
}

interface UsersAdress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: UserAdressGeo;
}

interface UserCompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface Users {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UsersAdress;
    phone: string;
    website: string;
    company: UserCompany;
}
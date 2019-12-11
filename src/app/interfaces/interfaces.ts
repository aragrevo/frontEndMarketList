export interface ResponseMarkets {
    ok: boolean;
    page: number;
    markets: Market[];
}

export interface Market {
    state?: boolean;
    products?: Product[];
    _id?: string;
    user?: User;
    created?: string;
}

export interface User {
    avatar?: string;
    _id?: string;
    name?: string;
}

export interface Product {
    product?: any;
    quantity?: any;
}

export interface ResponseCategories {
    ok: boolean;
    heading: string;
    categories: Category[];
}

export interface Category {
    category: string;
    link: string;
    image: string;
}
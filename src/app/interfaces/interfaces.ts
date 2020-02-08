export interface ResponseMarkets {
    ok: boolean;
    page: number;
    markets: Market[];
}

export interface Market {
    state?: boolean;
    products?: OrderProduct[];
    _id?: string;
    user?: User;
    created?: string;
}

export interface User {
    avatar?: string;
    _id?: string;
    name?: string;
    profile?: string;
}

export interface OrderProduct {
    product?: string;
    _id?: string;
    quantity?: number;
}

export interface ResponseCategories {
    ok: boolean;
    count: number;
    categories: Category[];
}

export interface Category {
    _id?: string;
    category?: string;
    link?: string;
    image?: string;
}

export interface ResponseSubcategories {
    ok: boolean;
    count: number;
    category: string;
    subcategories: Subcategory[];
}

export interface Subcategory {
    _id?: string;
    subcategory?: string;
    link?: string;
    category?: string;
}

export interface ResponseProducts {
    ok: boolean;
    count: number;
    products: Product[];
}

export interface Product {
    _id?: string;
    product?: string;
    subcategory?: Subcategory;
}


import type { JsonNullClass, JsonValue } from "@prisma/client/runtime/client";

export interface IProduct {
    uuid: string;
    created_at: Date;
    name: string;
    description: string;
    product_type: string;
    image: string;
    features?: string[];
    acronym?: string | null;
    composition: JsonValue; 
}

export interface IUser {
    user_id: string;
    name: string;
    email: string;
    password: string;
    user_type: string;    
}

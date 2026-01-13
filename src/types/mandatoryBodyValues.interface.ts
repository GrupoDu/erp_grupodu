import type { IUser } from "./models.interface.js";

export interface IMandatoryBodyValues extends IUser {
    description: string;
    product_type: string;
    image: string;
} 
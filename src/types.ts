export type Tusers = {
    id: string
    name: string
    email: string
    password: string
    createdAt: string
 }
 
 export type Tproducts = {
     id: string
     name: string
     price: number
     description: string
     imageUrl: string
 }

 export type Tpurchase = {
    id: string;
    buyer: string;
    totalPrice: number;
    productId: string;
    quantity: number;
};
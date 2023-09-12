import { Tproducts, Tusers } from "./types";

export const users: Tusers[] = [
    {
      id: "u001",
      name: "Fulano",
      email: "fulano@email.com",
      password: "fulano123",
      createdAt: new Date().toISOString()
    },
    {
      id: "u002",
      name: "Beltrana",
      email: "beltrana@email.com",
      password: "beltrana00",
      createdAt: new Date().toISOString()
    }
]

export const products: Tproducts[] = [
    {
      id: "prod001",
      name: "Mouse Gamer",
      price: 250,
      description: "Melhor mouse do mercado!",
      imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
      id: "prod002",
      name: "Monitor",
      price: 900,
      description: "Monitor LED Full HD 24 polegadas",
      imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
]

// Função para criar um novo usuario e adicionar ao array 'users'
export const createUser = (id: string, name: string, email: string, password: string): string => {
   const createdAt = new Date().toISOString()
   const newUser = {id, name, email, password, createdAt}
   users.push(newUser)
   return "Cadastro realizado com sucesso"
}

// Função para buscar os usuarios e retornar o array atualizado
export const getAllUsers = (): Tusers[] => {
    return users
}

// Função para criar um novo produto e adicionar ao array 'products'
export const createProduct = (id: string, name: string, price: number, description: string, imageUrl: string): string => {
    const createdAt = new Date().toISOString()
    const newProducts = {id, name, price, description, imageUrl}
    products.push(newProducts)
    return "Cadastro realizado com sucesso"
 }
 
// Função para buscar os produtos e retornar o array atualizado
export const getAllProducts = () => {
    return products
 }

// Função para buscar produtos por nome 
export const searchProductsByName = (name: string): Tproducts[] => {
    const searchTerm = name.toLowerCase(); 
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
  };




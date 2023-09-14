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
    },
    {
      id: "u003",
      name: "Kevin",
      email: "kevin@email.com",
      password: "kevin00",
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
    },
    {
      id: "prod003",
      name: "Teclado",
      price: 695,
      description: "Teclado Mêcanico RGB",
      imageUrl: "https://picsum.photos/seed/Teclado/400"
    }
]
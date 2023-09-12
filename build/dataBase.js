"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
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
];
exports.products = [
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
];
// Função para criar um novo usuario e adicionar ao array 'users'
const createUser = (id, name, email, password) => {
    const createdAt = new Date().toISOString();
    const newUser = { id, name, email, password, createdAt };
    exports.users.push(newUser);
    return "Cadastro realizado com sucesso";
};
exports.createUser = createUser;
// Função para buscar os usuarios e retornar o array atualizado
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
// Função para criar um novo produto e adicionar ao array 'products'
const createProduct = (id, name, price, description, imageUrl) => {
    const createdAt = new Date().toISOString();
    const newProducts = { id, name, price, description, imageUrl };
    exports.products.push(newProducts);
    return "Cadastro realizado com sucesso";
};
exports.createProduct = createProduct;
// Função para buscar os produtos e retornar o array atualizado
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
// Função para buscar produtos por nome 
const searchProductsByName = (name) => {
    const searchTerm = name.toLowerCase();
    return exports.products.filter(product => product.name.toLowerCase().includes(searchTerm));
};
exports.searchProductsByName = searchProductsByName;

"use strict";
//console.log('Aplicativo INDEX.TS foi iniciado!');
Object.defineProperty(exports, "__esModule", { value: true });
const dataBase_1 = require("./dataBase");
//console.log('Produtos:', products);
//console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"));
//console.log(users);
//console.log(getAllUsers());
console.log((0, dataBase_1.searchProductsByName)('gamer'));

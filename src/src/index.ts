import express, { Request, Response} from 'express'
import cors from 'cors'
import { products, users } from './dataBase';
import { Tproducts, Tusers } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// Exercicio 1 
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// Exercicio 2 - Get All Users
app.get("/users", (req: Request, res: Response) => {
   res.status(200).send(users)
})

// Exercicio 2 - Get All Products
app.get("/products", (req: Request, res: Response) => {
   res.status(200).send(products)
})

// Exercicio 2 - Refatorar o GET /products
app.get("/products/search", (req: Request, res: Response) => {
   const query: string = req.query.name as string
   if (query) {
      const result: Tproducts[] = products.filter((product) => product.name.toLowerCase() === query.toLowerCase())
      res.status(200).send(result)
   } else {
      res.status(200).send(products)
   }
})

// Exercicio 3 - Create User
app.post('/users', (req: Request, res: Response) => {
   const {id, name, email, password}: Tusers = req.body
   const createdAt = new Date().toISOString();
   const newUser: Tusers = {id, name, email, password, createdAt}
   users.push(newUser)

   res.status(201).send('Cadastro realizado com sucesso')
})

// Exercicio 3 - Create products
app.post('/products', (req: Request, res: Response) => {
   const {id, name, price, description, imageUrl}: Tproducts = req.body
   const newProduct: Tproducts = {id, name, price, description, imageUrl}
   products.push(newProduct)

   res.status(201).send('Cadastro realizado com sucesso')
})

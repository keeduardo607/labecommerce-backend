import express, { Request, Response} from 'express'
import cors from 'cors'
import { products, users } from './dataBase';
import { Tproducts, Tusers } from './types';
import { db } from './database/knex';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", async (req: Request, res: Response) => {
   try {
      res.status(200).send({message: "Pong!"})
   } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
         res.status(500)
      }

      if (error instanceof Error) {
         res.send(error.message)
      } else {
         res.send("Erro Inesperado")
      }
      
   }
})

// Get All Users
app.get("/users", async (req, res) => {
   try {

     const resultUsers = await db.raw(`SELECT * FROM users`)

     res.status(200).send(resultUsers)

   } catch (error) {
     console.error(error);
     res.status(500).send({ message: 'Ocorreu um erro ao buscar os usuários.' });
   }
 });

//  Get All Products
app.get("/products", async (req: Request, res: Response) => {
   
   try {

     const resultProducts = await db.raw(`SELECT * FROM products`)

     res.status(200).send(resultProducts)

   }

   catch (error: any) {
     res.status(500).send("Ocorreu um erro ao buscar os produtos.");
   }
})

//  Refatorar o GET /products
app.get("/products/search", async (req, res) => {
   try {
     const query = req.query.name as string;
 
     if (query.length <= 1) {
       throw new Error("Ocorreu um erro ao processar a solicitação.");
     }
 
     const queryString = `
       SELECT * FROM products
       WHERE LOWER(name) = ?
     `;
     const bindings = [query.toLowerCase()];
 
     const products = await db.raw(queryString, bindings);
 
     res.status(200).send(products[0]);
   } catch (error: any) {
     if (error instanceof Error) {
       res.status(404).send(error.message);
     }
   }
 });

// Create User
app.post('/users', async (req, res) => {
   try {
     const { id, name, email, password } = req.body;
 
     if (
       typeof id !== "string" ||
       typeof name !== "string" ||
       typeof email !== "string" ||
       typeof password !== "string"
     ) {
       res.status(400).send({ message: "Os dados devem ser do formato 'string'!" });
       return;
     }

     const query = `
       SELECT * FROM users
       WHERE id = ? OR email = ?
     `;
     const bindings = [id, email];
 
     const existingUser = await db.raw(query, bindings);
 
     if (existingUser[0].length > 0) {
       res.status(400).send({ message: "O ID ou Email já existe!" });
       return;
     }
 
     const createdAt = new Date().toISOString();
 
     const insertQuery = `
       INSERT INTO users (id, name, email, password, created_at)
       VALUES (?, ?, ?, ?, ?)
     `;
     const insertBindings = [id, name, email, password, createdAt];
 
     await db.raw(insertQuery, insertBindings);
 
     res.status(201).send({ message: 'Cadastro realizado com sucesso' });
   } catch (error: any) {
     console.error(error);
     res.status(500).send({ message: 'Ocorreu um erro no servidor' });
   }
 });

// Create products
app.post('/products', async (req, res) => {
   try {
     const { id, name, price, description, imageUrl } = req.body;
 
     if (
       typeof id !== "string" ||
       typeof name !== "string" ||
       typeof description !== "string" ||
       typeof imageUrl !== "string" ||
       typeof price !== "number"
     ) {
       res.status(400).send({ message: "Os dados devem ser do formato 'string' e o preço do formato 'number'." });
       return;
     }
 
     const query = `
       SELECT * FROM products
       WHERE id = ?
     `;
     const bindings = [id];
 
     const existingProduct = await db.raw(query, bindings);
 
     if (existingProduct[0].length > 0) {
       res.status(400).send({ message: "O ID passado já existe!" });
       return;
     }
 
     const insertQuery = `
       INSERT INTO products (id, name, price, description, imageUrl)
       VALUES (?, ?, ?, ?, ?)
     `;
     const insertBindings = [id, name, price, description, imageUrl];
 
     await db.raw(insertQuery, insertBindings);
 
     res.status(201).send({ message: 'Cadastro realizado com sucesso' });
   } catch (error: any) {
     console.error(error);
     res.status(500).send({ message: 'Ocorreu um erro no servidor' });
   }
 });
 
 
// Create purchase
app.post('/purchases', async (req, res) => {
   try {
     const { id, buyer, products } = req.body;
 
     if (!id || !buyer || !products) {
       return res.status(400).send({ message: 'Campos inválidos na solicitação' });
     }
 
     const insertQuery = `
       INSERT INTO purchases (id, buyer, products)
       VALUES (?, ?, ?)
     `;
     const insertBindings = [id, buyer, JSON.stringify(products)];
 
     await db.raw(insertQuery, insertBindings);
 
     res.status(201).send({ message: 'Pedido realizado com sucesso' });
   } catch (error: any) {
     console.error(error);
     res.status(500).send({ message: 'Ocorreu um erro no servidor' });
   }
 });
 

// Delete User by id
app.delete("/users/:id", (req: Request, res: Response) => {

  try {

   const idToDelete = req.params.id
   const indexUser = users.findIndex((user) => user.id === idToDelete)

   if (indexUser === -1) {
      res.statusCode = 404
      throw new Error ("Usuario não existe, portanto, não é possível deleta-la!")
   }

   if (indexUser >= 0) {
     users.splice(indexUser, 1)
   }

   res.status(200).send("User apagado com sucesso!")
  }

  catch (error: any) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }

})

// Delete Product by id
app.delete("/products/:id", (req: Request, res: Response) => {

  try {

   const idByProducts = req.params.id
   const indexProducts = products.findIndex((product) => product.id === idByProducts)

   if (indexProducts === -1) {
      res.statusCode = 404
      throw new Error ("Produto não existe, portanto, não é possível deleta-la!")
   }
 
   if (indexProducts >= 0) {
     products.splice(indexProducts, 1)
   }
 
   res.status(200).send("Produto apagado com sucesso!")
  }

  catch (error: any) {
   if (error instanceof Error) {
      res.send(error.message)
   }
  }
 })

 // Delete purchase by Id
 app.delete('/purchases/:id', async (req, res) => {
   try {
     const id = req.params.id;

     const existingPurchase = await db('purchases').where('id', id).first();
     if (!existingPurchase) {
       res.status(404).send({ message: "Esse pedido não existe!" });
       return;
     }

     const deleteQuery = `
       DELETE FROM purchases
       WHERE id = ?
     `;
     const deleteBindings = [id];
 
     await db.raw(deleteQuery, deleteBindings);
 
     res.status(200).send({ message: 'Pedido excluído com sucesso!' });
   } catch (error: any) {
     console.error(error);
     res.status(500).send({ message: 'Ocorreu um erro no servidor' });
   }
 });

 // Edit Product by id
 app.put("/products/:id", async (req, res) => {
   try {
     const idByProducts = req.params.id;

     const existingProduct = await db('products').where('id', idByProducts).first();
     if (!existingProduct) {
       res.status(404).send({ message: "Esse produto não existe!" });
       return;
     }
 
     const {
       id: newId = existingProduct.id,
       name: newName = existingProduct.name,
       description: newDescription = existingProduct.description,
       imageUrl: newImageUrl = existingProduct.imageUrl,
       price: newPrice = existingProduct.price,
     } = req.body;

     const updateQuery = `
       UPDATE products
       SET id = ?, name = ?, description = ?, imageUrl = ?, price = ?
       WHERE id = ?
     `;
     const updateBindings = [newId, newName, newDescription, newImageUrl, newPrice, idByProducts];
 
     await db.raw(updateQuery, updateBindings);
 
     res.status(200).send({ message: 'Produto atualizado com sucesso!' });
   } catch (error: any) {
     console.error(error);
     res.status(500).send({ message: 'Ocorreu um erro no servidor' });
   }
 });
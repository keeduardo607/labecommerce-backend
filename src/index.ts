import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './database/knex';
import { Tproducts, Tusers } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// Get All Users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await db.select().from('users'); 
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Ocorreu um erro ao buscar os usuários.");
  }
});

// Get All Products
app.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await db.select().from('products'); 
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send("Ocorreu um erro ao buscar os produtos.");
  }
});

// Refatorar o GET /products
app.get("/products/search", async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.name as string;

    if (query.length <= 1) {
      throw new Error("Ocorreu um erro ao processar a solicitação.");
    }

    const products = await db.select().from('products'); 

    if (query) {
      const result: Tproducts[] = products.filter((product) => product.name.toLowerCase() === query.toLowerCase());
      res.status(200).send(result);
    } else {
      res.status(200).send(products);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
});

// Create User
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { id, name, email, password }: Tusers = req.body;
    const checkExistingUserId = req.body.id;
    const checkExistUserEmail = req.body.email;

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(404).send("Os dados devem ser do formato 'string'!");
    } else {
      await db('users').insert({ id, name, email, password }); 
      res.status(201).send('Cadastro realizado com sucesso');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
});

// Create products
app.post('/products', async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl }: Tproducts = req.body;
    const checkExistingProductId = req.body.id;

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof imageUrl !== "string" ||
      typeof price !== "number"
    ) {
      res.status(404).send("Os dados devem ser do formato string.");
    } else {
      await db('products').insert({ id, name, price, description, imageUrl }); 
      res.status(201).send('Cadastro realizado com sucesso');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Ocorreu um erro interno.");
    }
  }
});


// Delete User by id
app.delete("/users/:id", async (req: Request, res: Response) => {
   try {
     const idToDelete = req.params.id;
     
     const result = await db('users').where({ id: idToDelete }).del();
     
     if (result === 0) {
       res.status(404).send("Usuário não existe, portanto, não é possível deletá-lo.");
     } else {
       res.status(200).send("Usuário apagado com sucesso!");
     }
   } catch (error: any) {
     res.status(500).send(error.message);
   }
 });
 
 // Delete Product by id
 app.delete("/products/:id", async (req: Request, res: Response) => {
   try {
     const idToDelete = req.params.id;
 
     const result = await db('products').where({ id: idToDelete }).del();
 
     if (result === 0) {
       res.status(404).send("Produto não existe, portanto, não é possível deletá-lo.");
     } else {
       res.status(200).send("Produto apagado com sucesso!");
     }
   } catch (error: any) {
     res.status(500).send(error.message);
   }
 });

 // Edit Product by id
 app.put("/products/:id", async (req: Request, res: Response) => {
   try {
     const idByProducts = req.params.id;
     const { id, name, price, description, imageUrl }: Tproducts = req.body;
 
     if (
       typeof id !== "string" ||
       typeof name !== "string" ||
       typeof description !== "string" ||
       typeof imageUrl !== "string" ||
       typeof price !== "number"
     ) {
       res.status(404).send("Os dados devem ser do formato correto.");
     } else {
       const result = await db('products').where({ id: idByProducts }).update({ id, name, price, description, imageUrl });
 
       if (result === 0) {
         res.status(404).send("Produto não existe, portanto, não é possível atualizá-lo.");
       } else {
         res.status(200).send("Produto atualizado com sucesso!");
       }
     }
   } catch (error: any) {
     res.status(500).send(error.message);
   }
 });

// Get Purchase by id
app.get("/purchases/:id", async (req: Request, res: Response) => {
   try {
     const purchaseId = req.params.id;
 
     const purchase = await db
       .select(
         'purchaseId',
         'buyerId',
         'buyerName',
         'buyerEmail',
         'totalPrice',
         'createdAt'
       )
       .from('purchases')
       .where({ purchaseId })
       .first();
 
     if (!purchase) {
       res.status(404).send("Compra não encontrada");
     } else {
       res.status(200).send(purchase);
     }
   } catch (error: any) {
     res.status(500).send(error.message);
   }
 }); 

// Refatore - Get Purchase by id 
app.get("/purchases/:id", async (req: Request, res: Response) => {
   try {
     const purchaseId = req.params.id;
 
     const purchase = await db
       .select(
         'purchaseId',
         'buyerId',
         'buyerName',
         'buyerEmail',
         'totalPrice',
         'createdAt'
       )
       .from('purchases')
       .where({ purchaseId })
       .first();
 
     if (!purchase) {
       res.status(404).send("Compra não encontrada");
       return;
     }
 
     const products = await db
       .select(
         'products.id',
         'products.name',
         'products.price',
         'products.description',
         'products.imageUrl',
         'purchase_products.quantity'
       )
       .from('purchase_products')
       .join('products', 'purchase_products.productId', 'products.id')
       .where({ purchaseId });
 
     purchase.products = products;
 
     res.status(200).send(purchase);
   } catch (error: any) {
     res.status(500).send(error.message);
   }
 });

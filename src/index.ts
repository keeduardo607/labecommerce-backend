import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './database/knex';
import { Tproducts, Tpurchase, Tusers } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// Get All Users
app.get('/users', async (req: Request, res: Response): Promise<void> => {
  const users: Tusers = await db
      .select('id', 'name', 'email', 'password', 'createad_at as createdAt')
      .from('users');
  try {
      res.status(200).send(users);
  } catch (error: any) {
      if (res.statusCode === 200) {
          res.status(500);
          res.send('Erro inesperado');
      }
      res.send(error.message);
  }
});

// Get All Products
app.get('/products', async (req: Request, res: Response): Promise<void> => {
  const name = req.query.name;
  try {
      if (name) {
          const checkProduct = await db('products').where(
              'name',
              'like',
              `%${name}%`
          );
          if (checkProduct) {
              res.status(200).send(checkProduct);
          } else {
              res.status(400);
              throw new Error(
                  `Nenhum produto com o termo ${name} encontrado.`
              );
          }
      } else {
          const products: Tproducts = await db('products').select(
              'id',
              'name',
              'price',
              'description',
              'image_url as imageUrl'
          );
          res.status(200).send(products);
      }
  } catch (error: any) {
      if (res.statusCode === 200) {
          res.status(500);
          res.send('Erro inesperado');
      }
      res.send(error.message);
  }
});

// Create User
app.post('/users', async (req: Request, res: Response) => {
  try {
      const { id, name, email, password }: Tusers = req.body;
      if (typeof id !== 'string') {
          res.status(400);
          throw new Error("O campo 'id' deve ser uma string");
      }
      if (typeof name !== 'string') {
          res.status(400);
          throw new Error("O campo 'Nome' deve ser uma string");
      }
      if (typeof email !== 'string') {
          res.status(400);
          throw new Error("O campo 'E-mail' deve ser uma string");
      }
      if (typeof password !== 'string') {
          res.status(400);
          throw new Error("O campo 'Senha' deve ser uma string");
      }
      const checkUser = await db('users').where({ id });
      const checkEmail = await db('users').where({ email });
      if (checkUser.length) {
          res.status(400);
          throw new Error(
              "O 'id' informado já existe, tente novamente com um novo id"
          );
      }
      if (checkEmail.length) {
          res.status(400);
          throw new Error(
              "O 'email' informado já existe, tente novamente com um novo email"
          );
      }
      await db('users').insert({ id, name, email, password });
      res.status(201).send('Cadastro realizado com sucesso');
  } catch (error: any) {
      console.log(error.message);
      res.send(error.message);
  }
});

// Create products
app.post('/products', async (req: Request, res: Response) => {
  try {
      const { id, name, price, description, imageUrl }: Tproducts = req.body;
      if (typeof id !== 'string') {
          res.status(400);
          throw new Error("O campo 'id' deve ser uma string");
      }
      if (typeof name !== 'string') {
          res.status(400);
          throw new Error("O campo 'Nome' deve ser uma string");
      }
      if (typeof price !== 'number') {
          res.status(400);
          throw new Error("O campo 'Preço' deve ser do tipo number");
      }
      if (typeof description !== 'string') {
          res.status(400);
          throw new Error("O campo 'Descrição' deve ser uma string");
      }
      if (typeof imageUrl !== 'string') {
          res.status(400);
          throw new Error("O campo 'URL' deve ser uma string");
      }
      const checkProduct = await db('products').where({ id });
      if (checkProduct.length) {
          res.status(400);
          throw new Error(
              "O 'id' informado já existe, tente novamente com um novo id"
          );
      }
      await db('products').insert({
          id,
          name,
          price,
          description,
          image_url: imageUrl,
      });
      res.status(201).send('Produto cadastrado com sucesso');
  } catch (error: any) {
      console.log(error.message);
      res.send(error.message);
  }
});

//Create Purchase
app.post('/purchases', async (req: Request, res: Response): Promise<void> => {
  try {
      const { id, buyer, totalPrice, productId, quantity }: Tpurchase =
          req.body;
      if (typeof id !== 'string') {
          res.status(400);
          throw new Error("O campo 'Id' deve ser uma string");
      }
      if (typeof buyer !== 'string') {
          res.status(400);
          throw new Error("O campo 'Id do Comprador' deve ser uma string");
      }
      if (typeof totalPrice !== 'number') {
          res.status(400);
          throw new Error("O campo 'Preço Total' deve ser do tipo 'number'");
      }
      if (typeof productId !== 'string') {
          res.status(400);
          throw new Error(
              "O campo 'Id do Produto' deve ser do tipo 'string'"
          );
      }
      if (typeof quantity !== 'number') {
          res.status(400);
          throw new Error("O campo 'Quantidade' deve ser do tipo 'number'");
      }
      const checkPurchase = await db('purchases').where({ id });
      const checkUser = await db('users').where({ id: buyer });
      if (checkPurchase.length) {
          res.status(400);
          throw new Error("O 'id' informado já existe");
      }
      if (!checkUser.length) {
          res.status(400);
          throw new Error("O 'id' informado não existe no banco de usuários");
      }
      await db('purchases').insert({ id, buyer, total_price: totalPrice });
      await db('purchases_products').insert({
          purchase_id: id,
          product_id: productId,
          quantity,
      });
      res.status(201).send('Pedido realizado com sucesso');
  } catch (error: any) {
      if (res.statusCode === 200) {
          res.status(500);
          console.log(error.message);
          res.send('Erro inesperado');
      }
      res.send(error.message);
  }
});

//Delete Puchase By Id
app.delete(
  '/purchases/:id',
  async (req: Request, res: Response): Promise<void> => {
      try {
          const id: string = req.params.id;
          const purchase = await db('purchases').where({ id });
          if (purchase.length) {
              await db('purchases_products').del().where({ purchase_id: id });
              await db('purchases').del().where({ id });
              res.status(200).send('Pedido cancelado com sucesso');
          } else {
              res.status(400);
              throw new Error(
                  "O 'id' informado não existe no banco de dados"
              );
          }
      } catch (error: any) {
          if (res.statusCode === 200) {
              res.status(500);
              console.log(error.message);
              res.send('Erro Inesperado');
          }
          res.send(error.message);
      }
  }
);

//Get Purchase By Id
app.get(
  '/purchases/:id',
  async (req: Request, res: Response): Promise<void> => {
      try {
          const id: string = req.params.id;
          const purchase: { [key: string]: any } = await db('purchases')
              .select(
                  'purchases.id AS purchaseId',
                  'purchases.total_price AS totalPrice',
                  'purchases.created_at AS createdAt',
                  'purchases.paid AS isPaid',
                  'purchases.buyer',
                  'users.email',
                  'users.name'
              )
              .innerJoin('users', 'buyer', '=', 'users.id')
              .where('purchases.id', '=', id);
          if (!purchase.length) {
              res.status(400);
              throw new Error("O 'id' da compra informada não existe");
          }
          const products = await db('purchases_products')
              .select(
                  'products.id',
                  'products.name',
                  'products.price',
                  'products.description',
                  'products.image_url',
                  'quantity'
              )
              .innerJoin('products', 'product_id', '=', 'products.id')
              .where({ purchase_id: id });
          purchase[0].productsList = products;
          res.status(200).send(purchase);
          console.log(purchase);
      } catch (error: any) {
          console.log(error.message);
          res.send(error.message);
      }
  }
);

//Edit Product By Id
app.put('/products/:id', async (req: Request, res: Response): Promise<void> => {
  try {
      const id: string = req.params.id;
      const newId: string | undefined = req.body.id;
      const newName: string | undefined = req.body.name;
      const newPrice: number | undefined = req.body.price;
      const newdescription: string | undefined = req.body.description;
      const newImageUrl: string | undefined = req.body.imageUrl;
      if (typeof id !== 'string') {
          res.status(400);
          throw new Error("O campo 'id' deve ser uma string");
      }
      if (typeof newId !== 'string') {
          res.status(400);
          throw new Error("O campo 'Id' deve ser uma string");
      }
      if (typeof newName !== 'string') {
          res.status(400);
          throw new Error("O campo 'Name' deve ser uma string");
      }
      if (typeof newPrice !== 'number') {
          res.status(400);
          throw new Error("O campo 'Price' deve ser um número");
      }
      if (typeof newdescription !== 'string') {
          res.status(400);
          throw new Error("O campo 'Description' deve ser uma string");
      }
      if (
          typeof newImageUrl !== 'string' &&
          typeof newImageUrl !== undefined
      ) {
          res.status(400);
          throw new Error("O campo 'Image Url' deve ser uma string");
      }
      const [product] = await db('products').where({ id });
      if (product) {
          await db('products')
              .where({ id })
              .update({
                  id: newId || product.id,
                  name: newName || product.name,
                  price: newPrice || product.price,
                  description: newdescription || product.description,
                  image_url:
                      newImageUrl !== undefined
                          ? newImageUrl
                          : product.image_url,
              });
      } else {
          res.status(400);
          throw new Error("O 'id' do produto informado não existe");
      }
      res.status(200).send('Produto atualizado com sucesso');
  } catch (error: any) {
      console.log(error.message);
      res.send(error.message);
  }
});

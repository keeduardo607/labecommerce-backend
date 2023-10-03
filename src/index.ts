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

// Get All Users
app.get("/users", (req: Request, res: Response) => {
   
   try {
      res.status(200).send(users)
   }

   catch (error) {
     res.status(500).send("Ocorreu um erro ao buscar os usuários.");
   }

})

//  Get All Products
app.get("/products", (req: Request, res: Response) => {
   
   try {
     res.status(200).send(products)
   }

   catch (error) {
     res.status(500).send("Ocorreu um erro ao buscar os produtos.");
   }
})

//  Refatorar o GET /products
app.get("/products/search", (req: Request, res: Response): void => {

  try {

   const query = req.query.name as string

   if (query.length <= 1) {
         throw new Error ("Ocorreu um erro ao processar a solicitação.")
      }

   if (query) {
      const result: Tproducts[] = products.filter((product) => product.name.toLowerCase() === query.toLowerCase())
      res.status(200).send(result)
   } else {
      res.status(200).send(products)
   }
  }

  catch (error) {
   if (error instanceof Error) {
      res.statusCode = 404
      res.send(error.message)
   }
  }
})

// Create User
app.post('/users', (req: Request, res: Response) => {
  
   try {

      const {id, name, email, password}: Tusers = req.body
      const checkExistingUserId = req.body.id
      const checkExistUserEmail = req.body.email

      if ( 
         typeof id !== "string" ||
         typeof name !== "string" ||
         typeof email !== "string" ||
         typeof password !== "string"
      ) {
         res.statusCode = 404
         throw new Error ("Os dados devem ser do formato 'string'!")
      }

      if (users.some((user) => user.id === checkExistingUserId)) {
         res.statusCode = 404
         throw new Error ("O ID passado já existe!")
      }

      if (users.some((user) => user.email === checkExistUserEmail)) {
         res.statusCode = 404
         throw new Error ("O Email passado já existe!")
      }

      const createdAt = new Date().toISOString();
      const newUser: Tusers = {id, name, email, password, createdAt}
      users.push(newUser)
   
      res.status(201).send('Cadastro realizado com sucesso')
   }

   catch (error) {
     if (error instanceof Error) {
       res.send(error.message)
     }
   }
})

// Create products
app.post('/products', (req: Request, res: Response) => {

   try {

      const { id, name, price, description, imageUrl }: Tproducts = req.body;
      const checkExistingProductId = req.body.id

      if (
         typeof id !== "string" ||
         typeof name !== "string" ||
         typeof description !== "string" ||
         typeof imageUrl !== "string" ||
         typeof price !== "number"
      ) {
         res.statusCode = 404
         throw new Error ("Os dados devem ser do formato string.")
      }

      if (products.some((product) => product.id === checkExistingProductId)) {
        res.statusCode = 404
        throw new Error ("O ID passado já existe!")
      }

      const newProduct: Tproducts = { id, name, price, description, imageUrl };
      products.push(newProduct);

      res.status(201).send('Cadastro realizado com sucesso');
   } catch (error) {
      if (error instanceof Error) {
         res.status(500).send(error.message);
      } else {
         res.status(500).send("Ocorreu um erro interno.");
      }
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

  catch (error) {
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

  catch (error) {
   if (error instanceof Error) {
      res.send(error.message)
   }
  }
 })

 // Edit Product by id
app.put("/products/:id", (req: Request, res: Response) => {

   try {

   const idByProducts = req.params.id
 
   const newId = req.body.id as string | undefined
   const newName = req.body.name as string | undefined
   const newDescription = req.body.description as string | undefined
   const newImageUrl = req.body.imageUrl as string | undefined
   const newPrice = req.body.price as number | undefined
 
   const product = products.find((product) => product.id === idByProducts)  

   
   if (!product) {
      res.statusCode = 404
      throw new Error ("Esse produto não existe!")
    }
   
   if (newId !== undefined && typeof newId !== "string") {
      throw new Error("O campo 'id' deve ser do formato 'string' ou 'undefined'!");
   }

   if (newName !== undefined && typeof newName !== "string") {
      throw new Error("O campo 'name' deve ser do formato 'string' ou 'undefined'!");
   }

   if (newDescription !== undefined && typeof newDescription !== "string") {
      throw new Error("O campo 'description' deve ser do formato 'string' ou 'undefined'!");
   }

   if (newImageUrl !== undefined && typeof newImageUrl !== "string") {
      throw new Error("O campo 'imageUrl' deve ser do formato 'string' ou 'undefined'!");
   }

   if (newPrice !== undefined && typeof newPrice !== "number") {
      throw new Error("O campo 'price' deve ser do formato 'number' ou 'undefined'!");
   }

   if (product) {
 
     product.id = newId || product.id
     product.name = newName || product.name
     product.description = newDescription || product.description
     product.imageUrl = newImageUrl || product.imageUrl
     product.price = isNaN(Number(newPrice)) ? product.price : newPrice as number
 
   } 
    res.status(200).send("Produto atualizado com sucesso!")
   }

   catch (error) {
     if (error instanceof Error) {
      res.send(error.message)
     }
   }
 })
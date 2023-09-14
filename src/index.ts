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

//  Get All Users & Products

app.get("/users", (req: Request, res: Response) => {
   res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products)
})

// Exercicio 1 - Delete User by id

app.delete("/users/:id", (req: Request, res: Response) => {

   const idToDelete = req.params.id

   const indexUser = users.findIndex((user) => user.id === idToDelete)

   if (indexUser >= 0) {
     users.splice(indexUser, 1)
   }

   res.status(200).send("User apagado com sucesso!")

})

// Exercicio 2 - Delete Product by id

app.delete("/products/:id", (req: Request, res: Response) => {

  const idByProducts = req.params.id

  const indexProducts = products.findIndex((product) => product.id === idByProducts)

  if (indexProducts >= 0) {
    products.splice(indexProducts, 1)
  }

  res.status(200).send("Produto apagado com sucesso!")
})

// Exercicio 3 - Edit Product by id

app.put("/products/:id", (req: Request, res: Response) => {

  const idByProducts = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newDescription = req.body.description as string | undefined
  const newImageUrl = req.body.imageUrl as string | undefined
  const newPrice = req.body.price as number | undefined

  const product = products.find((product) => product.id === idByProducts)

  if (product) {

    product.id = newId || product.id
    product.name = newName || product.name
    product.description = newDescription || product.description
    product.imageUrl = newImageUrl || product.imageUrl
    product.price = isNaN(Number(newPrice)) ? product.price : newPrice as number

  } 
   res.status(200).send("Produto atualizado com sucesso!")
})



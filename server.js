import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();


app.use(express.json());
app.use(cors());


// Criar usuário
app.post('/usuarios', async (req, res) => {
  const { email, name, age } = req.body;

  if (!email || !name || !age) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const user = await prisma.user.create({
      data: { email, name, age }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
});

// Obter todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});

// Atualizar usuário
app.put('/usuarios/:id', async (req, res) => {
  const { email, name, age } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { email, name, age }
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
});

// Deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id }
    });
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ message: "Erro ao deletar usuário" });
  }
})
        




app.listen(3000)

// req -> requisão
// res -> resposta
// http://localhost:3000/usuarios
// Usuario Mongo (mohandasalbuquerque)
// Senha: Wallace021

/*
OK - CRIAR
OK - LER
 - DELETAR
 - EDITAR

 CRUD
 CREATE
 READ
 UPDATE
 DELETE
*/
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json()) // permite ler o corpo das requisições em JSON
app.use(cors()) // permite que o servidor aceite requisições de outras origens

// Rota GET - Lista todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' })
  }
})

// Rota POST - Cria um novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { email, age, name } = req.body

    const user = await prisma.user.create({
      data: { email, age, name }
    })

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.' })
  }
})

// Rota PUT - Atualiza um usuário pelo ID
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { email, age, name } = req.body

    const user = await prisma.user.update({
      where: { id },
      data: { email, age, name }
    })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' })
  }
})

// Rota DELETE - Remove um usuário pelo ID
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.user.delete({
      where: { id }
    })

    res.status(200).json({ mensagem: 'Usuário deletado com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário.' })
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
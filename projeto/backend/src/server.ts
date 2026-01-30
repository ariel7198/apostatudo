import express from 'express'
import cors from 'cors'
import niveisRoutes from './routes/niveis.routes'
import profissionaisRoutes from './routes/profissionais.routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/niveis', niveisRoutes)
app.use('/api/profissionais', profissionaisRoutes)

app.listen(3333, () => {
  console.log('API rodando na porta 3333')
})
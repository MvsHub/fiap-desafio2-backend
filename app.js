import express from 'express';
import mongoose from 'mongoose';
import userRoute from './src/routes/users.route.js';
import postsRoute from './src/routes/posts.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoute);
app.use('/posts', postsRoute);

// Rota básica para verificar o funcionamento da API
app.get("/", (req, res) => {
    res.send("API está funcionando! Acesse /users ou /posts.");
});

// Conexão com o banco de dados MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão com MongoDB estabelecida com sucesso!');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

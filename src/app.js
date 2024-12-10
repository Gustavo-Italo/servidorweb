import express from 'express';
import productManager from './productManager.js'; 

const app = express();
const port = 3000;

const productManagerIstance = new productManager('../products.json');

app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
  });

app.get('/products', async (req, res) => {
  try {
    const limite = parseInt(req.query.limite, 10);
    const products = await productManagerIstance.getProducts();

    if (!isNaN(limite)) {
      return res.json(products.slice(0, limite));
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os produtos.' });
  }
});

app.get('/product/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid, 10); 
    const product = await productManagerIstance.getProductById(pid); 

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'erro ao buscar produto' }); 
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

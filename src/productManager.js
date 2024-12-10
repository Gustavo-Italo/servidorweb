import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class ProductManager {
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    this.filePath = path.join(__dirname, '../data/products.json');
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao ler os produtos:', error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      return products.find(product => product.id === parseInt(id));
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return null;
    }
  }
}

export default ProductManager;





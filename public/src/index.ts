import { sendStat200, sendStat400, sendStat404 } from "./response";
import { validateProducts } from "./validate";
import { newProduct, updateProduct } from "./setProduct";

import express from "express";
import { readFile, writeFile } from "node:fs";

const app = express();
app.use(express.json());

const DATA_DIRECTORY = "public/data/products.json";

app.get("/api/products", (req, res) => {
  readFile(DATA_DIRECTORY, (err: any, data: any) => {
    err ? res.end(err) : res.end(data);
  });
});

app.get("/api/products/:id", (req, res) => {
  readFile(DATA_DIRECTORY, (err: any, data: any) => {
    if (err) return res.end(err);

    const products = JSON.parse(data);
    const product = products.find(
      (product: any) => product.id === parseInt(req.params.id)
    );

    product ? sendStat200(res, product) : sendStat404(res);
  });
});

app.post("/api/*", (req, res) => {
  readFile(DATA_DIRECTORY, (err: any, data: any) => {
    if (err) return res.end(err);

    const products = JSON.parse(data);
    const product = newProduct(req, products);

    const { error } = validateProducts(req.body);
    if (error) return sendStat400(res, error);

    products.push(product);
    const updateProducts = JSON.stringify(products, null, 2);

    writeFile(DATA_DIRECTORY, updateProducts, (err: any) => {
      if (err) return res.end(err);
    });

    sendStat200(res, product);
  });
});

app.put("/api/products/:id", (req, res) => {
  readFile(DATA_DIRECTORY, (err: any, data: any) => {
    if (err) return res.end(err);

    const products = JSON.parse(data);
    const product = products.find(
      (product: any) => product.id === parseInt(req.params.id)
    );
    if (!product) return sendStat404(res);

    const updateProd = updateProduct(req, product);

    const { error } = validateProducts(req.body);
    if (error) return sendStat400(res, error);

    const updateProducts = JSON.stringify(products, null, 2);

    writeFile(DATA_DIRECTORY, updateProducts, (err: any) => {
      if (err) return res.end(err);
    });

    sendStat200(res, updateProd);
  });
});

app.delete("/api/products/:id", (req, res) => {
  readFile(DATA_DIRECTORY, (err: any, data: any) => {
    if (err) return res.end(err);

    const products = JSON.parse(data);
    const product = products.find(
      (product: any) => product.id === parseInt(req.params.id)
    );
    if (!product) return sendStat404(res);

    const index = products.indexOf(product);
    products.splice(index, 1);

    const updateProducts = JSON.stringify(products, null, 2);

    writeFile(DATA_DIRECTORY, updateProducts, (err: any) => {
      if (err) return res.end(err);
    });

    sendStat200(res, product);
  });
});

app.all("*", (req, res) => {
  sendStat404(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}/api/products`)
);

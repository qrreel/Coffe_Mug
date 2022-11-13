import { sendStat200, sendStat404 } from "./response";
import { validateProducts } from "./validate";
import { newProduct, updateProduct } from "./setProduct";
import { DATA_DIRECTORY, saveFile, parseAndFind } from "./func";

import express from "express";
import { readFile } from "node:fs";

const app = express();
app.use(express.json());

app.get("/api/products", (req, res) => {
  readFile(DATA_DIRECTORY, (err: any, data: Buffer) => {
    if (err) return res.end(err);

    const [, array] = parseAndFind(req, data);
    array.length === 0 ? res.end("There's nothing here yet") : res.end(data);
  });
});

app.get("/api/products/:id", (req, res) => {
  readFile(DATA_DIRECTORY, (err: any, data: Buffer) => {
    if (err) return res.end(err);

    const [product] = parseAndFind(req, data);
    product ? sendStat200(res, product) : sendStat404(res);
  });
});

app.post("/api/*", (req, res) => {
  readFile(DATA_DIRECTORY, (err: any, data: Buffer) => {
    if (err) return res.end(err);

    const [, products] = parseAndFind(req, data);
    const product = newProduct(req, products);

    if (validateProducts(req.body, res) != true) return;

    products.push(product);

    saveFile(res, products);
    sendStat200(res, product);
  });
});

app.put("/api/products/:id", (req, res) => {
  readFile(DATA_DIRECTORY, (err: any, data: Buffer) => {
    if (err) return res.end(err);

    const [product, products] = parseAndFind(req, data);
    if (!product) return sendStat404(res);

    const updateProd = updateProduct(req, product);
    if (validateProducts(req.body, res) != true) return;

    saveFile(res, products);
    sendStat200(res, updateProd);
  });
});

app.delete("/api/products/:id", (req, res) => {
  readFile(DATA_DIRECTORY, (err: any, data: Buffer) => {
    if (err) return res.end(err);

    const [product, products] = parseAndFind(req, data);
    if (!product) return sendStat404(res);

    const index = products.indexOf(product);
    products.splice(index, 1);

    saveFile(res, products);
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

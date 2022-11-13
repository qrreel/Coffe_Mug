import { writeFile } from "node:fs";

export const DATA_DIRECTORY = "public/data/products.json";

export function parseAndFind(req: any, data: Buffer) {
  const dataBase = data.toString();
  const products = !dataBase ? [] : JSON.parse(dataBase);
  const product = products.find(
    (product: any) => product.id === parseInt(req.params.id)
  );
  return [product, products];
}

export function saveFile(res: any, products: Array<object>) {
  const updateProducts = JSON.stringify(products, null, 2);

  writeFile(DATA_DIRECTORY, updateProducts, (err: any) => {
    if (err) return res.end(err);
  });
}

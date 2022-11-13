const updateDate = newDate();

function newDate(): string {
  const day: number = new Date().getDate();
  const month: number = new Date().getMonth() + 1;
  const year: number = new Date().getFullYear();

  return day + "/" + month + "/" + year;
}

export function newProduct(req: any, products: any): object {
  const idsArray: Array<number> = products.map((product: any) => product.id);
  const lastId: number = idsArray[idsArray.length - 1];
  const newId: number = lastId + 1;

  const product: object = {
    id: !products ? 1 : newId,
    name: req.body.name,
    price: "$" + req.body.price,
    update: updateDate,
  };

  return product;
}

export function updateProduct(req: any, product: any): object {
  product.name = req.body.name;
  product.price = "$" + req.body.price;
  product.update = updateDate;

  return product;
}

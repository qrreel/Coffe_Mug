const updateDate = newDate();

function newDate(): string {
  const day: number = new Date().getDate();
  const month: number = new Date().getMonth() + 1;
  const year: number = new Date().getFullYear();

  return day + "/" + month + "/" + year;
}

export function newProduct(req: any, products: any) {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: "$" + req.body.price,
    update: updateDate,
  };

  return product;
}

export function updateProduct(req: any, product: any) {
  product.name = req.body.name;
  product.price = "$" + req.body.price;
  product.update = updateDate;

  return product;
}

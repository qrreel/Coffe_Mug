export function sendStat200(res: any, product: object) {
  res.end(JSON.stringify(product, null, 2));
}

export function sendStat404(res: any) {
  res.status(404).end("404! Not Found!");
}

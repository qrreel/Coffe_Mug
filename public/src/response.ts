export function sendStat200(res: any, product: object) {
  res.end(JSON.stringify(product, null, 2));
}

export function sendStat404(res: any) {
  res.status(404).end("404! Not Found!");
}

export function sendStat400(res: any, err: any) {
  res.status(400).end(err.details[0].message);
}

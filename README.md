## Coffe_Mug__Junior NodeJS task

### How to start

1. Install dependencies
2. Build the project - `npm run build`
3. Start the project - `npm run start`

### How to get items
#### Request

`GET / products`

    http://localhost:[port]/api/products


#### Response (200: OK)
    [
      {
        "id": 1,
        "name": "item1",
        "price" "$200",
        "update": 10/11/2022
      },
      {
        "id": 2,
        "name": "item2",
        "price" "$380",
        "update": 11/11/2022
      },
      {
        "id": 3,
        "name": "item3",
        "price" "$150",
        "update": 9/11/2022
      },
      ...
    ]

### How to get specific item
#### Request

`GET / products/:id`

    http://localhost:[port]/api/products/2


#### Response (200: OK)
    {
      "id": 2,
      "name": "item2",
      "price" "$380",
      "update": 11/11/2022
    }

### How to post item
#### Request

 `POST / products/`
 
    http://localhost:[port]/api/*


#### Response (200: OK)
    {
      "id": 4,
      "name": "item4",
      "price" "$130",
      "update": 13/11/2022
    }
    
 
### How to put item
#### Request

 `PUT / products/:id`
 
    http://localhost:[port]/api/products/2


#### Response (200: OK)
    {
      "id": 4,
      "name": "item4",
      "price" "$130",
      "update": 13/11/2022
    }

>**Note**: Port 3000 is set as default.

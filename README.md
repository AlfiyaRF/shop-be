BE for [shop](https://github.com/AlfiyaRF/shop-react-redux-cloudfront)<br />

Lambda functions:<br />
- getProductsList for getting full list of products from db https://rx3w8zwdt0.execute-api.eu-west-1.amazonaws.com/dev/products<br />
- getProductsById for getting exact product by id https://rx3w8zwdt0.execute-api.eu-west-1.amazonaws.com/dev/products/{productId}<br />
- createProduct for adding new product https://rx3w8zwdt0.execute-api.eu-west-1.amazonaws.com/dev/products. For success creation it is required put description, title, price and count.<br />

Integrates with Frontend application by getProductsList Product Service.<br />
Products data is stored on the DB.<br />
Products list is an array of objects with properties:
        {
            count: number,
            description: string,
            id: string,
            price: number,
            title: string
        }
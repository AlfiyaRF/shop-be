BE for [shop](https://github.com/AlfiyaRF/shop-react-redux-cloudfront)<br />

Contains two lambda functions getProductsList and getProductsById.<br />
Integrates with Frontend application by getProductsList Product Service.<br />

Extra points:
- Async/await is used in lambda functions
- ES6 modules are used for Product Service implementation
- Webpack is configured for Product Service
- Lambda handlers (getProductsList, getProductsById) are separated in codebase.
- Main error scenarios are handled by API ("Product not found" error).

Products list is an array of objects with properties:
        {
            count: number,
            description: string,
            id: string,
            price: number,
            title: string
        }
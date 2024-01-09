require('dotenv').config();
const express = require('express');
// const fetch = require('node-fetch');
const app = express();
const graphqlHTTP = require('express-graphql').graphqlHTTP
const schema = require('./Schema/Schema')
const cors = require("cors");

const PORT =3005


const { SHOPIFY_STORE_URL, SHOPIFY_ACCESS_TOKEN } = process.env;
app.use(cors())
app.get('/getProducts', async (req, res) => {
   try {
     const graphqlEndpoint = `https://${SHOPIFY_STORE_URL}/admin/api/2023-10/graphql.json`;
 
     const query = `
       {
         products(first: 5) {
           edges {
             node {
               id
               title
               handle
               description
               bodyHtml
               featuredImage{
                  url
               }
               variants(first: 1) {
                 edges {
                   node {
                     id
                     title
                     
                   }
                 }
               }
             }
           }
         }
       }
     `;
 
     const response = await fetch(graphqlEndpoint, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
       },
       body: JSON.stringify({ query }),
     });
 
     const data = await response.json();
     res.json(data);
   } catch (error) {
     console.error('Error fetching products:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });


app.use('/graphql',graphqlHTTP({schema,graphiql:true}))

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
 }).on('error', (e) => {
    console.log('Error happened: ', e.message)
 });
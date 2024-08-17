const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// middleware
const corsOptions={
    origin:['http://localhost:5173','https://catalogmaster-20865.web.app'],
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tqysnnt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const catalogCollection = client.db("catalogMaster").collection('catalog');

    // Get all product data from db
    app.get('/products',async (req,res)=>{
        const result=await catalogCollection.find().toArray();
        res.json(result);
   })
  } finally {
    
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Catalog Master is running');
})

app.listen(port, () => {
    console.log(`Catalog Master Server is running on port : ${port}`);
})

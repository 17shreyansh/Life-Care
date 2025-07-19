const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

async function checkMongoConnection() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lifecare';
  const client = new MongoClient(uri);
  
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('Successfully connected to MongoDB!');
    
    // List databases to verify connection
    const dbs = await client.db().admin().listDatabases();
    console.log('Available databases:');
    dbs.databases.forEach(db => console.log(` - ${db.name}`));
    
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  } finally {
    await client.close();
    process.exit();
  }
}

checkMongoConnection();
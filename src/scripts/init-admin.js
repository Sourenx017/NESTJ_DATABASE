require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

async function initializeAdmin() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/seiko-app';
  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db();

    // Create admin role if it doesn't exist
    const rolesCollection = db.collection('roles');
    const adminRole = await rolesCollection.findOne({ name: 'admin' });
    
    if (!adminRole) {
      console.log('Creating admin role...');
      await rolesCollection.insertOne({
        name: 'admin',
        permissions: ['manage_products', 'manage_users', 'manage_orders'],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('Admin role created successfully');
    } else {
      console.log('Admin role already exists');
    }

    // Create admin user if it doesn't exist
    const usersCollection = db.collection('users');
    const adminUser = await usersCollection.findOne({ email: 'admin@seikostore.com' });

    if (!adminUser) {
      console.log('Creating admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const newAdmin = {
        email: 'admin@seikostore.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await usersCollection.insertOne(newAdmin);
      console.log('Admin user created with ID:', result.insertedId);
      
      // Create admin profile
      const profilesCollection = db.collection('profiles');
      await profilesCollection.insertOne({
        userId: result.insertedId,
        email: 'admin@seikostore.com',
        name: 'Admin',
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('Admin profile created successfully');
    } else {
      console.log('Admin user already exists');
    }

    console.log('\nAdmin initialization completed successfully!');
    console.log('You can now log in with:');
    console.log('Email: admin@seikostore.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error initializing admin:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Run the initialization
initializeAdmin().catch(console.error);

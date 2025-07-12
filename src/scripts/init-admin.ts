import { MongoClient } from 'mongodb';
import * as bcrypt from 'bcrypt';

async function initializeAdmin() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/seiko-app';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    // Create admin role if it doesn't exist
    const rolesCollection = db.collection('roles');
    const adminRole = await rolesCollection.findOne({ name: 'admin' });

    if (!adminRole) {
      await rolesCollection.insertOne({
        name: 'admin',
        permissions: ['manage_products', 'manage_users', 'manage_orders'],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Create admin user if it doesn't exist
    const usersCollection = db.collection('users');
    const adminUser = await usersCollection.findOne({
      email: 'admin@seikostore.com',
    });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const newAdmin = {
        email: 'admin@seikostore.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await usersCollection.insertOne(newAdmin);

      // Create admin profile
      const profilesCollection = db.collection('profiles');
      await profilesCollection.insertOne({
        userId: result.insertedId,
        email: 'admin@seikostore.com',
        name: 'Admin',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  } finally {
    await client.close();
  }
}

// Run the initialization
initializeAdmin().catch(console.error);

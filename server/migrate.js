require('dotenv').config();
const db = require('./db'); 

async function migrate() {
  try {
    console.log("🚀 Starting database migration...");

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        role ENUM('donor','recipient','admin') DEFAULT 'recipient'
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS donors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        blood_group VARCHAR(5),
        age INT,
        location VARCHAR(255),
        last_donated DATE,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS blood_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        recipient_user_id INT,
        blood_group VARCHAR(5),
        location VARCHAR(255),
        status ENUM('pending','accepted','completed') DEFAULT 'pending',
        assigned_donor_id INT,
        FOREIGN KEY (recipient_user_id) REFERENCES users(id),
        FOREIGN KEY (assigned_donor_id) REFERENCES users(id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        request_id INT,
        sender_id INT,
        recipient_id INT,
        message TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (request_id) REFERENCES blood_requests(id)
      );
    `);

    console.log("✅ Migration completed successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

migrate();

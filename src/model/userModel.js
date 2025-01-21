import pool from "../config/db.js";

class UserModel {
  static async findAll() {
    const query = "SELECT * FROM users ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(name, email) {
    const query = `
      INSERT INTO users (name, email) 
      VALUES ($1, $2) 
      RETURNING *
    `;
    const result = await pool.query(query, [name, email]);
    return result.rows[0];
  }

  static async update(id, name, email) {
    const query = `
      UPDATE users 
      SET name = COALESCE($2, name), 
          email = COALESCE($3, email),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [id, name, email]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

export default UserModel;

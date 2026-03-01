import pool from "../db";

export type User = {
  id: string;
  email: string;
  name?: string | null;
  password_hash?: string | null;
  created_at: string;
  updated_at: string;
};

export const createUser = async (email: string, name?: string, passwordHash?: string): Promise<User> => {
  const result = await pool.query(
    `INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING *`,
    [email, name || null, passwordHash || null]
  );
  return result.rows[0];
};

export const getUserById = async (id: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
};

export const listUsers = async (limit = 100): Promise<User[]> => {
  const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC LIMIT $1", [limit]);
  return result.rows;
};

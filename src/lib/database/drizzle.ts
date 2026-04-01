// lib/db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Define the type for our global variable
declare global {
  var pgClient: ReturnType<typeof postgres> | undefined;
}

// Reuse existing client if it exists (hot reload safe), otherwise create new one
export const client = globalThis.pgClient ?? postgres(connectionString);

// Save to global in development so it survives hot reloads
if (process.env.NODE_ENV !== 'production') {
  globalThis.pgClient = client;
}

export const db = drizzle(client, { schema });

// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'
// import * as schema from './schema'

// const client = postgres(process.env.DATABASE_URL!)

// export const db = drizzle(client, { schema }) 
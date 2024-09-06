import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './scheme'

const dbUrl = "postgresql://neondb_owner:HlhB0nKEQ1tC@ep-broad-shape-a5hbto62.us-east-2.aws.neon.tech/neondb?sslmode=require";

if (!dbUrl) {
  throw new Error('Database URL is not defined in environment variables');
}

const sql = neon(dbUrl);
const db = drizzle(sql,{schema});


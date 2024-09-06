import { Config, defineConfig } from 'drizzle-kit';
const dbUrl = "postgresql://neondb_owner:HlhB0nKEQ1tC@ep-broad-shape-a5hbto62.us-east-2.aws.neon.tech/neondb?sslmode=require";

if (!dbUrl) {
  throw new Error('Database URL is not defined in environment variables');
}
export default defineConfig({
  schema: "./utils//scheme.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: true,
} satisfies Config);

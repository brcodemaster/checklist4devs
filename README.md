## Getting Started

After cloning the repository, complete the following steps:

### 1. Install environment variables

Create a `.env` file in the root directory and add the required
environment variables.

### 2. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### 3. Generate Prisma types

```bash
npm run prisma:generate
```

This command generates the Prisma Client and all TypeScript types.

### 4. Sync the schema with the database

```bash
npm run prisma:rs
```

This command synchronizes your Prisma schema with the actual database
tables.

### 5. Start the development server

```bash
npm run dev
```

Open <http://localhost:3000> in your browser to see the application.

# Supabase Public Table Security Checker

A simple Node.js script to quickly check if a Supabase table is publicly accessible and potentially leaking data.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)

## Setup

1. **Clone the repository or download the files.**

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your environment variables:**

   Copy the example `.env.example` file to a new `.env` file:

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and add your Supabase project URL and public anonymous key.

   ```
   SUPABASE_URL=YOUR_SUPABASE_URL
   SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```

## Usage

Run the script from your terminal, passing the name of the table you want to check as an argument. You can also provide an optional count to limit the number of records returned in the output.

You can run the script directly with `node`:

```bash
node index.js <your_table_name> [<count>]
```

Alternatively, you can use the npm script:

```bash
npm start -- <your_table_name>
```

Replace `<your_table_name>` with the actual name of the table you want to test (e.g., `profiles`).

## Interpreting the Output

- **[VULNERABLE]**: If the script returns this, it means the table is publicly readable and contains data. The script will also display the retrieved data.
- **[SECURE]**: This indicates one of two things:
    - The table is accessible but currently empty.
    - The table is not publicly accessible due to your Row Level Security (RLS) policies.
- **Error**: If the script encounters an error (e.g., the table does not exist), it will display an error message.

---

*Disclaimer: This is a simple check and not a replacement for a thorough security audit. Always ensure your Supabase Row Level Security (RLS) policies are correctly configured.*
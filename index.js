import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

async function testLeak(tableName, count) {
  console.log(`Testing table: "${tableName}"...`)
  let query = supabase
    .from(tableName)
    .select('*', { count: 'exact' })

  if (count) {
    console.log(`Limiting to the first ${count} record(s).`)
    query = query.limit(count)
  }

  const { data, error, count: totalCount } = await query

  if (error) {
    console.error(`Error fetching data:`, error.message)
    return
  }

  if (data && data.length > 0) {
    console.log(`[VULNERABLE] Table "${tableName}" is publicly accessible and contains data.`)
    console.log('Leaked data:', data)

    if (totalCount !== null) {
      console.log(`\nTotal records exposed: ${totalCount}`)
    }
  } else if (data) {
    console.log(`[SECURE] Table "${tableName}" is accessible but currently empty.`)
  } else {
    console.log(`[SECURE] Table "${tableName}" is not publicly accessible.`)
  }
}

const tableName = process.argv[2];
const countArg = process.argv[3];

if (!tableName) {
  console.error('Please provide a table name to test.')
  console.log('Usage: npm start <table_name> [<count>]')
  process.exit(1);
}

let count;
if (countArg) {
  count = parseInt(countArg, 10);
  if (isNaN(count) || count <= 0) {
    console.error('Error: The count parameter must be a positive number.');
    process.exit(1);
  }
}

testLeak(tableName, count);

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

async function testLeak(tableName) {
  console.log(`Testing table: "${tableName}"...`)
  const { data, error } = await supabase
    .from(tableName)
    .select('*')

  if (error) {
    console.error(`Error fetching data:`, error.message)
    return
  }

  if (data && data.length > 0) {
    console.log(`[VULNERABLE] Table "${tableName}" is publicly accessible and contains data.`)
    console.log('Leaked data:', data)
  } else if (data) {
    console.log(`[SECURE] Table "${tableName}" is accessible but currently empty.`)
  } else {
    console.log(`[SECURE] Table "${tableName}" is not publicly accessible.`)
  }
}

const tableName = process.argv[2];

if (!tableName) {
  console.error('Please provide a table name to test.')
  console.log('Usage: npm start <table_name>')
  process.exit(1);
}

testLeak(tableName);

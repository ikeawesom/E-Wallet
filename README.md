# WHAT THE HACK PROJECT

## Supabase

Helper functions are located in `@/supabase/...`. Use the exported classes to `GET` and `SET` to access and modify the values in the Supabase database.

Each method returns a `{ data, error }` object, where `data` is a list/object (depending on the query). If the query is successful, `error` returns `NULL`.

For example:

```typescript
import { paymentDatabase } from "@/supabase/database";

async function payments() {
  const { data, error } = await paymentDatabase.getPayments("sample-username");
  if (error) console.log(error);
  else {
    console.log(data);
  }
}
```

If successful, `data` returns:

```typescript
[{...}, {...},...]
```

## Database Schema

**users** database

```SQL
CREATE TABLE users (
    username TEXT PRIMARY KEY NOT NULL,
    password VARCHAR NOT NULL,
    safekeys VARCHAR[] NOT NULL,
    salt TEXT NOT NULL
)
```

**user_payments** database

```sql
CREATE TABLE user_payments (
    username TEXT,
    amount INTEGER,
    payments JSON[],
    PRIMARY KEY username,
    FOREGIN KEY username REFERENCES users.username
)
```

`payments` JSON returns an object with the following parameters: `ID`, `labelName`, `amount`, `serviceName`.

For example:

```JSON
{
    ID: "asdua321ksdadoi34",
    labelName: "Grab Unlimited Subcription",
    amount: 8,
    serviceName: "Grab"
}
```

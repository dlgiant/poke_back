# Poke App Backend setup

### To Run development server:
1. Run `npm install` in order to fetch dependencies
2. Spin up sqlite server in CL: `>> sqlite3 sample.db`. This command will create a sample.db file that will be used by the server.
3. Create table: 
``` bash
CREATE TABLE battles (
  id INTEGER PRIMARY KEY,
  winner TEXT NOT NULL,
  loser TEXT NOT NULL
);
```
4. Run `nodemon index.js`
5. Go to `localhost:3001` to test responses

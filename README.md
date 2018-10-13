# The basic auth middleware for express

## Install

```bash
npm install @liqiqiang/basic-auth --save
```

## Usage

### before all route

```javascript
const express = require('express');
const basicAuth = require('@liqiqiang/basic-auth');

const app = express();

// all route
app.use(basicAuth('user', 'password'));

app.listen(8000);
```

### before specific route

```javascript
const express = require('express');
const basicAuth = require('@liqiqiang/basic-auth');

const app = express();

// specific route
app.use('/api', basicAuth('user', 'password'));

app.listen(8000);
```

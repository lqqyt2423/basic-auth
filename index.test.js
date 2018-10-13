'use strict';

const request = require('supertest');
const express = require('express');
const assert = require('assert');
const basicAuth = require('./');

const app = express();
app.use(basicAuth('admin', '0000'));
app.get('/', (req, res) => {
  res.type('text').send('ok');
});

describe('Test basic auth middleware', function() {
  it('Should respond www-authenticate header', async function() {
    const { headers, status } = await request(app).get('/');
    assert(status === 401);
    assert(headers['www-authenticate'] === 'Basic')
  });

  it('Should be authorized to succeed', async function() {
    const { headers, status } = await request(app).get('/').auth('admin', '0000');
    assert(status === 200);
  });

  it('Should be authorized to failed if user or password wrong', async function() {
    const { headers, status } = await request(app).get('/').auth('admin', '1111');
    assert(status === 401);
    assert(headers['www-authenticate'] === 'Basic')
  });
});

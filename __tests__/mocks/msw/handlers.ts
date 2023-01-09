// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.post(process.env.API_HOST + '/api/signup', (req, res, context) => {
    return res(context.status(200), context.json({}));
  })
];

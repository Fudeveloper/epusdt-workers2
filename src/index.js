import { Hono } from 'hono';
import { OrderController } from './controllers/order.js';
import { PayController } from './controllers/pay.js';
import { PayService } from './services/pay.js';

const app = new Hono();

app.get('/', (c) => c.text('hello epusdt-workers, https://github.com/epusdt-workers/epusdt-workers'));

// Pay Routes
app.get('/pay/checkout-counter/:trade_id', PayController.checkoutCounter);
app.get('/pay/check-status/:trade_id', PayController.checkStatus);

// API Routes
app.post('/api/v1/order/create-transaction', OrderController.createTransaction);

export default {
  fetch: app.fetch,
  async scheduled(event, env, ctx) {
    const service = new PayService(env);
    ctx.waitUntil(Promise.all([
      service.checkPayments(),
      service.checkExpiredOrders(),
    ]));
  }
};

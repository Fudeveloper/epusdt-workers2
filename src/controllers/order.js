import { success, error, Errno, ErrMsg } from '../utils/response.js';
import { verifySignature } from '../utils/sign.js';
import { OrderService } from '../services/order.js';

export class OrderController {
  static async createTransaction(c) {
    const env = c.env;
    const body = await c.req.json();
    const requestId = c.req.header('cf-ray') || '';
    
    // 1. Verify params
    if (!body.order_id || !body.amount || !body.notify_url || !body.signature) {
       return c.json(error(Errno.PARAMS_MARSHAL_ERR, ErrMsg[Errno.PARAMS_MARSHAL_ERR], requestId));
    }

    // 2. Verify Signature
    if (!verifySignature(body, env.API_AUTH_TOKEN, body.signature)) {
      return c.json(error(Errno.SIGNATURE_ERR, ErrMsg[Errno.SIGNATURE_ERR], requestId));
    }

    // 3. Service
    const service = new OrderService(env);
    try {
      const result = await service.createTransaction({
        order_id: body.order_id,
        amount: parseFloat(body.amount),
        notify_url: body.notify_url,
        redirect_url: body.redirect_url,
        currency: body.currency
      });
      return c.json(success(result, 'success', requestId));
    } catch (e) {
      if (e.code) {
        return c.json(error(e.code, e.message, requestId));
      }
      return c.json(error(Errno.SYSTEM_ERROR, e.message || ErrMsg[Errno.SYSTEM_ERROR], requestId));
    }
  }
}

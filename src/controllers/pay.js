import { success, error, Errno, ErrMsg } from '../utils/response.js';
import { PayService } from '../services/pay.js';

export class PayController {
  static async checkoutCounter(c) {
    const tradeId = c.req.param('trade_id');
    const service = new PayService(c.env);
    const requestId = c.req.header('cf-ray') || '';
    try {
        const result = await service.getCheckoutCounter(tradeId);
        // The original code returns SucJson with data.
        // It's called "checkout-counter", but it returns JSON data for the frontend to render?
        // Wait, the routes said: `payRoute.GET("/checkout-counter/:trade_id", comm.Ctrl.CheckoutCounter)`
        // `src/controller/comm/pay_controller.go` likely renders a template OR returns JSON.
        // `src/model/service/pay_service.go` has `GetCheckoutCounterByTradeId` returning `CheckoutCounterResponse`.
        // So it probably returns JSON.
        return c.json(success(result, 'success', requestId));
    } catch (e) {
        if (e.code) return c.json(error(e.code, e.message, requestId));
        return c.json(error(Errno.SYSTEM_ERROR, e.message, requestId));
    }
  }

  static async checkStatus(c) {
    const tradeId = c.req.param('trade_id');
    const service = new PayService(c.env);
    const requestId = c.req.header('cf-ray') || '';
    try {
        const result = await service.checkStatus(tradeId);
        // Logic for CheckStatus return?
        // Usually returns { status: "ORDER_STATUS_PAID" } or similar?
        // Original: `comm.Ctrl.CheckStatus`.
        // If it's standard BaseCommController, it returns SucJson.
        // I'll return the result from service.
        return c.json(success(result, 'success', requestId));
    } catch (e) {
        if (e.code) return c.json(error(e.code, e.message, requestId));
        return c.json(error(Errno.SYSTEM_ERROR, e.message, requestId));
    }
  }
}

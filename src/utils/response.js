export const success = (data, message = 'success', requestId = '') => {
  return {
    status_code: 200,
    message: message,
    data: data,
    request_id: requestId
  };
};

export const error = (code, message, requestId = '') => {
  return {
    status_code: code,
    message: message,
    data: null,
    request_id: requestId
  };
};

export const Errno = {
  SYSTEM_ERROR: 400,
  SIGNATURE_ERR: 401,
  WALLET_ADDRESS_ALREADY_EXISTS: 10001,
  ORDER_ALREADY_EXISTS: 10002,
  NOT_AVAILABLE_WALLET_ADDRESS: 10003,
  PAY_AMOUNT_ERR: 10004,
  NOT_AVAILABLE_AMOUNT_ERR: 10005,
  RATE_AMOUNT_ERR: 10006,
  ORDER_BLOCK_ALREADY_PROCESS: 10007,
  ORDER_NOT_EXISTS: 10008,
  PARAMS_MARSHAL_ERR: 10009
};

export const ErrMsg = {
  400: "系统错误",
  401: "签名认证错误",
  10001: "钱包地址已存在，请勿重复添加",
  10002: "支付交易已存在，请勿重复创建",
  10003: "无可用钱包地址，无法发起支付",
  10004: "支付金额有误, 无法满足最小支付单位",
  10005: "无可用金额通道",
  10006: "汇率计算错误",
  10007: "订单区块已处理",
  10008: "订单不存在",
  10009: "无法解析请求参数"
};

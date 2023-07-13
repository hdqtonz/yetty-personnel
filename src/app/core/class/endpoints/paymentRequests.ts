export class paymentRequestAPIEndpoints {

  /**
   * tags: Payment requests
   * summary: Returns all pending payment requests for order items made by all visitors of a table
   * @type {string}
   */
  static _listTablePaymentRequests: string = "establishments/{establishmentId}/tables/{tableId}/payment-requests";

  /**
   * tags: Payment requests
   * summary: Confirms that a payment of order items requested by a table user has been made in cash or on POS terminal
   * @type {string}
   */
  static _confirmOrderItemsPaymentRequest: string = "establishments/{establishmentId}/tables/{tableId}/payment-requests/{paymentRequestId}";

  /**
   * tags: Payment requests
   * summary: Declines a payment of order items requested by a table user
   * @type {string}
   */
  static _declineOrderItemsPaymentRequest: string = "establishments/{establishmentId}/tables/{tableId}/payment-requests/{paymentRequestId}";

}

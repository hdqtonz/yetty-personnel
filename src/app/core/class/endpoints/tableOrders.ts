export class tableOrderAPIEndpoints {

  /**
   * tags: Table orders
   * summary: Returns a table visitor's ordered menu items
   * @type {string}
   */
  static _getTableOrder: string = "establishments/{establishmentId}/tables/{tableId}/order";

  /**
   * tags: Table order
   * summary: Confirms sent items in a table visitor's order or reverts the served status of order items to confirmed
   * @type {string}
   */
  static _confirmOrderItems: string = "establishments/{establishmentId}/tables/{tableId}/order-items/confirm";

  /**
   * tags: Table order
   * summary: Declines sent items in a table visitor's order
   * @type {string}
   */
  static _declineSentOrderItems: string = "establishments/{establishmentId}/tables/{tableId}/order-items/decline";

  /**
   * tags: Table order
   * summary: Marks confirmed items in a table visitor's order as served
   * @type {string}
   */
  static _markConfirmedOrderItemsServed: string = "establishments/{establishmentId}/tables/{tableId}/order-items/mark-served";

  /**
   * tags: Table order
   * summary: Marks items in a table visitor's order as paid. The endpoint will be called in case the personnel has received the payment outside Yetty.app
   * @type {string}
   */
  static _markConfirmedOrderItemsPaid: string = "establishments/{establishmentId}/tables/{tableId}/order-items/mark-paid";

  /**
   * tags: Table order
   * summary: Adds an extra order item to a table visitor's order
   * @type {string}
   */
  static _addExtraOrderItemToVisitorOrder: string = "establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/extra-order-items";

  /**
   * tags: Table order
   * summary: Removes an extra order item from a table visitor's order
   * @type {string}
   */
  static _removeExtraOrderItemFromVisitorOrder: string = "establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/extra-order-items/{extraOrderItemId}";

}

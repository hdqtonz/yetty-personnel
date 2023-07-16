export class tableAPIEndpoints {

  /**
   * tags: Tables
   * summary: Returns the tables in an establishment
   * @type {string}
   */
  static _listTables: string = "establishments/{establishmentId}/tables";


  /**
   * tags: Tables
   * summary: Returns the visitors of a table
   * @type {string}
   */
  static _listTableVisitors: string = "establishments/{establishmentId}/tables/{tableId}/visitors";


  /**
   * tags: Tables
   * summary: Removes a visitor from a table
   */
  static _removeTableVisitor: string = "establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}";

  /**
   * tags: Tables
   * summary: Returns the settings of a table
   * @type {string}
   */
  static _getTableSettings: string = "establishments/{establishmentId}/tables/{tableId}/settings";

  /**
   * tags: Tables
   * summary: Updates the settings of a table
   * @type {string}
   */
  static _updateTableSettings: string = "establishments/{establishmentId}/tables/{tableId}/settings";

  /**
   * tags: Tables
   * summary: Completes all orders on a table and marks it as free for the new visitors
   * @type {string}
   */
  static _completeTable: string = "establishments/{establishmentId}/tables/{tableId}/complete";

  /**
   * tags: Tables
   * summary: Returns all service requests for an establishment
   * @type {string}
   */
  static _listServiceRequests: string = "establishments/{establishmentId}/tables/service-requests";

  /**
   * tags: Tables
   * summary: Cancels a service request (\"un-calls\" the waiter) for a table visitor
   * @type {string}
   */
  static _deleteServiceRequestOnTable: string = "establishments/{establishmentId}/tables/service-requests";

}

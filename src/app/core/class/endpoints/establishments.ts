export class establishmentAPIEndpoints {

  /**
   * tags: Establishments
   * summary: Returns the settings of an establishment
   * @type {string}
   */
  static _getEstablishmentSettings: string = "establishments/{establishmentId}/settings";


  /**
   * tags: Establishments
   * summary: Returns general information of the establishment - name, description, contacts, supported languages, etc.
   * @type {string}
   */
  static _getEstablishmentInfo: string = "establishments/{establishmentId}/info";

}

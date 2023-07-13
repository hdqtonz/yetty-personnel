export class profileAPIEndpoints {

  /**
   * tags: My Profile
   * summary: Returns the profile of the current user
   * @type {string}
   */
  static _getLoggedInUserProfile: string = "establishments/{establishmentId}/current-user/profile";

  /**
   * tags: My Profile
   * summary: Updates the profile of the current user
   * @type {string}
   */
  static _updateLoggedInUserProfile: string = "establishments/{establishmentId}/current-user/profile";

  /**
   * tags: Password
   * summary: Sets a new password for the current user
   * @type {string}
   */
  static _setLoggedInUserPassword: string = "establishments/{establishmentId}/current-user/password";

}

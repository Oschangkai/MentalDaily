export interface User extends providerData {
  displayName?: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  photoURL?: string;
  providerData: providerData;
  uid: string;
  refreshToken: string;
}
export interface providerData {
  refreshToken: string;
  uid: string;
}
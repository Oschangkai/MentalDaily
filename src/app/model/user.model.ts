export interface User {
  displayName?: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  photoURL?: string;
  // providerData: [providerData];
  uid: string;
}
class providerData {
  refreshToken: string;
  uid: string;
}
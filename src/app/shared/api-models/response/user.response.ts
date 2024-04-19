export interface LoginResponse {
    id: number;
    token: string;
    refreshToken: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    registrationToken?: string | null;
    isPhoneNumberVerified: boolean;
    fullName: string;
  }
  
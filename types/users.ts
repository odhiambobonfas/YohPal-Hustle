export interface HustlerProfileData {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      referralCode: string;
  }

  // This is the envelope of the API  response on /hustler/profile/:uid
  export interface ProfileResponse {
    message: string;
    profile: HustlerProfileData; 
  }
import axios from 'axios';

// Create axios instance for YohPal API
const yohpalClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface SendOTPResponse {
  message: string;
  otp: number;
}

interface VerifyOTPResponse {
  success: boolean;
  message: string;
  data?: {
    verified: boolean;
  };
}

/**
 * Send OTP to phone number using YohPal API
 * @param phoneNumber - Phone number in E.164 format (+254XXXXXXXXX)
 * @returns Promise with OTP ID for verification
 */
export const sendPhoneOTP = async (phoneNumber: string): Promise<{ success: boolean; message: string; otp?: number }> => {
  try {
    const response = await yohpalClient.post<SendOTPResponse>('/send_otp', {
      phone_number: phoneNumber
    });
    console.log('Send OTP Response:', response.data);

    if (response.data.message === 'OTP sent successfully.' && response.data.otp) {
      return {
        success: true,
        message: response.data.message,
        otp: response.data.otp
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Failed to send OTP'
      };
    }
  } catch (error: any) {
    console.error('Send OTP Error:', error);
    
    if (error.response?.data?.message) {
      return {
        success: false,
        message: error.response.data.message
      };
    }
    
    return {
      success: false,
      message: 'Failed to send OTP. Please try again.'
    };
  }
};

/**
 * Verify OTP code using YohPal API
 * @param otpId - OTP ID received from sendPhoneOTP
 * @param code - 6-digit OTP code
 * @returns Promise with verification result
 */
export const verifyPhoneOTP = async (expectedOtp: number, userEnteredCode: string): Promise<{ success: boolean; message: string }> => {
  try {
    const enteredOtp = parseInt(userEnteredCode);
    
    if (enteredOtp === expectedOtp) {
      return {
        success: true,
        message: 'Phone number verified successfully'
      };
    } else {
      return {
        success: false,
        message: 'Invalid OTP code. Please try again.'
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: 'Invalid OTP format. Please enter numbers only.'
    };
  }
};
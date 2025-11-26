import { v2 as cloudinary } from 'cloudinary';
import { config } from './index';

export const configureCloudinary = (): void => {
  const secret = config.cloudinary.apiSecret;
  console.log('Configuring Cloudinary with:', {
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret_length: secret ? secret.length : 0,
    api_secret_preview: secret ? `${secret.substring(0, 3)}...${secret.substring(secret.length - 3)}` : 'missing'
  });

  if (secret?.startsWith('CLOUDINARY_URL')) {
    console.error('\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('CRITICAL CONFIGURATION ERROR:');
    console.error('Your CLOUDINARY_API_SECRET is set to the "API Environment variable" string.');
    console.error('It should be the "API Secret" (a short random string, ~27 chars).');
    console.error('Please open backend/.env and fix CLOUDINARY_API_SECRET.');
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n');
  }

  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  });
};

export default cloudinary;

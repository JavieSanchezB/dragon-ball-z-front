/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/personaje',
          destination: 'https://ezoiv3yqz6h5sh37ytuva7ns5i0moztz.lambda-url.us-east-2.on.aws', // Ajusta al puerto correcto si es necesario
        },
      ];
    },
  };
  
  export default nextConfig;
  
  
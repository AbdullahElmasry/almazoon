/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
  if (phase === 'phase-development-server') {
    return {
      ...defaultConfig,
      reactStrictMode: true,
      poweredByHeader: false,
      images: {
        domains: ['localhost'],
      },
      env: {
        server: 'http://localhost:5000',
        frontName: 'phoneyou7',
        frontEnd_host: 'https://phoneyou7.com',
        admin: '/nali_admin',
        email: 'phoneyou7@gmail.com'
      },
    };
  }

  return {
    ...defaultConfig,
    reactStrictMode: false,
    poweredByHeader: false,
    images: {
      domains: ['localhost'],
    },
    env: {
	server: 'http://159.203.131.104:5000',
      frontName: 'phoneyou7',
      frontEnd_host: 'https://phoneyou7.com',
      admin: '/nali_admin',
      email: 'phoneyou7@gmail.com'
    },
  };
};

module.exports = nextConfig;

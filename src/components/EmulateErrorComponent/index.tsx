import { useEffect } from 'react';

const EmulateErrorComponent = () => {
  useEffect(() => {
    throw new Error(
      'Please note! This default Nextjs popup is only displayed in development mode. You can check the error emulation in production mode.'
    );
  }, []);

  return null;
};

export default EmulateErrorComponent;

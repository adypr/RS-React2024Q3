import { useEffect } from 'react';

const EmulateErrorComponent = () => {
  useEffect(() => {
    throw new Error(
      'Please note, this popup is not an error!\nThis default Nextjs popup is only displayed in development mode. You can build this app and check the error emulation in production mode.'
    );
  }, []);

  return null;
};

export default EmulateErrorComponent;

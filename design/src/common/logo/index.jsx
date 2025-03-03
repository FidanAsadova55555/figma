import React from 'react';

const LogoComponent = ({ Logo }) => {
  return (
    <div className='w-[105px] h-[24px] overflow-hidden'>
      <Logo className='w-full h-full object-contain' />
    </div>
  );
};

export default LogoComponent;

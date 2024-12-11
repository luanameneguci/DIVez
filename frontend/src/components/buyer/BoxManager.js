import React from 'react';

const BoxManager = ({ buyerData }) => {
  // Ensure buyerData is not null or undefined before accessing managers
  if (!buyerData || !buyerData.managers || buyerData.managers.length === 0) {
    return (
      <div className="box-container bg-white col-auto roundbg d-block shadow" style={{ height: '360px' }}>
        <h4 className='text-start p-3 col-12'>Managers</h4>
        <p className='text-center col-12'>No managers found</p>
      </div>
    );
  }

  return (
    <div className="box-container bg-white col-auto roundbg d-block shadow" style={{ height: '360px' }}>
      <h4 className='text-start p-3 col-12'>Managers</h4>
      <ul className='p-0 col-12'>
        {buyerData.managers.map((manager, index) => (
          <li key={index} className='list-group-item border-bottom py-2 col-11 mx-auto'><strong><h5>{manager.userName}</h5></strong></li>
        ))}
      </ul>
    </div>
  );
};

export default BoxManager;

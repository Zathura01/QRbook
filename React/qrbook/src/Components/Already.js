import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Active from './Active';

function Already({ activeData }) {
  const [selectedFullName, setSelectedFullName] = useState('');

  const handleSelectChange = (event) => {
    setSelectedFullName(event.target.value);
  };
 
  return (
    <div>
      <div className='already-content center-content'>
        <Form.Select aria-label="Default select example" onChange={handleSelectChange} value={selectedFullName}>
          <option>Choose a user</option>
          {activeData.map(user => (
            <option key={user._id} value={user.fullName}>{user.fullName}</option>
          ))}
        </Form.Select>
      </div>
      {activeData.length > 0 && ( 
        <div className='center-content'>
          <Active data={activeData} id={activeData[0].id} selectedFullName={selectedFullName} />
        </div>
      )}
    </div>
  );
}

export default Already;

// src/components/UserForm.jsx

import React from 'react';
import './UserForm.css';

function UserForm({ handle, setHandle, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className='form'>
      <label>
        <input className='typebox' type="text" value={handle} onChange={(e) => setHandle(e.target.value) } placeholder="Enter your handle"/>
      </label>
      <button className='submit' type="submit">Submit</button>
    </form>
  );
}

export default UserForm;

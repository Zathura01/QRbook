import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './Style.css';
//import { Button } from 'bootstrap';
import Button from 'react-bootstrap/Button';

function Active({ data, id, selectedFullName }) {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(filteredData[0].id)
        const response = await fetch(`http://localhost:2000/api/getData/${filteredData[0].id}`);
        const jsonData = await response.json();
        console.log(jsonData)
        setApiData(jsonData);
        console.log(apiData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();

  }, [id && selectedFullName]);
  const filteredData = data.filter(user => user.fullName === selectedFullName);

  return (
    <>
      <h2>Active User Information</h2>
      <Table striped bordered hover size="sm">
        <thead className='TableUp'>
          <tr>
            <th style={{ width: '200px' }}>Full Name</th>
            <th style={{ width: '50px' }}>Age</th>
            <th style={{ width: '150px' }}>Gender</th>
            <th style={{ width: '50px' }}>ID</th>
            <th style={{ width: '10px' }}><Button>Update</Button></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index}>
              <td>{user.fullName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.time}</td>
              <td>{user.date}</td>
              <td>{(index + 1) % 2 === 1 ? <div>IN</div> : <div>OUT</div>}</td>
              <td><Button>Update</Button></td>
              <td><Button>Delete</Button></td>
            </tr>
          ))}

        </tbody>
      </Table>
    </>
  );
}

export default Active;

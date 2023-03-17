import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Updateuser = (props) => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [designation, setDesignation] = useState('');
    const [contact, setContact] = useState('');

    useEffect(() => {
        setFirstName(props.selectedUser.firstName);
        setLastName(props.selectedUser.lastName);
        setDesignation(props.selectedUser.designation);
        setContact(props.selectedUser.contact);
    }, [props.selectedUser])

    const handleSubmit= (e)=> {
        e.preventDefault();
    }

    const saveData = async () => {
        const id = props.selectedUser.id;
        const url = "http://localhost:3000/users";
        let result = await fetch(`${url}/${id}`,{
            method: "Put",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName, lastName, designation, contact})
        });
        result = await result.json();
        if(result) {
            props.getData();
            navigate('/')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <label>First Name <sup>*</sup>
                        <br />
                        <input placeholder='Enter First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>

                    <label>Last Name <sup>*</sup>
                        <br />
                        <input placeholder='Enter Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>

                    <label>Designation <sup>*</sup>
                        <br />
                        <input placeholder='Enter Designation'
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </label>

                    <label>Contact Number <sup>*</sup>
                        <br />
                        <input placeholder='Enter Contact Number'
                            value={contact}
                            
                            onChange={(e) => setContact(e.target.value.toString())}
                        />
                    </label>
                </div>
                <Button>Cancel</Button>
                <Button onClick={saveData} >Add</Button>
            </form>
        </div>
    )
}

export default Updateuser

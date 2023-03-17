import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddUser = (props) => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [designation, setDesignation] = useState('');
    const [contact, setContact] = useState(undefined);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [designationError, setDesignationError] = useState(false);
    const [contactError, setContactError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // Add user
    const addUser = async () => {

        !firstName ? setFirstNameError(true) : setFirstNameError(false);
        !lastName ? setLastNameError(true) : setLastNameError(false);
        !designation ? setDesignationError(true) : setDesignationError(false);
        !contact ? setContactError(true) : setContactError(false);

        if (!firstName || !lastName || !designation || !contact) {
            return false;
        }

        const url = "http://localhost:3000/users";
        let result = await fetch(url, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, designation, contact })
        });
        result = await result.json();
        if (result) {
            console.log("added");
            props.getData();
            navigate('/')
        }
    }

    return (
        <div className='add-wrapper'>
            <div className='addUser'>
                <span>Add Employees</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <label>First Name <sup>*</sup>
                        <br />
                        <input placeholder='Enter First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {firstNameError ? <p>enter valid first name</p> : null}
                    </label>

                    <label>Last Name <sup>*</sup>
                        <br />
                        <input placeholder='Enter Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {lastNameError ? <p>enter valid last name</p> : null}
                    </label>

                    <label>Designation <sup>*</sup>
                        <br />
                        <input placeholder='Enter Designation'
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                        {designationError ? <p>enter valid designation</p> : null}

                    </label>

                    <label>Contact Number <sup>*</sup>
                        <br />
                        <input placeholder='Enter Contact Number'
                            value={contact}
                            type='number'
                            onChange={(e) => setContact(e.target.value)}
                        />
                        {contactError ? <p>enter valid contact</p> : null}

                    </label>
                </div>
                <Button>Cancel</Button>
                <Button onClick={addUser} >Add</Button>
            </form>
        </div>
    )
}

export default AddUser

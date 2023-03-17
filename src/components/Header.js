import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = (props) => {

    return (
        <>
            <div className='header-section'>
                <span>Employee Information</span>
                <Link to="add"><Button>Add</Button></Link>

            </div>
            <Table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Designation</th>
                        <th>Contact Number</th>
                    </tr>
                </thead>
                {
                    props.data.map((item, index) =>
                        <tbody>
                            <tr>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.designation}</td>
                                <td>{item.contactNumber}</td>
                                <Link to='update'>
                                    <td><button onClick={() => props.updateUser(item)}>edit</button></td></Link>
                                <td><button onClick={() => props.deleteUser(item)}>remove</button></td>
                            </tr>

                        </tbody>

                    )
                }
            </Table>

        </>
    )
}

export default Header

import React, {useEffect, useState} from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();

const CustomerCreateUpdate = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");


    useEffect(() => {
        const {match: {params}} = this.props;
        if (params && params.pk) {
            customersService.getCustomer(params.pk).then((item) => {
                setFirstName(item.first_name)
                setLastName(item.last_name)
                setEmail(item.email)
                setPhone(item.phone)
                setAddress(item.address)
                setDescription(item.description)
            })
        }
    }, [])

    const handleCreate = () => {
        customersService.createCustomer(
            {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone": phone,
                "address": address,
                "description": description
            }
        ).then((result) => {
            alert("Customer created!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    const handleUpdate = (pk) => {
        customersService.updateCustomer(
            {
                "pk": pk,
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone": phone,
                "address": address,
                "description": description
            }
        ).then((result) => {
            console.log(result);
            alert("Customer updated!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    const handleSubmit = (event) => {
        const {match: {params}} = this.props;

        if (params && params.pk) {
            handleUpdate(params.pk);
        } else {
            handleCreate();
        }

        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>
                    First Name:</label>
                <input
                    className="form-control"
                    type="text"
                    ref='firstName'
                    value={firstName}
                    onChange={(event) => {
                        setFirstName(event.target.value)
                    }}
                />
                <label>
                    Last Name:</label>
                <input
                    className="form-control"
                    type="text"
                    ref='lastName'
                    value={lastName}
                    onChange={(event) => {
                        setLastName(event.target.value)
                    }}
                />
                <label>
                    Phone:</label>
                <input
                    className="form-control"
                    type="text"
                    ref='phone'
                    value={phone}
                    onChange={(event) => {
                        setPhone(event.target.value)
                    }}
                />
                <label>
                    Email:</label>
                <input
                    className="form-control"
                    type="text"
                    ref='email'
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                />
                <label>
                    Address:</label>
                <input
                    className="form-control"
                    type="text"
                    ref='address'
                    value={address}
                    onChange={(event) => {
                        setAddress(event.target.value)
                    }}
                />
                <label>
                    Description:</label>
                <input
                    className="form-control"
                    type="text"
                    ref='description'
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}
                />
                <input className="btn btn-primary" type="submit" value="Submit"/>
            </div>
        </form>
    );

}

export default CustomerCreateUpdate;
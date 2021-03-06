import React, {Component} from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();

class CustomersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            nextPageURL: ''
        };
    }

    componentDidMount() {
        customersService.getCustomers().then( (result)=>{
            this.setState({customers: result.data, nextPageURL: result.nextlink})
        });
    }

    handleDelete = (e, pk) => {
        customersService.deleteCustomer({pk: pk}).then(() => {
            const newArr = this.state.customers.filter((obj) => obj.pk !== pk);
            this.setState({customers: newArr})
        });
    }

    nextPage = () => {
        const {nextPageURL}= this.state;
        customersService.getCustomersByURL(nextPageURL).then((result) => {
            this.setState({customers: result.data, nextPageURL: result.nextlink})
        });
    }

    render() {

        return (
            <div className="customers--list">
                <table className="table">
                    <thead key="thead">
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.customers.map(item =>
                        <tr key={item.pk}>
                            <td>{item.pk}  </td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={(e) => this.handleDelete(e, item.pk)}> Delete</button>
                                <a href={"/customer/" + item.pk}> Update</a>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={this.nextPage}>Next</button>
            </div>
        );
    }
}

export default CustomersList;
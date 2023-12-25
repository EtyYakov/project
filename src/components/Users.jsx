import React, { useEffect, useState } from "react";
import axios from 'axios'
import Table from "./Table";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from 'primereact/progressspinner';

const User = () => {
    const [users, setUsers] = useState([]);
    const [filterUser, setFilterUser] = useState(users);
    const [valueEmail, setValueEmail] = useState("");
    const [valueName, setValueName] = useState("");
    const [value, setValue] = useState("");
    const [notUsers, setNotUsers]=useState(true)



    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setNotUsers(false)
                setFilterUser(response.data);
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);


    const handleFilterEmail = (e) => {
        let filtered = users.filter(user => user.email.toLowerCase().includes(e.toLowerCase()));
        filtered = filtered.filter(user => user.name.toLowerCase().includes(valueName.toLowerCase()));

        setFilterUser(filtered)
        setValueEmail(e)
    };

    const handleFilterEmailName = (e) => {
        let filtered = users.filter(user => user.email.toLowerCase().includes(e.toLowerCase()) || user.name.toLowerCase().includes(e.toLowerCase()));


        setFilterUser(filtered)
        setValue(e)
    };


    const handleFilterName = (e) => {
        let filtered = users.filter(user => user.name.toLowerCase().includes(e.toLowerCase()));
        filtered = filtered.filter(user => user.email.toLowerCase().includes(valueEmail.toLowerCase()));

        setFilterUser(filtered)
        setValueName(e)
    };

    return (
        <>
        {notUsers?
        <div  className="card flex justify-content-center">
            <ProgressSpinner />
        </div>:<></>}
            <Table users={filterUser}>
            </Table>
            <br></br>
            <div className="card flex justify-content-center">
                <span className="p-float-label">
                    <InputText id="username" value={valueName} onChange={(e) => handleFilterName(e.target.value)} />
                    <label htmlFor="username">Filter by name</label>
                </span>

                <span className="p-float-label">
                    <InputText id="username" value={valueEmail} onChange={(e) => handleFilterEmail(e.target.value)} />
                    <label htmlFor="username">Filter by email</label>
                </span>
                <span className="p-float-label">
                    <InputText id="username" value={value} onChange={(e) => handleFilterEmailName(e.target.value)} />
                    <label htmlFor="username">Filter by name and email</label>
                </span>

            </div>



        </>
    )
}
export default User;
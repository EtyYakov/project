import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Post from './post'; 

export default function Table(props) {

    const [selectedUser, setSelectedUser] = useState(null);
    const [showPost,setShowPost]=useState(false)

    const onRowSelect = (event) => {

        setShowPost(true)
    };

    const onRowUnselect = (event) => {
        setShowPost(false)
    };

    return (


        <div className="card">
            {/* <Toast ref={toast} /> */}
            <DataTable value={props.users} selectionMode="single" selection={selectedUser} onSelectionChange={(e) => setSelectedUser(e.value)} dataKey="id"
                onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} metaKeySelection={false} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" ></Column>
                <Column field="email" header="Email" ></Column>
                <Column field="company.name" header="Company Name" ></Column>
            </DataTable>
            {showPost?<Post user={selectedUser}></Post>:<></>}
        </div>
    );
}
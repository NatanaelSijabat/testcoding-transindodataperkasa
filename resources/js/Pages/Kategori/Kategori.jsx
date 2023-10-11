import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Button, Layout, Pagination, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import React from "react";
import Add from "./Add";
import Edit from "./Edit";

const Kategori = ({ auth }) => {
    const [kategori, setKategori] = React.useState([]);
    const [modalAdd, setModalAdd] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [idEdit, setIdEdit] = React.useState("");

    const showModalAdd = () => {
        setModalAdd(!modalAdd);
    };

    const showModalEdit = () => {
        setModalEdit(!modalEdit);
    };

    const handleOpenEdit = (id) => {
        setModalEdit(!modalEdit);
        setIdEdit(id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/kategori/${id}`);
        router.reload();
    };

    const getData = async () => {
        try {
            const data = await axios.get("http://localhost:8000/api/kategori");
            setKategori(data.data.data);
        } catch (error) {
            return error.message;
        }
    };

    React.useEffect(() => {
        getData();
    }, [modalAdd]);

    const columns = [
        {
            title: "No",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Nama",
            dataIndex: "nama",
            key: "nama",
        },
        {
            title: "Action",
            key: "action",
            render: (value, record, index) =>
                kategori.length >= 1 ? (
                    <Space>
                        <Button
                            onClick={() => handleOpenEdit(value.id)}
                        >{`Edit`}</Button>
                        <Edit
                            open={modalEdit}
                            onCancel={showModalEdit}
                            onSubmit={showModalEdit}
                            id={idEdit}
                        />
                        <Popconfirm
                            title={`sure to delete ${value.nama}`}
                            onConfirm={() => handleDelete(value.id)}
                            okButtonProps={{ className: "bg-red" }}
                        >
                            <Button>Delete</Button>
                        </Popconfirm>
                    </Space>
                ) : null,
        },
    ];

    const handleSubmit = async () => {
        setModalAdd(false);
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Kategori" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Button className="mb-4" onClick={showModalAdd}>
                        Add
                    </Button>
                    <Add
                        open={modalAdd}
                        onCancel={showModalAdd}
                        onSubmit={handleSubmit}
                    />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table
                            columns={columns}
                            dataSource={kategori}
                            bordered
                            pagination={false}
                            rowKey="id"
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Kategori;

import { router } from "@inertiajs/react";
import { Form, Input, Modal, Button } from "antd";
import axios from "axios";
import React from "react";

const Add = ({ open, onSubmit, onCancel }) => {
    const [form] = Form.useForm();
    const [formValues, setFormValue] = React.useState({
        nama: "",
    });

    const handleCancel = () => {
        onCancel();
        form.resetFields();
    };

    const handleNamaChange = (event) => {
        setFormValue({ ...formValues, nama: event.target.value });
    };

    const handleSubmit = async () => {
        form.validateFields().then(async () => {
            const formData = new FormData();
            formData.append("nama", formValues.nama);
            try {
                await axios.post(
                    "http://localhost:8000/api/kategori",
                    formData
                );
                form.resetFields();
                onSubmit();
                router.reload();
            } catch (error) {
                console.log(error.message);
            }
        });
    };
    return (
        <Modal
            open={open}
            title="Tambah Data"
            onCancel={handleCancel}
            onOk={handleSubmit}
            footer={
                <div>
                    <Button onClick={handleCancel}>Batal</Button>
                    <Button
                        onClick={handleSubmit}
                        className="ant-btn ant-btn-primary"
                        style={{
                            backgroundColor: "#1890ff",
                            borderColor: "#1890ff",
                        }}
                    >
                        Simpan
                    </Button>
                </div>
            }
        >
            <Form
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="Nama"
                    name="nama"
                    rules={[
                        {
                            required: true,
                            message: "please input nama",
                        },
                    ]}
                >
                    <Input
                        id="nama"
                        type="text"
                        onChange={handleNamaChange}
                        value={formValues.nama}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Add;

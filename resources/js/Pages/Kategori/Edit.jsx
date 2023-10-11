import React from "react";
import { Form, Input, Modal, Button } from "antd";
import axios from "axios";
import { router } from "@inertiajs/react";

const CustomForm = ({ onChange, fields, form }) => {
    return (
        <Form
            form={form}
            layout="vertical"
            name="global_state"
            autoComplete="off"
            fields={fields}
            onFieldsChange={(_, allFields) => {
                onChange(allFields);
            }}
            encType="multipart/form-data"
        >
            <Form.Item
                name="nama"
                label="Nama"
                rules={[
                    {
                        required: true,
                        message: "Please input nama",
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

const Edit = ({ open, onSubmit, onCancel, id }) => {
    const [form] = Form.useForm();
    const [formValues, setFormValues] = React.useState([
        {
            name: ["nama"],
            value: "",
        },
    ]);

    React.useEffect(() => {
        getDataById();
    }, [id]);

    const handleSubmit = async () => {
        form.validateFields().then(async () => {
            const formData = new FormData();
            formData.append("nama", formValues[0].value);
            try {
                await axios.patch(
                    `http://localhost:8000/api/kategori/${id}`,
                    formData
                );
                form.resetFields();
                onSubmit();
                router.reload();
            } catch (error) {
                console.log(error.message);
            }
        });
        console.log("p", formValues[0].value);
    };

    const handleCancel = () => {
        onCancel();
    };

    const getDataById = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/kategori/${id}`
            );
            setFormValues([
                {
                    name: "nama",
                    value: data.data.nama,
                },
            ]);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Modal
            open={open}
            title="Edit Data"
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
            maskClosable
        >
            <CustomForm
                form={form}
                fields={formValues}
                onChange={(newFields) => {
                    setFormValues(newFields);
                }}
            />
        </Modal>
    );
};

export default Edit;

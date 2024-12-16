import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CreateCompany, GetCompany, EditCompany, DeleteCompany } from "../../../../services";
import DataTable from "react-data-table-component";
import { ChromePicker } from "react-color";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const AddCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [form] = Form.useForm();
  const [color, setColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const showModal = () => {
    setIsEditing(false);
    setIsModalVisible(true);
    form.resetFields();
    setColor("#000000");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentCompany(null);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    form.setFieldsValue({ colorCode: newColor.hex });
  };

  const handleAddOrEditCompany = async (values) => {
    const { companyName, companyLogo, companyCode, address, contactNumber, website, colorCode } = values;

    const formData = new FormData();
    formData.append("companyName", companyName);
    if (companyLogo) {
      formData.append("companyLogo", companyLogo.file);
    }
    formData.append("companyCode", companyCode);
    formData.append("address", address);
    formData.append("contactNumber", contactNumber);
    formData.append("website", website);
    formData.append("colorCode", colorCode);

    try {
      let response;

      if (isEditing && currentCompany) {
        response = await EditCompany(formData, currentCompany._id);
        if (response.status === 200) {
          message.success(`Company ${companyName} updated successfully!`);
          setCompanies((prev) =>
            prev.map((company) =>
              company.id === currentCompany.id
                ? { ...company, ...response.data.data }
                : company
            )
          );
        }
      } else {
        response = await CreateCompany(formData);
        if (response.status === 200) {
          message.success(`Company ${companyName} added successfully!`);
          setCompanies((prev) => [...prev, response.data.data]);
        }
      }
      handleCancel();
    } catch (error) {
      message.error("Error saving company. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleEdit = (company) => {
    setIsEditing(true);
    setCurrentCompany(company);
    setIsModalVisible(true);
    form.setFieldsValue(company);
    setColor(company.colorCode || "#000000");
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await GetCompany();
        if (response.status === 200) {
          setCompanies(response.data.data);
        } else {
          console.log("Failed to fetch companies.");
        }
      } catch (error) {
        console.log("Error fetching companies: " + error.message);
      }
    };

    fetchCompanies();
  }, []);



  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this company?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await DeleteCompany(id);
          if (response.status === 200) {
            message.success("Company deleted successfully!");
            setCompanies((prev) => prev.filter((company) => company.id !== id));
          }
        } catch (error) {
          message.error("Error deleting company. Please try again.");
          console.error("Error:", error);
        }
      },
    });
  };



  const columns = [
    {
      name: "S.No",
      selector: (row, i) => i + 1,
      sortable: true,
      center: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
      sortable: true,
      center: true,
    },
    {
      name: "Website",
      selector: (row) => row.website,
      sortable: true,
      center: true,
    },
    {
      name: "Company Code",
      selector: (row) => row.companyCode,
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="flex space-x-2 justify-center">
          <button
            onClick={() => handleEdit(row)}
            className="text-yellow-500 hover:text-yellow-700"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={20} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      center: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#ff9800",
        color: "#ffffff",
        fontSize: "16px",
      },
    },
  };

  return (
    <div className="p-4">
      <button
        onClick={showModal}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        Add Company
      </button>

      <div className="mt-4">
        <DataTable
          title="Company Details"
          customStyles={customStyles}
          columns={columns}
          data={companies}
          pagination
          highlightOnHover
        />
      </div>

      <Modal
        title={isEditing ? "Edit Company" : "Add New Company"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleAddOrEditCompany}
          layout="vertical"
          initialValues={{
            companyName: "",
            companyLogo: null,
            companyCode: "",
            address: "",
            contactNumber: "",
            website: "",
            colorCode: "#000000",
          }}
        >
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Please enter the company name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company Logo"
            name="companyLogo"
          >
            <Upload
              name="companyLogo"
              showUploadList={false}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Company Code"
            name="companyCode"
            rules={[{ required: true, message: "Please enter the company code!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[{ required: true, message: "Please enter the contact number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true, message: "Please enter the website!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Color Code (Hex)"
            name="colorCode"
            rules={[
              { required: true, message: "Please enter a valid hex color code!" },
              {
                pattern: /^#([0-9A-Fa-f]{3}){1,2}$/,
                message: "Please enter a valid hex color code (e.g. #FF5733)!",
              },
            ]}
          >
            <div className="flex items-center">
              <Input
                placeholder="#FF5733"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <div className="ml-2">
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  type="text"
                />
              </div>
            </div>
            {showColorPicker && (
              <div className="mt-2">
                <ChromePicker
                  color={color}
                  onChangeComplete={handleColorChange}
                />
              </div>
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {isEditing ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCompany;

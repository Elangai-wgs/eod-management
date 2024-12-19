import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Modal, Form, Input, Button, Select } from "antd";
import { CreateDepartment, CreateDesignation, GetDeparment, GetDesignation } from "../../services";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const { Option } = Select;

const AddDesignation = () => {
  const [data, setData] = useState([]);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDesignationModalOpen, setIsDesignationModalOpen] = useState(false);
  const [department, setDepartment] = useState([]);
  const [form] = Form.useForm();

  // Columns for the DataTable
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id || "n/a",
      sortable: true,
      center: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation || "n/a",
      sortable: true,
      center: true,
    },
    {
      name: "Department",
      selector: (row) => row.department || "n/a",
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      center: true,
      cell: (row) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handleView(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEye size={20} />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="text-green-500 hover:text-green-700"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={20} />
          </button>
        </div>
      ),
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

  // Fetch departments and designations, and map them
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch departments
        const departmentResponse = await GetDeparment();
        const departments = departmentResponse?.data?.data || [];
        setDepartment(departments);

        // Fetch designations
        const designationResponse = await GetDesignation();
        const designations = designationResponse?.data?.data || [];

        // Map designations to departments
        const mappedData = designations.map((designation, index) => {
          const departmentName = departments.find(
            (dept) => dept._id === designation.department_id
          )?.name || "N/A";

          return {
            id: index + 1,
            designation: designation.title,
            department: departmentName,
          };
        });

        setData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handlers for modals
  const handleAddDepartment = () => setIsDepartmentModalOpen(true);
  const handleAddDesignation = () => setIsDesignationModalOpen(true);
  const handleCancel = () => {
    setIsDepartmentModalOpen(false);
    setIsDesignationModalOpen(false);
    form.resetFields();
  };

  const handleDepartmentSubmit = async () => {
    try {
      const values = await form.validateFields();
      const response = await CreateDepartment(values);
      if (response) {
        alert("Department created successfully!");
        setIsDepartmentModalOpen(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Failed to create department:", error);
    }
  };

  const handleDesignationSubmit = async () => {
    try {
      const values = await form.validateFields();
      const response = await CreateDesignation(values);
      if (response) {
        alert("Designation created successfully!");
        setIsDesignationModalOpen(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Failed to create designation:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Designations</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleAddDepartment}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
          >
            Add Department
          </button>
          <button
            onClick={handleAddDesignation}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
          >
            Add Designation
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        highlightOnHover
        responsive
        className="shadow-md rounded-lg"
      />

      {/* Add Department Modal */}
      <Modal
        title="Add Department"
        visible={isDepartmentModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleDepartmentSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the department name" }]}
          >
            <Input placeholder="Enter department name" />
          </Form.Item>
          <Form.Item
            name="departmentCode"
            label="Department Code"
            rules={[{ required: true, message: "Please enter the department code" }]}
          >
            <Input placeholder="Enter department code" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>
          <div className="flex justify-end space-x-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Add Designation Modal */}
      <Modal
        title="Add Designation"
        visible={isDesignationModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleDesignationSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the designation title" }]}
          >
            <Input placeholder="Enter designation title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>
          <Form.Item
            name="department_id"
            label="Department"
            rules={[{ required: true, message: "Please select a department" }]}
          >
            <Select placeholder="Select a department">
              {department.map((dept) => (
                <Option key={dept._id} value={dept._id}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div className="flex justify-end space-x-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddDesignation;

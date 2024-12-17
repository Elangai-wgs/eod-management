// import React, { useState } from "react";
// import DataTable from "react-data-table-component";
// import { Modal, Form, Input, Button } from "antd";
// import { CreateDepartment } from "../../../../services";

// const AddDesignation = () => {
//   // Sample data for the datatable
//   const [data, setData] = useState([
//     { id: 1, designation: "Software Engineer", department: "IT" },
//     { id: 2, designation: "HR Manager", department: "HR" },
//     { id: 3, designation: "Sales Executive", department: "Sales" },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form] = Form.useForm();

//   // Columns for the datatable
//   const columns = [
//     {
//       name: "ID",
//       selector: (row) => row.id,
//       sortable: true,
//     },
//     {
//       name: "Designation",
//       selector: (row) => row.designation,
//       sortable: true,
//     },
//     {
//       name: "Department",
//       selector: (row) => row.department,
//       sortable: true,
//     },
//   ];

//   // Handlers for button clicks
//   const handleAddDesignation = () => {
//     alert("Add Designation button clicked");
//   };

//   const handleAddDepartment = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     form.resetFields();
//   };

//   const handleSubmit = async () => {
//     try {
//       const values = await form.validateFields();
//       const response = await CreateDepartment(values);
//       if (response) {
//         alert("Department created successfully!");
//         setIsModalOpen(false);
//         form.resetFields();
//       }
//     } catch (error) {
//       console.error("Failed to create department:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-bold">Designations</h1>
//         <div className="flex space-x-4">
//           <button
//             onClick={handleAddDepartment}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
//           >
//             Add Department
//           </button>
//           <button
//             onClick={handleAddDesignation}
//             className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
//           >
//             Add Designation
//           </button>
//         </div>
//       </div>
//       <DataTable
//         title="Designation List"
//         columns={columns}
//         data={data}
//         pagination
//         highlightOnHover
//         responsive
//         className="shadow-md rounded-lg"
//       />

//       <Modal
//         title="Add Department"
//         visible={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleSubmit}>
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: "Please enter the department name" }]}
//           >
//             <Input placeholder="Enter department name" />
//           </Form.Item>
//           <Form.Item
//             name="departmentCode"
//             label="Department Code"
//             rules={[{ required: true, message: "Please enter the department code" }]}
//           >
//             <Input placeholder="Enter department code" />
//           </Form.Item>
//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[{ required: true, message: "Please enter a description" }]}
//           >
//             <Input.TextArea placeholder="Enter description" rows={4} />
//           </Form.Item>
//           <div className="flex justify-end space-x-4">
//             <Button onClick={handleCancel}>Cancel</Button>
//             <Button type="primary" htmlType="submit">
//               Add
//             </Button>
//           </div>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default AddDesignation;

import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Modal, Form, Input, Button, Select } from "antd";
import { CreateDepartment, CreateDesignation, GetDeparment } from "../../services";
import { useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const { Option } = Select;

const AddDesignation = () => {
  // Sample data for the datatable
  const [data, setData] = useState([
    { id: 1, designation: "Software Engineer", department: "IT" },
    { id: 2, designation: "HR Manager", department: "HR" },
    { id: 3, designation: "Sales Executive", department: "Sales" },
  ]);

  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDesignationModalOpen, setIsDesignationModalOpen] = useState(false);
  const[department,setDepartment]=useState([])
  const [form] = Form.useForm();

  // Columns for the datatable
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      center: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
      center:true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      center: true,
      cell: (row) => (
        <div className="flex justify-center items-center gap-2">
          {/* View Icon */}
          <button
            onClick={() => handleView(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEye size={20}/>
          </button>
          {/* Edit Icon */}
          <button
            onClick={() => handleEdit(row)}
            className="text-green-500 hover:text-green-700"
          >
            <FaEdit size={20}/>
          </button>
          {/* Delete Icon */}
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={20}/>
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

  // Handlers for button clicks
  const handleAddDepartment = () => {
    setIsDepartmentModalOpen(true);
  };

  const handleAddDesignation = () => {
    setIsDesignationModalOpen(true);
  };

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

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await GetDeparment();
        if (response) {
          setDepartment(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
  
    fetchDepartment();
  }, []);

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
      {department.map((department) => (
        <Option key={department._id } value={department._id}>
        {department.name}
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

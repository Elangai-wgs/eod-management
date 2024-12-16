import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  AddStaffs,
  AllStaffs,
  DeleteStaffs,
  EditStaffs,
  GetCompany,
  GetDeparment,
  GetDesignation,
  GetRole,
} from "../../services";
import dayjs from "dayjs";

const { Option } = Select;

const Staffs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [showIsTrainer, setShowIsTrainer] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [role, setRole] = useState([]);
  const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [company, setCompany] = useState([]);
  const [isCardModalVisible, setIsCardModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editModal, SetEditModal] = useState(false);
  const [editStaff, SetEditStaff] = useState({
    id: "",
    staffId: "",
    personalEmail: "",
    professionalEmail: "",
    permanentAddress: "",
    currentAddress: "",
    doj: "",
    company_id: "",
    fullName: "",

    gender: "",
    phoneNumber: "",
    address: "",
    designation_id: "",
    qualification: "",
    dob: "",
    experience: "",
    department_id: "",
    hybrid: "",
    role: "",
    password: "",
    profilePic: "",
    isTrainer: false,
  });
  console.log(selectedStaff);

  useEffect(() => {
    const fetchStaffData = () => {
      AllStaffs()
        .then((res) => {
          setStaffs(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          message.error("Error fetching staff data. Please try again.");
          console.error("Error fetching staff data:", error.message);
        });
    };

    fetchStaffData();
  }, []);

  useEffect(() => {
    const fetchCompany = () => {
      GetCompany()
        .then((res) => {
          setCompany(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          message.error("Error fetching staff data. Please try again.");
          console.error("Error fetching staff data:", error.message);
        });
    };

    fetchCompany();
  }, []);

  useEffect(() => {
    const fetchRole = () => {
      GetRole()
        .then((res) => {
          const role = res.data.data;
          setRole(role);
          console.log(role, "gopi");
        })
        .catch((err) => {
          console.log("Error fetching staff data:", err.message);
        });
    };
    fetchRole();
  }, []);
  useEffect(() => {
    const fetchDesignation = () => {
      GetDesignation()
        .then((res) => {
          setDesignation(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log("Error fetching staff data:", err.message);
        });
    };
    fetchDesignation();
  }, []);

  useEffect(() => {
    const fetchDepartment = () => {
      GetDeparment()
        .then((res) => {
          setDepartment(res.data.data);
          console.log(res.data.data, "nandan");
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    fetchDepartment();
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCardClick = (staff) => {
    setSelectedStaff(staff);
    setIsCardModalVisible(true);
  };
  const handleCloseCardModal = () => {
    setSelectedStaff(null);
    setIsCardModalVisible(false);
  };

  const handleRoleChange = (value) => {
    setShowIsTrainer(value === "Employee");
  };

  const handleAddStaff = async (values) => {
    console.log(values, "values");
    const formData = new FormData();
    formData.append("staffId", values.staffId);
    formData.append("fullName", values.fullName);
    formData.append("personalEmail", values.personalEmail);
    formData.append("professionalEmail", values.professionalEmail);
    formData.append("gender", values.gender);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("permanentAddress", values.permanentAddress);
    formData.append("currentAddress", values.currentAddress);
    formData.append("designation", values.designation);
    formData.append("qualification", values.qualification);
    formData.append("dob", values.dob);
    formData.append("doj", values.doj);
    formData.append("company_id", values.company);
    formData.append("experience", values.experience);
    formData.append("department_id", values.department);
    formData.append("hybrid", values.hybrid);
    formData.append("role", values.role);
    formData.append("password", values.password);
    formData.append("isTrainer", values.isTrainer);
    console.log(values);

    if (values.profilePic && values.profilePic.file) {
      formData.append("profilePic", values.profilePic.file);
    }

    await AddStaffs(formData)
      .then((res) => {
        if (res.status === 200) {
          message.success("Staff added successfully!");
          handleCloseModal();
        } else {
          message.error("Failed to add staff.");
        }
      })
      .catch((err) => {
        console.log(err, "error adding staffs");
      });
  };

  const handleProfilePicUpload = (file) => {
    form.setFieldValue("profilePic", file);
    return false;
  };

  const handleEditStaffModal = (staff) => {
    console.log(staff);

    SetEditModal(true);
    SetEditStaff({
      id: staff._id,
      staffId: staff.staffId,

      fullName: staff.fullName,
      gender: staff.gender,
      personalEmail: staff.personalEmail,
      professionalEmail: staff.professionalEmail,
      phoneNumber: staff.phoneNumber,
      address: staff.address,
      designation_id: staff.designation,
      qualification: staff.qualification,
      dob: staff.dob,
      doj: staff.doj,
      experience: staff.experience,
      department_id: staff.department,
      hybrid: staff.hybrid,
      company_id: staff.company,
      role: staff.role,
      password: staff.password,
    });
  };

  const handleEditStaff = (values) => {
    const editFormData = new FormData();

    editFormData.append("staffId", editStaff.staffId);
    editFormData.append("fullName", editStaff.fullName);
    editFormData.append("personalEmail", editStaff.personalEmail);
    editFormData.append("professionalEmail", editStaff.professionalEmail);
    editFormData.append("gender", editStaff.gender);
    editFormData.append("phoneNumber", editStaff.phoneNumber);
    editFormData.append("permanentAddress", editStaff.permanentAddress);
    editFormData.append("currentAddress", editStaff.currentAddress);
    editFormData.append("designation", editStaff.designation_id);
    editFormData.append("qualification", editStaff.qualification);
    editFormData.append("dob", editStaff.dob);
    editFormData.append("doj", editStaff.doj);
    editFormData.append("experience", editStaff.experience);
    editFormData.append("department", editStaff.department_id);
    editFormData.append("company", editStaff.company_id);
    editFormData.append("hybrid", editStaff.hybrid);
    editFormData.append("istrainer", editStaff.isTrainer);
    editFormData.append("role", editStaff.role);
    // editFormData.append("password", editStaff.password);

    if (values.profilePic && values.profilePic.file) {
      editFormData.append("profilePic", values.profilePic.file);
    }

    EditStaffs(editStaff.id, editFormData)
      .then((res) => {
        if (res.status === 200) {
          message.success("Edit Successfull");
          SetEditModal(false);
          console.log(editFormData);
        }
      })
      .catch((err) => {
        console.log(err, "error editing staffs");
      });
  };
  const handleDeleteStaff = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Staff?",
      content: "This action cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        className: "bg-orange-500 text-white hover:bg-orange-600",
      },
      cancelButtonProps: {
        className: "bg-gray-500 text-white hover:bg-gray-600",
      },

      onOk: async () => {
        try {
          // Pass the correct ID to delete
          await DeleteStaffs(id);

          // Make sure the filtering is done using the correct ID field
          setStaffs(
            (prevStaffs) => prevStaffs.filter((staff) => staff._id !== id) // Use _id if your staff object has _id
          );
          message.success("Staff deleted successfully.");
        } catch (error) {
          console.error("Error deleting Staff:", error);
          message.error("Failed to delete the Staff. Please try again.");
        }
      },
      onCancel: () => {
        message.info("Deletion canceled.");
      },
    });
  };

  return (
    <div className="px-6 py-2">
      <div className="flex justify-between mb-4">
        <div>
          <input
            type="text"
            placeholder="Search Staff"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-1 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={handleOpenModal}
          className="flex gap-2 items-center px-3 py-1 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-200"
        >
          <IoMdAdd className="text-white" />
          Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {staffs.length > 0 ? (
          staffs.map((staff) => (
            <div
              key={staff.id}
              className="bg-white shadow-[0px_1px_14px_7px_#00000024] rounded-lg  overflow-hidden w-full"
            >
              {/* Image Container with Overlay */}
              <div className="relative group">
                {/* Staff Image */}
                <img
                  className="w-full h-60 object-cover p-2 rounded-xl"
                  src={staff?.profilePic || "https://via.placeholder.com/400"}
                  alt={staff.name}
                />

                {/* Overlay for Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-4">
                    {/* View Icon */}
                    <button
                      className="flex flex-col justify-center items-center w-8 h-8 rounded-full text-white bg-orange-500 hover:bg-white hover:text-orange-500 duration-200"
                      onClick={() => handleCardClick(staff)}
                    >
                      <span className="text-sm">
                        <FiEye size={20} />
                      </span>
                    </button>

                    {/* Edit Icon */}
                    <button
                      className="flex flex-col justify-center items-center w-8 h-8 rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 duration-200"
                      onClick={() => handleEditStaffModal(staff)}
                    >
                      <span className="text-sm">
                        <FiEdit size={20} />
                      </span>
                    </button>

                    {/* Delete Icon */}
                    <button
                      className="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 duration-200"
                      onClick={() => handleDeleteStaff(staff._id)}
                    >
                      <span className="text-sm ">
                        <FiTrash size={20} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Staff Details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Name: {staff.fullName}
                </h2>
                <p className="text-gray-600">Position: {staff.roleName}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No Staffs found.
          </p>
        )}
      </div>

      <Modal
        title="Add New Staff"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddStaff}
          className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4"
        >
          <Form.Item
            label="Staff ID"
            name="staffId"
            rules={[{ required: true, message: "Please enter the StaffId" }]}
            className="col-span-1"
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter full name" }]}
            className="col-span-1"
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Personal Email"
            name="personalEmail"
            rules={[{ type: "email", message: "Please enter a valid email" }]}
            className="col-span-1"
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Professional Email"
            name="professionalEmail"
            rules={[{ type: "email", message: "Please enter a valid email" }]}
            className="col-span-1"
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
            className="col-span-1"
          >
            <Input.Password className="w-full" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
            className="col-span-1"
          >
            <Select className="w-full">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please enter phone number" }]}
            className="col-span-1"
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Permanent Address"
            name="permanentAddress"
            className="col-span-1"
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="Current Address"
            name="currentAddress"
            className="col-span-1"
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item label="Designation" name="designation">
            <Select placeholder="Select a designation">
              {designation.map((desg) => (
                <Option key={desg.id} value={desg._id}>
                  {desg.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select role" }]}
            className="col-span-1"
          >
            <Select className="w-full" onChange={handleRoleChange}>
              {role.map((role) => (
                <Option key={role.id} value={role._id}>
                  {role.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Qualification"
            name="qualification"
            className="col-span-1"
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: "Please select date of birth" }]}
            className="col-span-1"
          >
            <DatePicker
              className="w-full"
              format="DD-MM-YYYY"
              onChange={(date) => {
                if (date) {
                  const formattedDate = dayjs(date).format("DD-MM-YYYY");
                  console.log("Formatted Date of Birth:", formattedDate);
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="Date of Join"
            name="doj"
            rules={[{ required: true, message: "Please select date of Join" }]}
            className="col-span-1"
          >
            <DatePicker
              className="w-full"
              format="DD-MM-YYYY"
              onChange={(date) => {
                if (date) {
                  const formattedDate = dayjs(date).format("DD-MM-YYYY");
                  console.log("Formatted Date of Birth:", formattedDate);
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="Experience"
            name="experience"
            className="col-span-1"
          >
            <Select className="w-full">
              <Option value="0 to 1 year">0 to 1</Option>
              <Option value="1 to 3 years">1 to 3</Option>
              <Option value="3 to 5 years">3 to 5</Option>
              <Option value="5+">5+</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            className="col-span-1"
          >
            <Select placeholder="Select a department" className="w-full">
              {department.map((department) => (
                <Option key={department._id} value={department._id}>
                  {department.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Company" name="company" className="col-span-1">
            <Select placeholder="Select a Company" className="w-full">
              {company.map((companies) => (
                <Option key={companies.id} value={companies._id}>
                  {companies.companyName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Hybrid"
            name="hybrid"
            rules={[
              { required: true, message: "Please select hybrid work model" },
            ]}
            className="col-span-1"
          >
            <Select className="w-full">
              <Option value="Online">Online</Option>
              <Option value="Offline">Offline</Option>
              <Option value="WFH">WFH</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Profile Picture"
            name="profilePic"
            valuePropName="file"
            className="col-span-1"
          >
            <Upload
              beforeUpload={handleProfilePicUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} className="w-full">
                Upload Profile Picture
              </Button>
            </Upload>
          </Form.Item>
          {showIsTrainer && (
            <Form.Item
              label="IsTrainer"
              name="isTrainer"
              initialValue={false}
              rules={[{ required: true, message: "Please select yes or no" }]}
              className="col-span-1"
            >
              <Select className="w-full">
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item className="col-span-2">
            <button
              htmlType="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md"
            >
              Add Staff
            </button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={
          <h2 className="text-2xl font-bold text-gray-800">Staff Details</h2>
        }
        visible={isCardModalVisible}
        onCancel={handleCloseCardModal}
        footer={null}
        width="60%"
        centered
      >
        {selectedStaff && (
          <div className="flex flex-col md:flex-row items-center gap-8 p-">
            {/* Image Section */}
            <div className="flex justify-center">
              <img
                className="h-[400px] w-[600px]   object-cover rounded-lg"
                src={
                  selectedStaff.profilePic || "https://via.placeholder.com/400"
                }
                alt={selectedStaff.fullName}
              />
            </div>

            {/* Data Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white w-full p-6 h-96 rounded-lg shadow-lg">
              <h2 className="text-4xl font-bold mb-4">
                {selectedStaff.fullName}
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {selectedStaff.gender}
                </p>
                <p>
                  <span className="font-semibold">Role:</span>{" "}
                  {selectedStaff.role}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedStaff.email}
                </p>
                <p>
                  <span className="font-semibold">Dob:</span>{" "}
                  {selectedStaff.dob}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedStaff.phoneNumber}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedStaff.address}
                </p>

                <p>
                  <span className="font-semibold">Qualification:</span>{" "}
                  {selectedStaff.qualification}
                </p>
                <p>
                  <span className="font-semibold">Designation:</span>{" "}
                  {selectedStaff.designation}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Edit Staff Details"
        visible={editModal}
        footer={null}
        onCancel={() => SetEditModal(false)}
        centered
      >
        {editStaff && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleEditStaff}
            className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4"
          >
            <Form.Item
              label="Staff ID"
              // name="staffId"
              rules={[{ required: true, message: "Please enter the StaffId" }]}
              className="col-span-1"
            >
              <Input
                className="w-full"
                value={editStaff.staffId}
                onChange={(e) =>
                  SetEditStaff({ ...editStaff, staffId: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="Full Name"
              // name="fullName"
              rules={[{ required: true, message: "Please enter full name" }]}
              className="col-span-1"
            >
              <Input
                className="w-full"
                value={editStaff.fullName}
                onChange={(e) =>
                  SetEditStaff({ ...editStaff, fullName: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="Personal Email"
              // name="personalEmail"
              rules={[{ type: "email", message: "Please enter a valid email" }]}
              className="col-span-1"
            >
              <Input
                className="w-full"
                value={editStaff.personalEmail}
                onChange={(e) =>
                  SetEditStaff({ ...editStaff, personalEmail: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="Professional Email"
              // name="professionalEmail"
              rules={[{ type: "email", message: "Please enter a valid email" }]}
              className="col-span-1"
            >
              <Input
                className="w-full"
                value={editStaff.professionalEmail}
                onChange={(e) =>
                  SetEditStaff({
                    ...editStaff,
                    professionalEmail: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              // name="gender"
              rules={[{ required: true, message: "Please select gender" }]}
              className="col-span-1"
            >
              <Select
                className="w-full"
                value={editStaff.gender}
                onChange={(value) =>
                  SetEditStaff({ ...editStaff, gender: value })
                }
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Phone Number"
              // name="phoneNumber"
              rules={[{ required: true, message: "Please enter phone number" }]}
              className="col-span-1"
            >
              <Input
                className="w-full"
                value={editStaff.phoneNumber}
                onChange={(e) =>
                  SetEditStaff({ ...editStaff, phoneNumber: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="PermanentAddress"
              // name="address"
              className="col-span-1"
            >
              <Input
                className="w-full"
                value={editStaff.permanentAddress}
                onChange={(e) =>
                  SetEditStaff({
                    ...editStaff,
                    permanentAddress: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Current Address"
              // name="address"
              className="col-span-1"
            >
              <Input
                className="w-full"

                value={editStaff.currentAddress}
                onChange={(e) =>
                  SetEditStaff({ ...editStaff, currentAddress: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="Designation"
              className="col-span-1"
            >
              <Select
                placeholder="Select a designation"
                value={editStaff.designation_id}
                onChange={(value)=>{
                  SetEditStaff({...editStaff,designation_id: value})
                }}
              >
                {designation.map((desg) => (
                  <Option key={desg.id} value={desg._id}>
                    {desg.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Role"
              // name="role"
              rules={[{ required: true, message: "Please select role" }]}
              className="col-span-1"
            >
              <Select
                className="w-full"
                value={editStaff.role}
                onChange={(value) => {
                  console.log("role", value);

                  SetEditStaff({ ...editStaff, role: value });
                }}
              >
                {role.map((role) => (
                  <Option key={role.id} value={role._id}>
                    {role.roleName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Qualification"
              // name="qualification"
              className="col-span-1"
            >
              <Input
                className="w-full"
                value={editStaff.qualification}
                onChange={(e) =>
                  SetEditStaff({ ...editStaff, qualification: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              // name="dob"
              rules={[
                { required: true, message: "Please select date of birth" },
              ]}
              className="col-span-1"
            >
              <DatePicker
                className="w-full"
                format="DD-MM-YY"
                value={
                  editStaff.dob ? dayjs(editStaff.dob, "DD-MM-YYYY") : null
                }
                onChange={(e) =>
                  SetEditStaff({
                    ...editStaff,
                    dob: e ? e.format("DD-MM-YYYY") : null,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Date of Join"
              // name="dob"
              rules={[
                { required: true, message: "Please select date of join" },
              ]}
              className="col-span-1"
            >
              <DatePicker
                className="w-full"
                format="DD-MM-YY"
                value={
                  editStaff.doj ? dayjs(editStaff.doj, "DD-MM-YYYY") : null
                }
                onChange={(e) =>
                  SetEditStaff({
                    ...editStaff,
                    doj: e ? e.format("DD-MM-YYYY") : null,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Experience"
              // name="experience"
              className="col-span-1"
            >
              <Select
                className="w-full"
                value={editStaff.experience}
                onChange={(value) =>
                  SetEditStaff({ ...editStaff, experience: value })
                }
              >
                <Option value="0 to 1">0 to 1</Option>
                <Option value="1 to 3">1 to 3</Option>
                <Option value="3 to 5">3 to 5</Option>
                <Option value="5+">5+</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Department" className="col-span-1">
              <Select
                placeholder="Select a department"
                className="w-full"
                value={editStaff.department_id}
                onChange={(value) =>
                  SetEditStaff({ ...editStaff, department: value })
                }
              >
                {department.map((department) => (
                  <Option key={department._id} value={department._id}>
                    {department.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Company" className="col-span-1">
              <Select
                placeholder="Select a Company"
                className="w-full"
                value={editStaff.company_id}
                onChange={(value) =>
                  SetEditStaff({ ...editStaff, company_id: value })
                }
              >
                {company.map((companies) => (
                  <Option key={companies._id} value={companies._id}>
                    {companies.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Hybrid"
              // name="hybrid"
              rules={[
                { required: true, message: "Please select hybrid work model" },
              ]}
              className="col-span-1"
            >
              <Select
                className="w-full"
                value={editStaff.hybrid}
                onChange={(value) =>
                  SetEditStaff({ ...editStaff, hybrid: value })
                }
              >
                <Option value="Online">Online</Option>
                <Option value="Offline">Offline</Option>
                <Option value="WFH">WFH</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Profile Picture"
              name="profilePic"
              valuePropName="file"
              className="col-span-2"
            >
              <Upload
                beforeUpload={handleProfilePicUpload}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} className="w-full">
                  Upload Profile Picture
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item className="col-span-2">
              <button
                htmlType="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-1 rounded-md"
              >
                Add Staff
              </button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};
export default Staffs;

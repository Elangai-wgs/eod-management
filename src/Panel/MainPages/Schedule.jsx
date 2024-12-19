import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  TimePicker,
  Select,
  DatePicker,
  message,
} from "antd";

import { AllStaffs, EditSchedule, GetBatches, createSchedule, getSchedule } from "../../services";
import { MdOutlinePauseCircleOutline } from "react-icons/md";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { isAllowedTo } from "../../utils/utils";
import { useSelector } from "react-redux";
import UnauthorizedAccess from "../../components/UnauthorizedAccess";
import moment from "moment";

const { Option } = Select;

const Schedule = () => {
  const permission = useSelector((state)=>state.Permissions?.shedule);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batches, setBatches] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const[schedule,setSchedule] = useState([]);
  const[editMode, setEditMode] = useState(false);
  const[currentItem,setCurrentItem]=useState(null)
  const [form] = Form.useForm();

 
  const handleOpenModal = () => {
    setEditMode(false); // Default to add mode
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null); // Clear current item
  };

  const handleEdit = (item) => {
    setEditMode(true); // Switch to edit mode
    setCurrentItem(item);
    setIsModalOpen(true);


    form.setFieldsValue({
      batch: item._id,
      date: item.date && moment(item.date), // Convert to moment object
      timeTable: item.details.map((detail) => ({
        trainer: detail.trainer,
        startTime: moment(detail.startTime, "HH:mm"),
        endTime: moment(detail.endTime, "HH:mm"),
        subject: detail.subject,
      })),
    });
  };


  
  const handleSubmit = async (values) => {
    if (!values.batch || !values.date || !values.timeTable) {
      message.error("Please ensure all required fields are filled!");
      return;
    }

    const payload = {
      batch: values.batch,
      date: values.date.format("YYYY-MM-DD"),
      timeTable: values.timeTable.map((item) => ({
        trainer: item.trainer,
        startTime: item.startTime.format("HH:mm"),
        endTime: item.endTime.format("HH:mm"),
        subject: item.subject,
      })),
    };

    try {
      let response;
      if (editMode && currentItem) {
        // Update existing schedule
        response = await EditSchedule(currentItem._id, payload); // Replace with your API call
        if (response.status === 200) {
          message.success("Schedule updated successfully!");
        } else {
          message.error("Failed to update schedule. Please try again.");
        }
      } else {
        // Create new schedule
        response = await createSchedule(payload);
        if (response.status === 200) {
          message.success("Schedule added successfully!");
        } else {
          message.error("Failed to add schedule. Please try again.");
        }
      }

      form.resetFields();
      handleCloseModal();
      // Refresh schedules
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to save schedule. Please try again.");
    }
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await GetBatches();
        setBatches(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching batches:", error.message);
      }
    };

    const fetchStaffs = async () => {
      try {
        const response = await AllStaffs();
        setStaffs(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching staffs:", error.message);
      }
    };

    fetchBatches();
    fetchStaffs();
    console.log(permission,"schedule");
  }, []);

  useEffect(()=>{
    const fetchSchedule = async ()=>{
      try {
        
        const response = await getSchedule();
        setSchedule(response.data.data);
        console.log(response.data.data,"gopi");
  
      } catch (error) {
        console.log("erro in getschedule",error.message);
      }
    }
fetchSchedule();
  },[])
 

  

  return (
   <>
   {
    isAllowedTo(permission,["view","viewOwn"])?<div className="p-4">
      {isAllowedTo(permission,["create"])&&<Button type="primary" onClick={handleOpenModal}>
        Add Schedule
      </Button>}


      <div className="grid grid-cols-1 gap-6">
        {schedule.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow p-4 bg-white space-y-4"
          >
            {/* Batch and Date */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-primary">{item.batch}</h3>
              
            {isAllowedTo(permission,["manage"])&&(<>  <div className="flex space-x-3">
                <FaEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleEdit(item)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                />
              </div>
              </>)}
            </div>
              <p className="text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </p>
            

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border border-gray-200 px-4 py-2">Start Time</th>
                    <th className="border border-gray-200 px-4 py-2">End Time</th>
                    <th className="border border-gray-200 px-4 py-2">Subject</th>
                    <th className="border border-gray-200 px-4 py-2">Trainer</th>
                    <th className="border border-gray-200 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {item.details.map((detail, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="border border-gray-200 px-4 py-2">
                        {detail.startTime}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {detail.endTime}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {detail.subject}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
  {item.trainerDetails?.map((trainer) => trainer.fullName).join(", ") || "N/A"}
</td>
                      <td
                        className={`border border-gray-200 px-4 py-2 ${
                          detail.status === "not started"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {detail.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>




      <Modal
        title={editMode ? "Edit Schedule" : "Add Schedule"}
        visible={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            timeTable: [
              { trainer: "", startTime: null, endTime: null, subject: "" },
            ],
          }}
          className="space-y-6"
        >
          {/* Select Batch */}
          <Form.Item
            label="Batch"
            name="batch"
            rules={[{ required: true, message: "Please select the batch!" }]}
          >
            <Select placeholder="Select batch">
              {batches.map((batch) => (
                <Option key={batch._id} value={batch._id}>
                  {batch.batchName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          

          {/* Select Date */}
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker format="YYYY-MM-DD" className="w-full" />
          </Form.Item>

          {/* Add Subjects, Trainers, Start Time, and End Time */}
          <Form.List name="timeTable">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key} className="border px-4 rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-1">
                      {/* Subject */}
                      <Form.Item
                        {...restField}
                        label="Subject"
                        name={[name, "subject"]}
                        fieldKey={[fieldKey, "subject"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select the subject!",
                          },
                        ]}
                      >
                        <Select placeholder="Select subject">
                          {[
                            "Html/Css",
                            "Javascript",
                            "J-Query",
                            "React.Js",
                            "Node.Js/Mongodb",
                            "Python",
                            "Figma",
                            "PHP",
                            "Flutter",
                          ].map((subject) => (
                            <Option key={subject} value={subject}>
                              {subject}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      {/* Trainer */}
                      <Form.Item
                        {...restField}
                        label="Trainer"
                        name={[name, "trainer"]}
                        fieldKey={[fieldKey, "trainer"]}
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please select a trainer!",
                        //   },
                        // ]}
                      >
                        <Select placeholder="Select trainer">
                          {staffs.map((trainer) => (
                            <Option key={trainer._id} value={trainer._id}>
                              <div className="flex gap-4 items-center">
                                <img
                                  src={trainer.profilePic}
                                  alt=""
                                  className="w-10 h-10 rounded-full object-contain"
                                />
                                {trainer.fullName}
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      {/* Start Time */}
                      <Form.Item
                        {...restField}
                        label="Start Time"
                        name={[name, "startTime"]}
                        fieldKey={[fieldKey, "startTime"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select start time!",
                          },
                        ]}
                      >
                        <TimePicker className="w-full" format="HH:mm" />
                      </Form.Item>

                      {/* End Time */}
                      <Form.Item
                        {...restField}
                        label="End Time"
                        name={[name, "endTime"]}
                        fieldKey={[fieldKey, "endTime"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select end time!",
                          },
                        ]}
                      >
                        <TimePicker className="w-full" format="HH:mm" />
                      </Form.Item>
                    </div>

                    <Button
                      type="dashed"
                      onClick={() => remove(name)}
                      icon={<MdOutlinePauseCircleOutline />}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<FaPlus />}
                  className="w-full"
                >
                  Add timetable entry
                </Button>
              </div>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
            {editMode ? "Update Schedule" : "Add Schedule"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>:<UnauthorizedAccess/>
}
</>

    );
};

export default Schedule;


// import React, { useState } from "react";
// import { Form, Modal, Button, Input, DatePicker, TimePicker, Table } from "antd";
// import moment from "moment";

// const App = () => {
//   const [form] = Form.useForm();
//   const [editMode, setEditMode] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const data = [
//     {
//       id: 1,
//       batch: "Batch A",
//       date: "2024-12-18",
//       details: [
//         {
//           trainer: "John Doe",
//           startTime: "10:00",
//           endTime: "12:00",
//           subject: "Mathematics",
//         },
//       ],
//     },
//   ];

//   const handleEdit = (item) => {
//     setEditMode(true);
//     setCurrentItem(item);
//     setIsModalOpen(true);

//     form.setFieldsValue({
//       batch: item.batch,
//       date: item.date && moment(item.date), // Convert to moment object
//       timeTable: item.details.map((detail) => ({
//         trainer: detail.trainer,
//         startTime: moment(detail.startTime, "HH:mm"),
//         endTime: moment(detail.endTime, "HH:mm"),
//         subject: detail.subject,
//       })),
//     });
//   };

//   const handleSave = () => {
//     form.validateFields().then((values) => {
//       console.log("Form values:", values);
//       setIsModalOpen(false);
//       form.resetFields();
//       setEditMode(false);
//     });
//   };

//   const columns = [
//     { title: "Batch", dataIndex: "batch", key: "batch" },
//     { title: "Date", dataIndex: "date", key: "date" },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Button onClick={() => handleEdit(record)}>Edit</Button>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Table dataSource={data} columns={columns} rowKey="id" />
//       <Modal
//         title={editMode ? "Edit Schedule" : "Add Schedule"}
//         visible={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setIsModalOpen(false)}>
//             Cancel
//           </Button>,
//           <Button key="save" type="primary" onClick={handleSave}>
//             Save
//           </Button>,
//         ]}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             label="Batch"
//             name="batch"
//             rules={[{ required: true, message: "Please enter batch name!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Date"
//             name="date"
//             rules={[{ required: true, message: "Please select a date!" }]}
//           >
//             <DatePicker />
//           </Form.Item>
//           <Form.List name="timeTable">
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map(({ key, name, fieldKey }) => (
//                   <div key={key} style={{ marginBottom: "12px" }}>
//                     <Form.Item
//                       label="Trainer"
//                       name={[name, "trainer"]}
//                       fieldKey={[fieldKey, "trainer"]}
//                       rules={[{ required: true, message: "Enter trainer name" }]}
//                     >
//                       <Input />
//                     </Form.Item>
//                     <Form.Item
//                       label="Start Time"
//                       name={[name, "startTime"]}
//                       fieldKey={[fieldKey, "startTime"]}
//                       rules={[{ required: true, message: "Enter start time" }]}
//                     >
//                       <TimePicker format="HH:mm" />
//                     </Form.Item>
//                     <Form.Item
//                       label="End Time"
//                       name={[name, "endTime"]}
//                       fieldKey={[fieldKey, "endTime"]}
//                       rules={[{ required: true, message: "Enter end time" }]}
//                     >
//                       <TimePicker format="HH:mm" />
//                     </Form.Item>
//                     <Form.Item
//                       label="Subject"
//                       name={[name, "subject"]}
//                       fieldKey={[fieldKey, "subject"]}
//                       rules={[{ required: true, message: "Enter subject" }]}
//                     >
//                       <Input />
//                     </Form.Item>
//                     <Button type="link" onClick={() => remove(name)}>
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//                 <Button type="dashed" onClick={() => add()}>
//                   Add Schedule
//                 </Button>
//               </>
//             )}
//           </Form.List>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default App;

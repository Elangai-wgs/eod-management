import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form, Input, DatePicker, Space } from "antd";
import moment from "moment";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { CreateMonthlyPayroll, DeletePayroll, GetMonthlyPayroll, UpdateMonthlyPayroll } from "../../services";
import { isAllowedTo } from "../../utils/utils";
import { useSelector } from "react-redux";
import UnauthorizedAccess from "../../components/UnauthorizedAccess";

const { MonthPicker } = DatePicker;

const MonthlyPayroll = () => {
const permission = useSelector((state)=>state.Permissions?.monthlyPayroll)
  const [payrolls, setPayrolls] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  // Open Modal
  const openModal = (payroll = null) => {
    if (payroll) {
      form.setFieldsValue({
        noOfWorkingDays: payroll.noOfWorkingDays,
        numberOfPaidHolydays: payroll.numberOfPaidHolydays,
        payDate: moment(payroll.payDate, "DD/MM/YYYY"),
        monthYear: moment(payroll.dateString, "MM-YYYY"),
      });
      setEditingId(payroll._id);
    } else {
      form.resetFields();
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handelFetch = async () => {
    try {
        const response = await GetMonthlyPayroll();
        setPayrolls(response.data.data);
    } catch (error) {
        console.log(error,"error in monthly fetch")
        // add toast
    }
  }

  // Handle Submit
  const handleSubmit = async(values) => {
    const { noOfWorkingDays, numberOfPaidHolydays, payDate, monthYear } =
      values;

    const newPayroll = {
      _id: editingId || Date.now().toString(),
      dateString: monthYear.format("MM-YYYY"),
      noOfWorkingDays,
      numberOfPaidHolydays,
      payDate: payDate.format("DD/MM/YYYY"),
    };

    if (editingId) {
        try {
            const response =  await UpdateMonthlyPayroll(editingId,newPayroll);
            console.log(response.data.message);
            // add toast
            setPayrolls((prev) =>
                prev.map((item) => (item._id === editingId ? newPayroll : item))
              );
              setIsModalOpen(false);
              setEditingId(null);
        } catch (error) {
            console.log(error,"error in payroll create")
        }
    } else {
      try {
        const response = await CreateMonthlyPayroll(newPayroll);
        console.log(response.data.message);
        // add toast
        setPayrolls((prev) => [...prev, newPayroll]);
        setIsModalOpen(false);
      } catch (error) {
        console.log(error,"error");
        // add toast
      }
    }
  };

  // Delete Payroll
  const deletePayroll = async (id) => {
    try {
    const response = await DeletePayroll(id);
    console.log(response.data.message);
    // add toast
    setPayrolls((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
        console.log(error,"error delete")
    }
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, i) => i + 1,
      sortable: true,
      center: true,
    },
    {
      name: "MM-YYYY",
      selector: (row) => row?.dateString,
      sortable: true,
      center: true,
    },
    {
      name: "No Of Working Days",
      selector: (row) => row?.noOfWorkingDays,
      sortable: true,
      center: true,
    },
    {
      name: "No Of Paid Holydays",
      selector: (row) => row?.numberOfPaidHolydays,
      sortable: true,
      center: true,
    },
    {
      name: "Pay Date",
      selector: (row) => row?.payDate,
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      center: true,
      cell: (row) => (
        <div className="flex gap-2">
          {
            isAllowedTo(permission,["manage"])&&(<>
            <Button
            onClick={() => openModal(row)}
            className="border border-green-500 text-green-500 px-2"
          >
            <FaPen />
          </Button>

          <Button
            onClick={() => deletePayroll(row._id)}
            className="border border-red-500 text-red-500 px-2"
          >
            <FaTrash />
          </Button></>)}
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


  useEffect(()=>{handelFetch()},[]);

  return (
    <>
    {
      isAllowedTo(permission,["view"])?
    
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold w-">Monthly Payroll Management</h1>
       {isAllowedTo(permission,["create"])&&<button
          onClick={() => {
            openModal();
          }}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-white hover:text-orange-600 hover:border border-orange-600 transition"
        >
          + Add Payroll
        </button>}
      </div>

      <DataTable
        columns={columns}
        data={payrolls}
        customStyles={customStyles}
        pagination
        highlightOnHover
        pointerOnHover
        className="border rounded shadow-sm"
      />

      {/* Ant Design Modal */}
      <Modal
        title={editingId ? "Edit Payroll" : "Add Payroll"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="monthYear"
            label="Select Month and Year"
            rules={[
              { required: true, message: "Please select month and year" },
            ]}
          >
            <MonthPicker
              placeholder="Select Month and Year"
              format="MM-YYYY"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="noOfWorkingDays"
            label="Working Days"
            rules={[{ required: true, message: "Please enter working days" }]}
          >
            <Input type="number" placeholder="Enter working days" />
          </Form.Item>
          <Form.Item
            name="numberOfPaidHolydays"
            label="Paid Holidays"
            rules={[{ required: true, message: "Please enter paid holidays" }]}
          >
            <Input type="number" placeholder="Enter paid holidays" />
          </Form.Item>
          <Form.Item
            name="payDate"
            label="Pay Date"
            rules={[{ required: true, message: "Please select pay date" }]}
          >
            <DatePicker
              placeholder="Select pay date"
              format="DD/MM/YYYY"
              className="w-full"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>:<UnauthorizedAccess/>
}
</>
  );
};

export default MonthlyPayroll;

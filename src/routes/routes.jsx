// // const pages = [
// //   {
// //     title: "login",
// //     path: "/",
// //     element: <Login />,
// //     access: ["open"],
// //     layout: true,
// //   },
// // ];

import Batches from "../Panel/MainPages/Batches";
import Course from "../Panel/MainPages/Course"
import PageNotFound from "../components/PageNotFound";
import UnauthorizedAccess from "../components/UnauthorizedAccess";
import Login from "../components/login";

// import Dashboard from "../Panel/SuperAdmin/Pages/Dashboard/Dashboard";
// import Sidebar from "../Panel/SuperAdmin/Sidebar";
// import Staffs from "../Panel/SuperAdmin/Pages/Staffs/Staffs";
// import Trainer from "../Panel/SuperAdmin/Pages/Staffs/Trainer";
// import Trainee from "../Panel/SuperAdmin/Pages/Trainee/Trainee";
// // import Task from "../Panel/SuperAdmin/Pages/Task/Task";
// import Chat from "../Panel/SuperAdmin/Pages/Chat/Chat";
// import Batches from "../Panel/SuperAdmin/Pages/Batches/Batches";
// import Attendance from "../Panel/SuperAdmin/Pages/Attendance/Attendance";
// import Notifications from "../Panel/SuperAdmin/Pages/Notifications/Notifications";
// import Schedule from "../Panel/SuperAdmin/Pages/Schedule/Schedule";
// import TraineeSidebar from "../Panel/Trainee/TraineeSidebar";
// import TraineeDashboard from "../Panel/Trainee/Pages/Dashboard/TraineeDashboard";
// import TraineeSyllabus from "../Panel/Trainee/Pages/Syllabus/TraineeSyllabus";
// import TraineeNotificaitons from "../Panel/Trainee/Pages/Notifications/TraineeNotificaitons";
// import TraineeReports from "../Panel/Trainee/Pages/Report/TraineeReports";
// import TrainerSidebar from "../Panel/Trainer/TrainerSidebar";
// import TrainerChat from "../Panel/Trainer/Pages/Chat/TrainerChat";
// import TrainerReports from "../Panel/Trainer/Pages/Report/TrainerReport";
// import TrainerNotificaitons from "../Panel/Trainer/Pages/Notifications/TrainerNotifications";
// import TrainerSyllabus from "../Panel/Trainer/Pages/Syllabus/TrainerSyllabus";
// import TrainerAttendance from "../Panel/Trainer/Pages/Attendance/TrainerAttendance";
// import TrainerAttendace from "../Panel/Trainer/Pages/Attendance/TrainerAttendance";
// import TrainerAssessment from "../Panel/Trainer/Pages/Assessment/TrainerAssessment";
// // import CreatePage from "../Panel/Trainer/Pages/Assessment/CreateAssessment";
// import Login from "../components/login";
// import SuperAssessment from "../Panel/SuperAdmin/Pages/Assessment/TrainerAssessment";
// import SuperReports from "../Panel/SuperAdmin/Pages/Report/SuperReport";
// import Task from "../Panel/SuperAdmin/Pages/Task/Task";
// // import EOD from "../Panel/SuperAdmin/Pages/Task/EOD";
// import Course from "../Panel/SuperAdmin/Pages/Course/Course";
// import TraineeTask from "../Panel/Trainee/Pages/Task/Task";
// import TrainerTask from "../Panel/Trainer/Pages/Task/Task";
// import ProjectTask from "../Panel/Trainer/Pages/Task/ProjectTask";
// import StudentTask from "../Panel/Trainer/Pages/StudentTask/StudentTask";
// import MyBatch from "../Panel/Trainer/Pages/MyBatch/MyBatch";
// import TraineeAssessment from "../Panel/Trainee/Pages/Assesment/TraineeAssessment";

// import Profile from "../Panel/Trainer/Pages/Profile/Profile";
// import Eod from "../Panel/Trainer/Pages/EOD/Eod";
// import TrainerEod from "../Panel/Trainer/Pages/EOD/Eod";
// import SuperEod from "../Panel/SuperAdmin/Pages/EOD/SuperEod";
// import AddRole from "../Panel/SuperAdmin/Pages/BasicDetails/AddRole";
// import AddCompany from "../Panel/SuperAdmin/Pages/BasicDetails/AddCompany";
// import SalaryConfig from "../Panel/SuperAdmin/Pages/SalaryConfig/SalaryConfig";
// import Payroll from "../Panel/SuperAdmin/Pages/Payroll/Payroll";
// import Leave from "../Panel/SuperAdmin/Pages/Leave/Leave"
// import MonthlyPayroll from "../Panel/SuperAdmin/Pages/MonthlyPayroll/MonthlyPayroll";
// import AddDesignation from "../Panel/SuperAdmin/Pages/BasicDetails/AddDesignation";
// import TraineeEod from "../Panel/Trainee/Pages/Eod/Eod";


// // export default pages;

// export const pages = [
//   {
//     title: "login",
//     path: "/",
//     element: <Login />,
//     access: ["open"],

//   },

//   //superadmin

//   {
//     title: "Home",
//     path: "/",
//     element: <Sidebar />,
//     access: ["open"],
//     nestedRoutes: [
//       {
//         path: "dashboard",
//         element: <Dashboard />,
//         access: ["open"],
//       },
//       {
//         path: "batches",
//         element: <Batches />,
//         access: ["open"],

//       },
//       {
//         path: "courses",
//         element: <Course />,
//         access: ["open"],

//       },

//       {
//         path: "staffs",
//         element: <Staffs />,
//         access: ["open"],

//       },
// {
//   path:"basicdetails/addRole",
//   element:<AddRole/>,
//   access: ["open"],

// },
// {
//   path:"basicdetails/addCompany",
//   element:<AddCompany/>,
//   access: ["open"],

// },
// {
//   path:"basicdetails/adddesignation",
//   element: <AddDesignation/>
// },

//       {
//         path: "trainer",
//         element: <Trainer />,
//       },
//       {
//         path: "SuperEod",
//         element: <SuperEod />,
//       },
//       {
//         path: "trainee",
//         element: <Trainee />,
//       },

//       {
//         path: "chat",
//         element: <Chat />,
//       },
//       {
//         path: "attendance",
//         element: <Attendance />,
//       },
//       {
//         path: "notifications",
//         element: <Notifications />,
//       },

    
//       {
//         path: "task",
//         element: <Task />,
//       },
//       {
//         path: "SuperAssessment",
//         element: <SuperAssessment />,
//       },
//       {
//         path: "schedule",
//         element: <Schedule />,
//       },
//       {
//         path: "report",
//         element: <SuperReports />,
//       },
//       {
//         path: "config",
//         element: <SalaryConfig/>,
//       },
//       {
//         path: "payroll",
//         element: <Payroll/>,
//       },
//       {
//         path: "leave",
//         element: <Leave/>,
//       },
//       {
//         path: "monthly-payroll",
//         element: <MonthlyPayroll/>,
//       },
//     ],
//   },

//   // Trainee

//   {
//     title: "TraineeSidebar",
//     path: "/traineesidebar",
//     element: <TraineeSidebar />,
//     children: [
//       {
//         path: "dashboard",
//         element: <TraineeDashboard />,
//       },

//       {
//         path: "syllabus",
//         element: <TraineeSyllabus />,
//       },
      
//       {
//         path: "notifications",
//         element: <TraineeNotificaitons />,
//       },
//       {
//         path: "assessment",
//         element: <TraineeAssessment />,
//       },
//       {
//         path: "attendance",
//         element: <Attendance />,
//       },
//       {
//         path: "traineeEod",
//         element: <TraineeEod />,
//       },
//       {
//         path:"task",
//         element:<TraineeTask/>
//       },
//       {
//         path: "notifications",
//         element: <Notifications />,
//       },
//       {
//         path: "schedule",
//         element: <Schedule />,
//       },
//       {
//         path: "reports",
//         element: <TraineeReports />,
//       },
//     ],
//   },

//   // Trainer

//   {
//     title: "TrainerSidebar",
//     path: "/trainersidebar",
//     element: <TrainerSidebar />,
//     children: [
//       {
//         path: "dashboard",
//         element: <TraineeDashboard />,
//       },
//       {
//         path: "chat",
//         element: <TrainerChat />,
//       },
//       {
//         path: "task",
//         element: <TrainerTask />,
//       },
//       {
//         path:"studenttask",
//         element: <StudentTask/>
//       },
//       {
//         path:"eod",
//         element: <TrainerEod/>
//       },
    
//       {
//         path:"profile",
//         element:<Profile/>
//       },

//       {
//         path: "syllabus",
//         element: <TrainerSyllabus />,
//       },
//       {
//         path: "myBatch",
//         element: <MyBatch />,
//       },
//       {
//         path: "assessment",
//         element: <TrainerAssessment />,
//       },
    
//       {
//         path: "notifications",
//         element: <TrainerNotificaitons />,
//       },
//       {
//         path: "schedule",
//         element: <Schedule />,
//       },
//       {
//         path: "reports",
//         element: <TrainerReports />,
//       },
//       {
//         path: "projecttask",
//         element: <ProjectTask />,
//       },
//     ],
//   },
// ];





const routePages = [
    {
        title: "Page Not Found",
        element: <PageNotFound />,
        path: "page_not_found",
        access: ["open"],
    },
    {
        title: "Login",
        element: <Login/>,
        path: "login",
        access: ["open"],
    },
    {
      title: "Unauthorized",
      element: <UnauthorizedAccess/>,
      path: "Unauthorized",
      access: ["open"],
    },
    // {
    //   title: "ResetPassword",
    //   element: <ResetPassword />,
    //   path: "resetpassword",
    //   access: ["open"],
    // },

    // {
    //     title: "Home",
    //     element: <HomePage />,
    //     path: "/",
    //     access: ["open"],
    //     nestedRoutes:[
    //         {
    //             title: "Dashboard",
    //             key:"dashboard",
    //             element: <Dashboard/>,
    //             path: "dashboard",
    //             access: ["open"],
    //           },
    //           {
    //             title: "Batches",
    //             key:"batch",
    //             element: <Batches/>,
    //             path: "Batches",
    //             access: ["close"],
    //           },
    //           {
    //             title: "Courses",
    //             element: <Course/>,
    //             path: "buttons",
    //             access: ["open"],
    //           },
    //           {
    //             title: "Staff",
    //             element: <TableExample />,
    //             path: "tableExample",
    //             access: ["open"],
    //           },
    //           {
    //             title: "Profile",
    //             element: <Profile />,
    //             path: "Profile",
    //             access: ["open"],
    //           },
    //           {
    //             title: "ManageAdmin",
    //             element: <ManageAdmin  />,
    //             path: "manageadmin",
    //             access: ["open"],
    //           },
    //           {
    //             title: "ManageUser",
    //             element: <Manageuser />,
    //             path: "manageuser",
    //             access: ["open"],
    //           },
    //           {
    //             title: "ManageHub",
    //             element: <ManageHub />,
    //             path: "managehub",
    //             access: ["open"],
    //           },
    //           {
    //             title: "ManageDeliveryperson",
    //             element: <ManageDeliveryperson />,
    //             path: "managedeliveryperson",
    //             access: ["open"],
    //           },
    //           {
    //             title: "ManageServices",
    //             element: <ManageServices />,
    //             path: "manageServices",
    //             access: ["open"],
    //           },
    //           {
    //             title: "CustomTable",
    //             element: <CustomTable />,
    //             path: "customTable",
    //             access: ["open"],
    //           },
    //           {
    //             title: "Manage Price",
    //             element: <ManagePrice />,
    //             path: "Price",
    //             access: ["open"],
    //           },
    //           {
    //             title: "ManageOrders",
    //             element: <ManageOrders />,
    //             path: "manageOrders",
    //             access: ["open"],
    //           },
    //           {
    //             title: "Bag",
    //             element: <DeliveryBag />,
    //             path: "deliveryBag",
    //             access: ["open"],
    //           },
    //           {
    //             title: "CustomTab",
    //             element: <CustomTab />,
    //             path: "CustomTab",
    //             access: ["open"],
    //           },
    //           {
    //             title: "Charges",
    //             element: <ManageCharges />,
    //             path: "charges",
    //             access: ["open"],
    //           },
    //     ]
    // }
]




export default routePages;
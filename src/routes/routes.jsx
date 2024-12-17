// // const pages = [
// //   {
// //     title: "login",
// //     path: "/",
// //     element: <Login />,
// //     access: ["open"],
// //     layout: true,
// //   },
// // ];

import HomePage from "../Panel/Common/HomePage";
import AddCompany from "../Panel/MainPages/AddCompany";
import AddDesignation from "../Panel/MainPages/AddDesignation";
import AddRole from "../Panel/MainPages/AddRole";
import Attendance from "../Panel/MainPages/Attendance";
import Batches from "../Panel/MainPages/Batches";
import Chat from "../Panel/MainPages/Chat/Chat";
import Course from "../Panel/MainPages/Course"
import Dashboard from "../Panel/MainPages/Dashboard";
import Leave from "../Panel/MainPages/Leave";
import MonthlyPayroll from "../Panel/MainPages/MonthlyPayroll";
import Notifications from "../Panel/MainPages/Notifications";
import Payroll from "../Panel/MainPages/Payroll";
import SalaryConfig from "../Panel/MainPages/SalaryConfig/SalaryConfig";
import Schedule from "../Panel/MainPages/Schedule";
import Staffs from "../Panel/MainPages/Staffs";
import SuperEod from "../Panel/MainPages/SuperEod";
import SuperReports from "../Panel/MainPages/SuperReport";
import Task from "../Panel/MainPages/Task";
import Trainee from "../Panel/MainPages/Trainee";
import TrainerAssessment from "../Panel/MainPages/TrainerAssessment";
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
        key: "page-not-found",
        element: <PageNotFound />,
        path: "page-not-found",
        access: ["open"],
    },
    {
        title: "Login",
        key: "login",
        element: <Login/>,
        path: "login",
        access: ["open"],
    },
    {
      title: "Unauthorized",
      key: "unauthorized",
      element: <UnauthorizedAccess/>,
      path: "unauthorized",
      access: ["open"],
    },
    // {
    //   title: "ResetPassword",
    //   element: <ResetPassword />,
    //   path: "resetpassword",
    //   access: ["open"],
    // },

    {
        title: "Home",
        key: "home",
        element: <HomePage />,
        path: "/",
        access: ["open"],
        nestedRoutes:[
            {
                title: "Dashboard",
                key:"dashboard",
                element: <Dashboard/>,
                path: "dashboard",
                access: ["close"],
              },
              {
                title: "Batches",
                key:"batch",
                element: <Batches/>,
                path: "batches",
                access: ["close"],
              },
              {
                title: "Syllabus",
                key:"syllabus",
                element: <Course/>,
                path: "syllabus",
                access: ["close"],
              },

              {
                title: "Role",
                key:"role",
                element: <AddRole/>,
                path: "add-role",
                access: ["close"],
              },
              {
                title: "Company",
                key:"company",
                element: <AddCompany/>,
                path: "add-company",
                access: ["close"],
              },
              {
                title: "Designation",
                key:"designation",
                element: <AddDesignation/>,
                path: "add-designation",
                access: ["close"],
              },
              {
                title: "Staffs",
                key:"staffs",
                element: <Staffs/>,
                path: "staffs",
                access: ["open"],
              },
              
              {
                title: "Assessment",
                key:"assessment",
                element: <TrainerAssessment/>,
                path: "assessment",
                access: ["close"],
              },
              // {
              //   title: "Attendance",
              //   key:"Attendance",
              //   element: <Attendance/>,
              //   path: "attendance",
              //   access: ["close"],
              // },
              {
                title: "Attendance",
                key:"attendance",
                element: <Attendance/>,
                path: "attendance",
                access: ["close"],
              },
              {
                title: "Chat",
                key:"chat",
                element: <Chat/>,
                path: "chat",
                access: ["close"],
              },
              {
                title: "EOD",
                key:"eod",
                element: <SuperEod/>,
                path: "eod",
                access: ["close"],
              },
              {
                title: "Leave",
                key:"leave",
                element: <Leave/>,
                path: "leave",
                access: ["close"],
              },
              {
                title: "Monthly Payroll",
                key:"monthlyPayroll",
                element: <MonthlyPayroll/>,
                path: "monthly-payroll",
                access: ["close"],
              },
              {
                title: "notifications",
                key:"notifications",
                element: <Notifications/>,
                path: "notication",
                access: ["close"],
              },
              {
                title: "Payroll",
                key:"payroll",
                element: <Payroll/>,
                path: "payroll",
                access: ["close"],
              },
              {
                title: "report",
                key:"report",
                element: <SuperReports/>,
                path: "report",
                access: ["close"],
              },

              {
                title: "Config",
                key:"config",
                element: <SalaryConfig/>,
                path: "config",
                access: ["close"],
              },
              {
                title: "Schedule",
                key:"schedule",
                element: <Schedule/>,
                path: "schedule",
                access: ["close"],
              },
              
              {
                title: "Task",
                key:"task",
                element: <Task/>,
                path: "task",
                access: ["close"],
              },
              {
                title: "Trainee",
                key:"trainee",
                element: <Trainee/>,
                path: "trainee",
                access: ["close"],
              },
              
        ]
    }
]




export default routePages;
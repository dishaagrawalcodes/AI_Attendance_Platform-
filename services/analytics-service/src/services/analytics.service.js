const axios = require("axios");

const ATTENDANCE_SERVICE_URL =
  process.env.ATTENDANCE_SERVICE_URL ||
  "http://attendance-service:5002";

const STUDENT_SERVICE_URL =
  process.env.STUDENT_SERVICE_URL ||
  "http://student-service:5001";

// Student Analytics
const getStudentAttendanceAnalytics = async (
  studentId,
  from,
  to
) => {
  const response = await axios.get(
    `${ATTENDANCE_SERVICE_URL}/api/attendance`
  );

  const attendanceRecords = response.data.data || [];

  let studentRecords = attendanceRecords.filter(
    (record) => record.studentId === studentId
  );

  // Date range filtering
  if (from || to) {
    studentRecords = studentRecords.filter((record) => {
      const recordDate = new Date(record.date);

      if (from) {
        const fromDate = new Date(`${from}T00:00:00.000Z`);

        if (recordDate < fromDate) {
          return false;
        }
      }

      if (to) {
        const toDate = new Date(`${to}T23:59:59.999Z`);

        if (recordDate > toDate) {
          return false;
        }
      }

      return true;
    });
  }

  const totalClasses = studentRecords.length;

  const present = studentRecords.filter(
    (record) => record.status === "present"
  ).length;

  const absent = studentRecords.filter(
    (record) => record.status === "absent"
  ).length;

  const late = studentRecords.filter(
    (record) => record.status === "late"
  ).length;

  const attendancePercentage =
    totalClasses === 0
      ? 0
      : Number(
          ((present / totalClasses) * 100).toFixed(2)
        );

  return {
    studentId,
    from: from || null,
    to: to || null,
    totalClasses,
    present,
    absent,
    late,
    attendancePercentage,
  };
};


// Department Analytics
const getDepartmentAttendanceAnalytics = async (
  department,
  from,
  to
) => {
  // Get students belonging to this department
  const studentResponse = await axios.get(
    `${STUDENT_SERVICE_URL}/api/students`,
    {
      params: {
        department,
        limit: 10000,
      },
    }
  );

  const students = studentResponse.data.students || [];

  // Create a Set of student IDs
  const studentIds = new Set(
    students.map((student) => student._id)
  );

  // Get all attendance records
  const attendanceResponse = await axios.get(
    `${ATTENDANCE_SERVICE_URL}/api/attendance`
  );

  const attendanceRecords =
    attendanceResponse.data.data || [];

  // Keep attendance only for students in this department
  let departmentRecords = attendanceRecords.filter(
    (record) => studentIds.has(record.studentId)
  );

  // Date range filtering
  if (from || to) {
    departmentRecords = departmentRecords.filter(
      (record) => {
        const recordDate = new Date(record.date);

        if (from) {
          const fromDate = new Date(
            `${from}T00:00:00.000Z`
          );

          if (recordDate < fromDate) {
            return false;
          }
        }

        if (to) {
          const toDate = new Date(
            `${to}T23:59:59.999Z`
          );

          if (recordDate > toDate) {
            return false;
          }
        }

        return true;
      }
    );
  }

  const totalClasses = departmentRecords.length;

  const present = departmentRecords.filter(
    (record) => record.status === "present"
  ).length;

  const absent = departmentRecords.filter(
    (record) => record.status === "absent"
  ).length;

  const late = departmentRecords.filter(
    (record) => record.status === "late"
  ).length;

  const attendancePercentage =
    totalClasses === 0
      ? 0
      : Number(
          ((present / totalClasses) * 100).toFixed(2)
        );

  return {
    department,
    from: from || null,
    to: to || null,
    totalStudents: students.length,
    totalClasses,
    present,
    absent,
    late,
    attendancePercentage,
  };
};


module.exports = {
  getStudentAttendanceAnalytics,
  getDepartmentAttendanceAnalytics,
};
const analyticsService = require("../services/analytics.service");

const getStudentAnalytics = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { from, to } = req.query;

    const analytics =
      await analyticsService.getStudentAttendanceAnalytics(
        studentId,
        from,
        to
      );

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error(
      "Student analytics error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch student attendance analytics",
    });
  }
};


const getDepartmentAnalytics = async (req, res) => {
  try {
    const { department } = req.params;
    const { from, to } = req.query;

    const analytics =
      await analyticsService.getDepartmentAttendanceAnalytics(
        department,
        from,
        to
      );

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error(
      "Department analytics error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch department attendance analytics",
    });
  }
};


module.exports = {
  getStudentAnalytics,
  getDepartmentAnalytics,
};
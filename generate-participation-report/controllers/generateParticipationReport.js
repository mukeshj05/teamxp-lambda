const moment = require("moment");
const User = require("../models/user");
const ParticipationReport = require("../models/participationReport");
const SurveySession = require("../models/surveySession");
const Team = require("../models/team");
const { convertObjectArrayToObject } = require("../utils/helper");

const generateParticipactionReport = async (orgId) => {
  try {
    const currentDate = new Date(
      moment().utcOffset("+05:30").subtract(2, "hours")
    );
    const teams = await Team.find({ orgId: orgId, active: true }).select(
      "_id members"
    );
    const teamsObj = convertObjectArrayToObject(teams, "_id");
    const users = await User.find({ orgId: orgId, active: true }).select("_id");

    const participations = await SurveySession.distinct("userId", {
      orgId: orgId,
      createdAt: {
        $gte: new Date(moment(currentDate).subtract(21, "days")),
        $lte: new Date(currentDate),
      },
    });

    const reportsArray = [];

    reportsArray.push({
      orgId: orgId,
      teamId: null,
      for: "O",
      date: Date.now(),
      totalUsers: users.length,
      participatedUsers: participations.length,
      participationPer: Math.round(
        (participations.length * 100) / users.length
      ),
    });

    const participationsStrArr = participations.map((ele) => ele.toString());

    teams.forEach((el) => {
      const totalUsers = teamsObj[el._id].members.length;
      const participatedUsers = users
        .filter((user) => participationsStrArr.includes(user._id.toString()))
        .filter((user) =>
          teamsObj[el._id].members
            .map((ele) => ele.toString())
            .includes(user._id.toString())
        ).length;

      reportsArray.push({
        orgId: orgId,
        teamId: el._id,
        for: "T",
        date: Date.now(),
        totalUsers: totalUsers,
        participatedUsers: participatedUsers,
        participationPer: Math.round((participatedUsers * 100) / totalUsers),
      });
    });

    await ParticipationReport.insertMany(reportsArray);
  } catch (err) {
    console.log(
      `Error in generating participation report ${orgId} at ${new Date()}`,
      err
    );
  }
};

module.exports = generateParticipactionReport;

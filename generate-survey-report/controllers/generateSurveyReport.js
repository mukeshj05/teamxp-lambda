const moment = require("moment");
const User = require("../models/user");
const SurveyReport = require("../models/surveyReport");
const Category = require("../models/category");
const SurveySession = require("../models/surveySession");
const { convertObjectArrayToObject } = require("../utils/helper");
const surveyOverallScoreCalculationNew = require("../utils/surveyOverallScoreCalculationNew");
const surveyReportCalculationNew = require("../utils/surveyReportCalculationNew");

const generateSurveyReport = async (orgId) => {
  try {
    const reportDay = new Date(
      moment().utcOffset("+05:30").subtract(1, "days").subtract(2, "hours")
    );

    // Step 1: Get all the report day surveys
    const reportDaySessions = await SurveySession.find({
      orgId: orgId,
      createdAt: {
        $gte: new Date(reportDay),
        $lte: new Date(moment(reportDay).add(1, "days")),
      },
    }).lean();

    // Step 2: Get all the report day reports
    const allPrevDayReports = await SurveyReport.find({
      orgId: orgId,
      createdAt: {
        $gte: new Date(reportDay),
        $lte: new Date(moment(reportDay).add(1, "days")),
      },
    })
      .select("-_id -date -createdAt -updatedAt -__v")
      .lean();

    // Step 3: If no new survey session found then keep old reports saved again
    if (reportDaySessions.length === 0) {
      if (allPrevDayReports.length > 0) {
        await SurveyReport.insertMany(allPrevDayReports);
      }
    } else {
      // Convert prev day report array to object
      const allPrevDayReportsObj = convertObjectArrayToObject(
        allPrevDayReports,
        "teamId"
      );

      // Fetch all sub categories
      const categories = await Category.find().select("_id tag parent").lean();

      const parentCateogries = categories.filter(
        (el) => !el.parent && el.tag !== "enps"
      );

      // Convert sub categories array to object
      const categoriesObjById = convertObjectArrayToObject(categories, "_id");

      // Get list of userIds and fetch all users
      const usersIds = reportDaySessions.map((el) => el.userId);
      const users = await User.find({ _id: { $in: usersIds } })
        .select("_id teams")
        .lean();
      const usersObj = convertObjectArrayToObject(users, "_id");

      // Store tag answers in array for each team and organisation according to each session
      const orgOrTeamChanges = {};
      orgOrTeamChanges[orgId] = {};

      const teamIds = [
        ...new Set(
          users.flatMap((el) =>
            el.teams.map((ele) => ele.teamId.toString()).filter((el) => !!el)
          )
        ),
      ];

      // Report array for org and teams with changes to insert
      const reportsArray = [];

      reportsArray.push({
        orgId: orgId,
        teamId: null,
        for: "O",
        date: Date.now(),
        overall: 0,
        metrics: parentCateogries.reduce(
          (newObj, curObj) => ({ ...newObj, [curObj.tag]: {} }),
          {}
        ),
      });

      teamIds.forEach((team) => {
        orgOrTeamChanges[team] = {};

        reportsArray.push({
          orgId: orgId,
          teamId: team,
          for: "T",
          date: Date.now(),
          overall: 0,
          metrics: parentCateogries.reduce(
            (newObj, curObj) => ({ ...newObj, [curObj.tag]: {} }),
            {}
          ),
        });
      });

      reportDaySessions.forEach((session) => {
        // Modify report day session question to object of sub category tag and answer value
        const questions = session.questions
          .filter((ques) => categoriesObjById[ques.subCategory].tag !== "enps")
          .map((ques) => ({
            subCategoryTag: categoriesObjById[ques.subCategory].tag,
            answer: Number(ques.answer),
          }));

        // create a new sub category tag object and calculate the avarage of each tag
        const tagObj = {};
        questions.forEach((ques) => {
          if (tagObj[ques.subCategoryTag]) {
            tagObj[ques.subCategoryTag] =
              (tagObj[ques.subCategoryTag] + ques.answer) / 2;
          } else {
            tagObj[ques.subCategoryTag] = ques.answer;
          }
        });

        // Update organization report array object with changes
        Object.keys(tagObj).forEach((tag) => {
          if (orgOrTeamChanges[orgId][tag]) {
            orgOrTeamChanges[orgId][tag].push(tagObj[tag]);
          } else {
            orgOrTeamChanges[orgId][tag] = [tagObj[tag]];
          }
        });

        // Update teams report array object with changes according to users
        usersObj[session.userId].teams.forEach((team) => {
          if (team.teamId) {
            Object.keys(tagObj).forEach((tag) => {
              if (orgOrTeamChanges[team.teamId][tag]) {
                orgOrTeamChanges[team.teamId][tag].push(tagObj[tag]);
              } else {
                orgOrTeamChanges[team.teamId][tag] = [tagObj[tag]];
              }
            });
          }
        });
      });

      // Update reports array by calculating all reports
      reportsArray.forEach((el) => {
        if (!el.teamId) {
          el.metrics = surveyReportCalculationNew(
            categories,
            parentCateogries,
            el.metrics,
            orgOrTeamChanges,
            orgId,
            allPrevDayReportsObj,
            "null"
          );
          el.overall = surveyOverallScoreCalculationNew(el.metrics);
        } else {
          el.metrics = surveyReportCalculationNew(
            categories,
            parentCateogries,
            el.metrics,
            orgOrTeamChanges,
            el.teamId,
            allPrevDayReportsObj,
            el.teamId
          );
          el.overall = surveyOverallScoreCalculationNew(el.metrics);
        }
      });

      // Get reprots for teams whose members are not having session in report day
      const teamsReportsNotChanged = allPrevDayReports.filter(
        (el) => el.teamId && !teamIds.includes(el.teamId.toString())
      );

      await SurveyReport.insertMany([
        ...teamsReportsNotChanged,
        ...reportsArray,
      ]);
    }
  } catch (err) {
    console.log(
      `Error in generating survey report ${orgId} at ${new Date()}`,
      err
    );
  }
};

module.exports = generateSurveyReport;

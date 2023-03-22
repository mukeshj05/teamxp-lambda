const moment = require("moment");
const User = require("../models/user");
const SurveyReport = require("../models/surveyReport");
const Category = require("../models/category");
const SurveySession = require("../models/surveySession");
const { convertObjectArrayToObject } = require("../utils/helper");
const surveyOverallScoreCalculation = require("../utils/surveyOverallScoreCalculation");
const surveyReportCalculation = require("../utils/surveyReportCalculation");

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
      const categories = await Category.find().select("_id tag").lean();

      // Convert sub categories array to object
      const categoriesObj = convertObjectArrayToObject(categories, "_id");

      // Get list of userIds and fetch all users
      const usersIds = reportDaySessions.map((el) => el.userId);
      const users = await User.find({ _id: { $in: usersIds } })
        .select("_id teams")
        .lean();
      const usersObj = convertObjectArrayToObject(users, "_id");

      // Store tag answers in array for each team and organisation according to each session
      const changes = {};
      changes[orgId] = {};

      const teamIds = [
        ...new Set(
          users.flatMap((el) =>
            el.teams.map((ele) => ele.teamId.toString()).filter((el) => !!el)
          )
        ),
      ];

      // Report array to insert
      const reportsArray = [];

      reportsArray.push({
        orgId: orgId,
        teamId: null,
        for: "O",
        date: Date.now(),
        overall: 0,
        metrics: {
          happiness: {},
          relationWithManager: {},
          recognition: {},
          feedback: {},
          personalGrowth: {},
          alignment: {},
          satisfaction: {},
          relationWithPeers: {},
          wellness: {},
          ambassadorship: {},
        },
      });

      teamIds.forEach((team) => {
        changes[team] = {};

        reportsArray.push({
          orgId: orgId,
          teamId: team,
          for: "T",
          date: Date.now(),
          overall: 0,
          metrics: {
            happiness: {},
            relationWithManager: {},
            recognition: {},
            feedback: {},
            personalGrowth: {},
            alignment: {},
            satisfaction: {},
            relationWithPeers: {},
            wellness: {},
            ambassadorship: {},
          },
        });
      });

      reportDaySessions.forEach((session) => {
        // create sub category tag object for current questions
        const questions = session.questions
          .filter((ques) => categoriesObj[ques.subCategory].tag !== "enps")
          .map((ques) => ({
            subCategoryTag: categoriesObj[ques.subCategory].tag,
            answer: ques.answer,
          }));
        const tagObj = {};
        questions.forEach((ques) => {
          if (tagObj[ques.subCategoryTag]) {
            tagObj[ques.subCategoryTag] =
              (tagObj[ques.subCategoryTag] + ques.answer) / 2;
          } else {
            tagObj[ques.subCategoryTag] = ques.answer;
          }
        });

        Object.entries(tagObj).forEach((tag) => {
          if (changes[orgId][tag[0]]) {
            changes[orgId][tag[0]].push(tag[1]);
          } else {
            changes[orgId][tag[0]] = [tag[1]];
          }
        });

        usersObj[session.userId].teams.forEach((team) => {
          if (team.teamId) {
            Object.entries(tagObj).forEach((tag) => {
              if (changes[team.teamId][tag[0]]) {
                changes[team.teamId][tag[0]].push(tag[1]);
              } else {
                changes[team.teamId][tag[0]] = [tag[1]];
              }
            });
          }
        });
      });

      reportsArray.forEach((el) => {
        if (!el.teamId) {
          el.metrics = surveyReportCalculation(
            el.metrics,
            changes,
            orgId,
            allPrevDayReportsObj,
            "null"
          );
          el.overall = surveyOverallScoreCalculation(el.metrics);
        } else {
          el.metrics = surveyReportCalculation(
            el.metrics,
            changes,
            el.teamId,
            allPrevDayReportsObj,
            el.teamId
          );
          el.overall = surveyOverallScoreCalculation(el.metrics);
        }
      });

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

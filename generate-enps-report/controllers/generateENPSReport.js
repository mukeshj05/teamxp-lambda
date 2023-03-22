const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const ENPSReport = require("../models/eNPSReport");
const Category = require("../models/category");
const SurveySession = require("../models/surveySession");
const { convertObjectArrayToObject } = require("../utils/helper");
const eNPSScoreCalculation = require("../utils/eNPSScoreCalculation");

const generateENPSReport = async (orgId) => {
  try {
    // ENPS Category
    const category = await Category.findOne({ tag: "enps" })
      .select("_id tag")
      .lean();

    const allENPSSessions = await SurveySession.find({
      orgId: orgId,
      "questions.category": mongoose.Types.ObjectId(category._id),
    }).lean();

    if (allENPSSessions.length > 0) {
      // Report array to insert
      const reportsArray = [];

      reportsArray.push({
        orgId: orgId,
        teamId: null,
        for: "O",
        date: Date.now(),
        eNPS: {
          overall: 0,
          promoters: 0,
          passives: 0,
          detractors: 0,
          skipped: 0,
        },
      });

      const usersIds = allENPSSessions.map((el) => el.userId);
      const users = await User.find({ _id: { $in: usersIds } })
        .select("_id teams")
        .lean();
      const usersObj = convertObjectArrayToObject(users, "_id");

      const teamIds = [
        ...new Set(
          users.flatMap((el) =>
            el.teams.map((ele) => ele.teamId.toString()).filter((el) => !!el)
          )
        ),
      ];

      const changes = {};
      changes[orgId] = {
        promoters: 0,
        passives: 0,
        detractors: 0,
        skipped: 0,
      };

      teamIds.forEach((team) => {
        changes[team] = {
          promoters: 0,
          passives: 0,
          detractors: 0,
          skipped: 0,
        };

        reportsArray.push({
          orgId: orgId,
          teamId: team,
          for: "T",
          date: Date.now(),
          eNPS: {
            overall: 0,
            promoters: 0,
            passives: 0,
            detractors: 0,
            skipped: 0,
          },
        });
      });

      allENPSSessions.forEach((session) => {
        const questions = session.questions.filter(
          (ques) => ques.category.toString() === category._id.toString()
        );

        let promoters = 0;
        let passives = 0;
        let detractors = 0;
        let skipped = 0;
        questions.forEach((ques) => {
          if (ques.answer > 8) promoters = promoters + 1;
          else if (ques.answer > 6 && ques.answer <= 8) passives = passives + 1;
          else if (ques.answer > 0 && ques.answer <= 6)
            detractors = detractors + 1;
          else skipped = skipped + 1;
        });

        changes[orgId] = {
          promoters: changes[orgId].promoters + promoters,
          passives: changes[orgId].passives + passives,
          detractors: changes[orgId].detractors + detractors,
          skipped: changes[orgId].skipped + skipped,
        };

        usersObj[session.userId].teams.forEach((team) => {
          if (team.teamId) {
            changes[team.teamId] = {
              promoters: changes[team.teamId].promoters + promoters,
              passives: changes[team.teamId].passives + passives,
              detractors: changes[team.teamId].detractors + detractors,
              skipped: changes[team.teamId].skipped + skipped,
            };
          }
        });
      });

      reportsArray.forEach((el) => {
        if (!el.teamId) {
          el.eNPS = eNPSScoreCalculation(changes[orgId]);
        } else {
          el.eNPS = eNPSScoreCalculation(changes[el.teamId]);
        }
      });

      await ENPSReport.insertMany(reportsArray);
    }
  } catch (err) {
    console.log(
      `Error in generating ENPS report ${orgId} at ${new Date()}`,
      err
    );
  }
};

module.exports = generateENPSReport;

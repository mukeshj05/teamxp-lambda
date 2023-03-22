const { connect } = require("mongoose");
const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");
const Organisation = require("./models/organisation");
const generateParticipactionReport = require("./controllers/generateParticipationReport");

async function getSSMParameterValue(var_name) {
  try {
    const client = new SSMClient({ region: "ap-south-1" });
    const params = {
      Name: var_name,
      WithDecryption: true,
    };
    const command = new GetParameterCommand(params);
    const request = await client.send(command);
    return request.Parameter.Value;
  } catch (err) {
    console.log("Failed to fetch SSM variable - " + var_name + " - ", err);
    return null;
  }
}

async function connectToDatabase() {
  try {
    const monogoURL = await getSSMParameterValue("/stage/DATABASE_URL");
    if (!monogoURL) {
      return null;
    }

    connect(monogoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(console.log("> Mongodb connected."))
      .catch((err) => {
        console.log("> Failed to connect to Mongodb", err);
      });
    return true;
  } catch (err) {
    console.log(err);
    return null;
  }
}

exports.handler = async (event, context, callback) => {
  /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
  context.callbackWaitsForEmptyEventLoop = false;

  // Get an instance of our database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    callback(null, "Error - Failed to Connect to MongoDB");
  }

  try {
    const allOrganisations = await Organisation.find({ active: true })
      .select("_id")
      .lean();

    await Promise.all(
      allOrganisations.map((el) => {
        generateParticipactionReport(el._id);
      })
    );
  } catch (err) {
    console.log(
      `Error in running generate participation report function at ${new Date()}`,
      err
    );
    callback(
      null,
      `Error in running generate participation report function at ${new Date()}`
    );
  }
};

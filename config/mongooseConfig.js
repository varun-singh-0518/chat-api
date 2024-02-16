import mongoose from "mongoose";

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: "majority",
      },
    });

    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};

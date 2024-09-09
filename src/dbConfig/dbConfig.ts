import mongoose from "mongoose";

export const connectDB = () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    return;
  }
  try {
    mongoose.connect(mongoURI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (error) => {
      console.log("MongoDB connection error", error);
      process.exit();
    });
  } catch (error) {
    console.log("Error on connect DB");
    console.log(error);
  }
};


// export const connectDB = () => {
//   try {
//     // In TypeScript, the ! symbol after a variable (e.g., process.env.MONGO_URI!)
//     // is known as the non-null assertion operator. It tells the TypeScript compiler to ignore
//     // the possibility that the variable might be null or undefined.
//     mongoose.connect(process.env.MONGO_URI!);
//     const connection = mongoose.connection;
//     connection.on("connected", () => {
//       console.log("MongoDB connected successfully");
//     });
//     connection.on("error", (error) => {
//       console.log("MongoDB connection error", error);
//       process.exit(1);
//     });
//   } catch (error) {
//     console.log("Error on connect DB");
//     console.log(error);
//   }
// };

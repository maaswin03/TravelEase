const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const { ObjectId } = require('mongodb');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


let db;

async function run() {
  try {
    await client.connect();
    db = client.db("TravelEase");
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error("An error occurred while connecting to MongoDB:", err);
  }
}

run().catch(console.dir);

const stateCollections = {
  stateid_01: "Andaman",
  stateid_02: "Arunachal",
  stateid_03: "Goa",
  stateid_04: "Himachal",
  stateid_05: "JK",
  stateid_06: "Kerala",
  stateid_07: "Meghalaya",
  stateid_08: "Punjab",
  stateid_09: "Rajasthan",
  stateid_10: "Sikkim",
  stateid_11: "TamilNadu",
  stateid_12: "Uttarakhand",
};

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await db.collection("User").findOne({ email });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    return res.status(200).json({ message: "Login success" })
  } catch (error) {
    console.error("Login Error:", error)
    return res.status(500).json({ message: "Server error" })
  }
})


app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    console.log("Received signup data:", req.body);

    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await db.collection("User").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const newUser = {
      name:name,
      email:email,
      password:password,
      location:location,
      createdAt: new Date(),
    }

    const result = await db.collection("User").insertOne(newUser);

    const userResponse = {
      _id: result.insertedId,
      name: newUser.name,
      email: newUser.email,
      location: newUser.location,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

app.get("/api/travel-packages/:stateId", async (req, res) => {
  try {
    const { stateId } = req.params;
    const collectionName = stateCollections[stateId];

    if (!collectionName) {
      return res.status(400).json({ error: "Invalid stateId" });
    }

    const packages = await db.collection(collectionName).find({}).toArray();

    res.json(packages);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.get("/api/travel-packages/:stateId/:packageId", async (req, res) => {
  try {
    const { stateId, packageId } = req.params;
    const collectionName = stateCollections[stateId];

    if (!collectionName) {
      return res.status(400).json({ error: "Invalid stateId" });
    }

    const collection = db.collection(collectionName);

    let travelPackage;
    try {
      travelPackage = await collection.findOne({ _id: new ObjectId(packageId) });
    } catch (err) {

      return res.status(400).json({ error: "Invalid package ID format" });
    }

    if (!travelPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.json(travelPackage);
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ error: "Failed to fetch package" });
  }
});

app.post("/api/update-booking", async (req, res) => {
  try {
    const bookingData = req.body;

    if (!bookingData.email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const result = await db.collection("User").updateOne(
      { email: bookingData.email },
      {
        $push: { currentBooking: bookingData },
        $setOnInsert: { email: bookingData.email },
      },
      { upsert: true }
    );

    res.status(200).json({
      message: "Booking updated successfully",
      result,
    });
  } catch (error) {
    console.error("Update Booking Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/api/get-user", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db.collection("User").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    console.log(user)
    
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", dbStatus: db ? "Connected" : "Disconnected" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


process.on("SIGINT", async () => {
  await client.close();
  process.exit(0);
});
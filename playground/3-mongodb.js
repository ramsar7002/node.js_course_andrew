// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.toHexString());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to db");
    }

    const db = client.db(databaseName);

    // db.collection("users").findOne(
    //   { _id: new ObjectID("631359d3849c35cf977fe2d3") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Couldnt find user");
    //     }

    //     console.log(user);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 27 })
    //   .toArray((error, users) => {
    //     if (error) {
    //       return console.log("Couldnt find user");
    //     }

    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 27 })
    //   .count((error, count) => {
    //     if (error) {
    //       return console.log("Couldnt find user");
    //     }

    //     console.log(count);
    //   });

    // db.collection("tasks").findOne(
    //   {
    //     _id: new ObjectID("631354a3dc966e3a5fce675b"),
    //   },
    //   (error, task) => {
    //     if (error) {
    //       return console.log("error");
    //     }

    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     if (error) {
    //       return console.log("error");
    //     }
    //     console.log(tasks);
    //   });

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("631359d3849c35cf977fe2d3"),
    //     },
    //     {
    //       $set: {
    //         name: "Mike",
    //       },
    //     }
    //   )
    //   .then((user) => console.log(user))
    //   .catch((err) => console.log(err));

    // db.collection("users")
    //   .updateOne({ name: "Mike" }, { $inc: { age: 1 } })
    //   .then((user) => console.log(user))
    //   .catch((err) => console.log(err));

    // db.collection("tasks")
    //   .updateMany(
    //     { completed: false },
    //     {
    //       $set: { completed: true },
    //     }
    //   )
    //   .then((user) => console.log(user))
    //   .catch((err) => console.log(err));

    // db.collection("tasks")
    //   .insertMany([
    //     { description: "Go to the gym", completed: false },
    //     { description: "Learn node.js", completed: false },
    //   ])
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    // db.collection("users")
    //   .deleteOne({ name: "Mike" })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    // db.collection("users")
    //   .deleteMany({ age: 27 })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  }
);

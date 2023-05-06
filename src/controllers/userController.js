const fs = require("fs");

exports.getUsersData = (req, res) => {
  fs.readFile("data.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    const users = JSON.parse(data);
    res.send(users);
  });
};

exports.putUserData = (req, res) => {
  // new users data
  const values = req.body;

  // all users data
  fs.readFile("data.json", (err, fileData) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
      return;
    }
    const json = JSON.parse(fileData);

    const totalNumOfUsers = json.length;
    const newUserData = {
      id: totalNumOfUsers + 1,
      name: values.name,
      email: values.email,
      gender: values.gender,
      address: {
        street: values.street,
        city: values.city,
      },
      phone: values.phone,
    };
    // push new data to our old users data
    json.push(newUserData);
    // save new updated data
    fs.writeFile("data.json", JSON.stringify(json), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing file");
        return;
      }
      res.status(200).send(json);
    });
  });
};

exports.deleteUserData = (req, res) => {
  const { userId } = req.body;
  fs.readFile("data.json", (err, fileData) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
      return;
    }

    const json = JSON.parse(fileData);
    const dataWithRemovedUser = json.filter((user) => user.id !== userId);
    // reorganize id numbers
    for (let i = userId - 1; i < dataWithRemovedUser.length; i++) {
      dataWithRemovedUser[i].id--;
    }
    // save new updated data
    fs.writeFile("data.json", JSON.stringify(dataWithRemovedUser), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing file");
        return;
      }
      res.status(200).send(dataWithRemovedUser);
    });
  });
};
exports.updateUserData = (req, res) => {
  const updatedUserData = req.body;
  const finalUpdatedDataToWrite = {
    id: updatedUserData.id,
    name: updatedUserData.name,
    email: updatedUserData.email,
    gender: updatedUserData.gender,
    address: { street: updatedUserData.street, city: updatedUserData.city },
    phone: updatedUserData.phone,
  };
  // all users data
  fs.readFile("data.json", (err, fileData) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
      return;
    }
    const json = JSON.parse(fileData);
    json[finalUpdatedDataToWrite.id - 1] = finalUpdatedDataToWrite;
    // save new updated data
    fs.writeFile("data.json", JSON.stringify(json), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing file");
        return;
      }
      res.status(200).send(json);
    });
  });
};

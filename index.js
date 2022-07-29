const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("Public"));

let itemArray = ["Buy Food", "Cook Food", "Eat Food"];
let workItem = [];

app.get("/", function (req, res) {
    const day = date.date();

    res.render("list", {
        listTitle: day,
        newListItem: itemArray
    });
});

app.post("/", function (req, res) {
    let itemName = req.body.newItem;

    if (req.body.Raiyan === "Work") {
        workItem.push(itemName);
        res.redirect("/work");
    } else {
        itemArray.push(itemName);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItem: workItem
    })
})

app.listen(3000, function () {
    console.log("Server is running on PORT 3000!");
});
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));   // yeh help krta hai html ke values and variable ko yahi se acces krne men

const items = ["Play Time", "Movie time", "Coding Time"];
const workItems = [];

app.get("/", (req, res) => {

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const day = today.toLocaleDateString("en-US", options);

    res.render("index.ejs", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
    const item = req.body.newItem;    // yeh html body men variable ko select krega and yaha pe serve krdega

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("index.ejs", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", (req, res) => {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});
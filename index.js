import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(
    import.meta.url));

const app = express();
const port = process.env.PORT || 3030;
let name = "";

// Set up static file serving
// This allows Express to serve static files like images, CSS, etc.
app.use(express.static(path.join(__dirname, '/static'))); // If your images are in a 'static' folder
// If your images are in another folder, change 'static' to that folder name

// Set the views directory to the root where index.ejs is located
app.set('views', __dirname);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function names(req, res, next) {
    console.log(req.body);
    if (req.body && req.body.yourname) {
        name = req.body.yourname;
    }
    next();
}
app.use(names);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "box", "box.html"));
});

app.post("/submit", (req, res) => {
    res.render("index", { username: name });
});

app.post("/about", (req, res) => {
    res.render(path.join(__dirname, "about/testabout"), { username: name });
});

app.post("/contact", (req, res) => {
    res.render(path.join(__dirname, "contact/contact"), { username: name });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

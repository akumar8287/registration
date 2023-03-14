const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));



const jwt = require("jsonwebtoken");
const JWT_SECRET = "fhkjdshfewiu@#$!@${(fsdaffdskjfdkjfgadsjfh8497543985"

const mongUrl = "mongodb+srv://aman:Aman2002@alldata.uhwcdzp.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongUrl, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Database Connected Sucessfully")
}).catch((e) => console.log(e))


require("./userDatails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res)=>{
    const{ name, username, email, mobileNo, locality, password, userType } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try{
        const oldUser = await User.findOne({ email });

        if(oldUser) {
         return res.json({ error: "User Exists" });
        }
        await User.create({
            name,
            username,
            email,
            mobileNo,
            locality,
            password:encryptedPassword,
            userType,
        })
        res.send({ status: "ok" });
    }catch (error) {
        res.send({ status: "error"});
    }
});

app.post("/login-user", async (req, res)=> {
    const { email, password } = req.body

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not Found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        }else {
            return res.json({ error: "error" })
        }
    }
    res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res)=> {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
        const useremail = user.email;
        User.findOne({ email: useremail }).then((data) => {
            res.send({ status: "ok", data: data })
        }).catch((error)=> {
            res.send({ status: "error", data: error })
        });
    }catch (error){}
});

app.listen(8000,()=>{
    console.log("Sever Started");
});


app.post("/forgot-password", async (req, res)=> {
    const { email } = req.body;
    try{
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({email:oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        const link = `http://localhost:8000/reset-password/${oldUser.id}/${token}`;
        console.log(link)
    }catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params)
    const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        try {
            const verify = jwt.verify(token, secret);
            res.render("reset", {email: verify.email, status: "Not Verified"});
        } catch (error) {
            console.log(error)
            res.send("Not Verified");
        }
});

app.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body
    const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        try {
            const verify = jwt.verify(token, secret);
            const encryptedPassword = await bcrypt.hash(password, 10);
            await User.updateOne(
                {
                    _id :id,
                },
                {
                    $set : {
                        password : encryptedPassword,
                    },
                }
            );
            // res.json({ status: "Password Updated" });
            res.render("reset", {email: verify.email, status: "Verified"});
        } catch (error) {
            console.log(error)
            res.json({ status: "Something Went Wrong" });
        }
});

app.get("/getAllUser", async (req, res) => {
    try {
        const allUser = await User.find({});
        res.send({ status: "ok", data: allUser });
    } catch (error) {
        console.log(error);
    }
});

app.get("/paginatedUser", async(req, res) => {
    const allUser = await User.find({});
    const page = parseInt(req.query.page)
    const limit = req.query.limit

    const startIndex = (page-1)*limit
    const lastIndex = (page)*limit

    const results = {}
  results.totalUser = allUser.length;
  results.pageCount = Math.ceil(allUser.length/limit);

  if (lastIndex < allUser.length) {
    results.next = {
      page: page + 1,
    }
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    }
  }

    results.result = allUser.slice(startIndex,lastIndex);

    res.json(results);
});
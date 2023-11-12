const TODOModel = require("../models/TODOModel");

const getTODOS = async(req, res) => {
    try {
        const todos = await TODOModel.find();
        res.status(200).send(todos);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const saveTODOS = async(req, res) => {
    try {
        const data = req.body;
        const TODO = await TODOModel.create(data);
        res.status(200).send(TODO);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


const deleteTODO = async(req, res) => {
    try {
        const ID = req.query.id;
        await TODOModel.findByIdAndDelete(ID)
            .then((data) => {
                res.status(200).send(data);
                console.log("Moved to Trash...")
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const updateTODO = async(req, res) => {
    const updatedTODO = req.body;
    const ID = req.query.id;
    try {
        await TODOModel.findByIdAndUpdate(ID, updatedTODO)
            .then(() => {
                res.status(200).send("TODO has been updated...")
            })
    } catch (error) {
        res.status(500).send(error)
    }
}

const search = async(req,res) =>{
    const searchString = req.params.q;
    try {
        await TODOModel.find({todo:{$regex:searchString,$options:'i'}})
            .then((data) => {
                res.status(200).send(data);
            })
    } catch (error) {
        res.status(500).send(error);
    }
}

const clearAll = async (req,res) =>{
    try {
        await TODOModel.deleteMany({})
            .then(() => {
                console.log("All TODOs removed...")
                res.status(200).send("Cleared!")
            })
    } catch (error) {
        res.status(500).send(error);
    }
}


// Development Support Functions
const addManyTODOS = async(req, res) => {
    const data = req.body;
    let count = 0;
    try {
        for (const todo of data) {
            await TODOModel.create(todo)
                .then(() => {
                    count++;
                    console.log(`${count} todo added to DB`)
                })
        }
        res.status(200).send("All TODO's are Added")
    } catch (error) {
        res.status(500).send(error);
    }
}

const remakeTODOS = async (req,res) =>{
    try {
        let received = null;
        await TODOModel.find().then((data) =>{
            console.log("Existing TODOs received...")
            received = data;
        });
        await TODOModel.deleteMany({}).then(() =>{console.log("Cleared DB for new TODOs")});
        let count = 0;
        console.log("");
        for(const ele of received){
            const {todo,completed} = ele;
            count++;
            await TODOModel.create({todo,completed}).then(() =>{console.log(`Remade ${count} TODO`)});
        }
        res.status(200).send("All records were remade...")
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong....")
    }

}



module.exports = { getTODOS, saveTODOS, deleteTODO, updateTODO, addManyTODOS, search, clearAll, remakeTODOS };
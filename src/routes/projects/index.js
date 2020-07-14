const express = require("express")
const db = require("../../db")

const router = express.Router()


router.get("/", async(req, res)=>{
    
    const response = await db.query('SELECT * FROM "projects"')
    res.send(response.rows)
})

router.get("/:id", async (req, res)=>{
    const response = await db.query('SELECT _id, Name, description, RepoURL, LiveURL, studentID FROM "projects" WHERE _id= $1', 
                                                                                        [ req.params.id ])

    if (response.rowCount === 0) 
        return res.status(404).send("Not found")

    res.send(response.rows[0])
})

router.post("/", async (req, res)=> {
    const response = await db.query(`INSERT INTO "projects" ( Name, description, RepoURL, LiveURL, studentID ) 
                                     Values ($1, $2, $3, $4, $5)
                                     RETURNING *`, 
                                    [ req.body.Name, req.body.description, req.body.RepoURL, req.body.LiveURL, req.body.studentID ])
    
    console.log(response)
    res.send(response.rows[0])
})

router.put("/:id", async (req, res)=> {
    try {
        let params = []
        let query = 'UPDATE "projects" SET '
        for (bodyParamName in req.body) {
            query += // for each element in the body I'll add something like parameterName = $Position
                (params.length > 0 ? ", " : '') + //I'll add a coma before the parameterName for every parameter but the first
                bodyParamName + " = $" + (params.length + 1) // += Category = $1 

            params.push(req.body[bodyParamName]) //save the current body parameter into the params array
        }

        params.push(req.params.asin) //push the asin into the array
        query += " WHERE _id = $" + (params.length) + " RETURNING *" //adding filtering for ASIN + returning
        console.log(query)

        const result = await db.query(query, params) //querying the DB for updating the row

       
        if (result.rowCount === 0) //if no element match the specified ASIN => 404
            return res.status(404).send("Not Found")

        res.send(result.rows[0]) //else, return the updated version
    }
    catch(ex) {
        console.log(ex)
        res.status(500).send(ex)
    }
})

router.delete("/:id", async (req, res) => {
    const response = await db.query(`DELETE FROM "projects" WHERE _id= $1`, [ req.params.id ])

    if (response.rowCount === 0)
        return res.status(404).send("Not Found")
    
    res.send("OK")
})

module.exports = router
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const {PythonShell} = require('python-shell');

const {Client} = require('@elastic/elasticsearch')
const client = new Client({
    cloud: {id: process.env.CLOUD_ID},
    auth: {apiKey: process.env.CLOUD_API_KEY}
});

 router.get("/", async (req, res) => {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        ars: ['hello']
    };

    PythonShell.run('python_test.py', options, function(err, result){
        if (err) throw err;
        console.log('result: ', result.toString());
    })

    const result = await client.search({
        index: 'drugs-2014',
        query: {
            match: {
                "Brnd_Name": "Sucralfate"
            }
        }
    });

    if(result){
        return res.status(200).json({
            result: result
        });
    }

    console.log(result.hits.hits);
});

//     let query = {
//         index: 'drugs-2014'
//     }
//     elasticClient
//     elasticClient.get(query).then(resp=>{
//         if(!resp){
//             return res.status(404).json();
//         }
//         return res.status(200).json({
//             result: resp
//         });
//     }).catch(err =>{
//         return res.status(500).json({
//             msg: 'Error not found', err
//         })
//     })
// })

module.exports = router;
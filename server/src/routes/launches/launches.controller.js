const {getAllLaunches, addNewLaunches, existsLaunchWithId, abortLaunchById} = require('../../models/launch.model');

function httpGetAllLaunches(req,res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunches(req, res){
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate|| !launch.target){
        return res.status(400).json({
            error: 'Missing required launch property'
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invalid Date'
        });
    }
    
    addNewLaunches(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res){
    const id = Number(req.params.id);

    if(!existsLaunchWithId(id)){

        return res.status(404).json({
            error: 'Launch not found',
        });
    }
const aborted = abortLaunchById(id);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAbortLaunch
}
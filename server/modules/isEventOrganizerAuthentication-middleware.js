const rejectNonEventOrganizer = (req, res, next) => {
    //check if user access level is equal with admin or event organizer
    if (req.user.authorization == 4 || req.user.authorization == 2) {
        // they were authenticated! User may do the next thing
        next()
    } else {
        res.sendStatus(403);
    }
};

module.exports = { rejectNonEventOrganizer };
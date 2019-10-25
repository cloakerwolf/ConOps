const rejectNonCheckIn = (req, res, next) => {
    //check if user access level is equal with check in or admin
    if (req.user.authorization == 4 || req.user.authorization == 1) {
        //they were authenticated! User may do the next thing

        next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = { rejectNonCheckIn }
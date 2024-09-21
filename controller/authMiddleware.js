// Middleware to check if the user is an admin
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Admin Authentication ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function isAdminAuthenticated(req, res, next) {
    console.log('Session data:', req.session); // Log session data for debugging
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        res.redirect('/login');
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Admin Authentication ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ User Authentication ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function isAuthenticated(req, res, next) {                                                    
    if (req.session.user && req.session.user.id) {
        next();
    } else {
        res.redirect('/userLogin');
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ User Authentication ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

module.exports = {
    isAdminAuthenticated,
    isAuthenticated
};
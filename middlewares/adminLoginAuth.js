const isLogin = async(req, res,next)=>{
    try {
        if (req.session.user_id && req.session.isAdmin == 1) {
            
        }else{
            res.redirect('/login')
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}
const isLogOut = async(req, res,next)=>{
    try {
        if (req.session.user_id && req.session.isAdmin == 1) {
            res.redirect('/dashbord')
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}

module.exports ={
    isLogin,
    isLogOut
}
const protectRoute = (redirectTo = '/admin') => (req, res, next) => {
  if(req.session.user){
      return next()
  }
  return res.redirect(redirectTo)
}

export default protectRoute
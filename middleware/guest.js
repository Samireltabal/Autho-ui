const authentication = ({ store, redirect }) => {
  if (store.$auth.loggedIn) {
    return redirect('/user')
  }
}

export default authentication

import Cookies from 'js-cookie'
export default ({ store, redirect, route }) => {
  const user = store.state.auth.user
  console.log(user, 'USER')
  console.log(user, 'I am user in plugin')
  if (!user || user === 'null' || null) {
    const cookiesExists = Cookies.get('user') && JSON.parse(Cookies.get('user'))
    if (cookiesExists) {
      console.log(`88888888888888`)
      store.commit(`auth/setUser`, cookiesExists)
    } else {
      console.log('no cookies')
      return redirect('/login')
    }
  } else {
    console.log('else running plugin')
  }
}

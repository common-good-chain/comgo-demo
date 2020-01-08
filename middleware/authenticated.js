export default function({ store, redirect }) {
  // If the user is not authenticated
  console.log('authenticated middleware Running')
  if (!store.state.auth.user || store.state.auth.user === 'null' || null) {
    console.log('no user in authenticated')
    return redirect('/login')
  }
}

export default function WelcomePage() {

  const handleLogIn = () => {
    (window as any).Trello.authorize({
			type: 'redirect',
			name: 'Ongoings Timer',
			scope: {
				read: true,
				write: true,
				account: false
			},
			interactive: true,
			expiration: '30days'
		})
  }

  return <>
    <h1>Log-In Page</h1>

    <button onClick={handleLogIn}>Log-in</button>
  </>
}
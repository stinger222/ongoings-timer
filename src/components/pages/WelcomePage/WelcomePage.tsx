import Trello from "../../../models/Trello"

export default function WelcomePage() {

  const handleLogIn = () => {
    
    Trello.authorize({
			type: 'redirect',
			name: 'Ongoings Timer',
			scope: {
				read: true,
				write: true
			},
			interactive: true,
			expiration: '30days',
      success: () => console.log("Explicit Login: SUCCESS"),
      error: () => console.log("Explicit Login: FAILURE")
		})
  }

  return <>
    <h1>Log-In Page</h1>

    <button onClick={handleLogIn}>Log-in</button>
  </>
}
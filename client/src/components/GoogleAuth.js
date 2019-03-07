import React, { Component } from "react"

class GoogleAuth extends Component {
	state = { isSignedIn: null }

	componentDidMount() {
		console.log(process.env.REACT_APP_GOOGLE_OAUTH_KEY)
		window.gapi.load("client:auth2", async () => {
			await window.gapi.client.init({
				clientId: `${process.env.REACT_APP_GOOGLE_OAUTH_KEY}`,
				scope: "email"
			})

			this.auth = window.gapi.auth2.getAuthInstance()
			this.setState({ isSignedIn: this.auth.isSignedIn.get() })
			this.auth.isSignedIn.listen(this.onAuthChange)
		})
	}

	onAuthChange = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() })
	}

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

	renderAuthButton() {
		if (this.state.isSignedIn === null) {
			return null
		} else if (this.state.isSignedIn) {
			return (
				<div>
					<button onClick={this.onSignOutClick} className="ui red google button">
						<i className="google icon" />
						Sign Out
					</button>
				</div>
			)
		} else {
			return (
                <div>
					<button onClick={this.onSignInClick} className="ui red google button">
						<i className="google icon" />
						Sign In With Google
					</button>
				</div>
            )
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>
	}
}

export default GoogleAuth

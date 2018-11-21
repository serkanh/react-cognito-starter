import React, { Component, Fragment } from "react";
import "./App.css";
import Routes from "./Routes";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			isAuthenticated: false,
			isAuthenticating: true
		};
	}
	
	async componentDidMount() {
		try {
			await Auth.currentSession();
			this.userHasAuthenticated(true);
		}
		catch(e) {
			if (e !== 'No current user') {
				alert(e);
			}
		}
	
		this.setState({ isAuthenticating: false });
	}


	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	}

	handleLogout = async event => {
		await Auth.signOut();

		this.userHasAuthenticated(false);
		this.props.history.push("/login");
	}
	
	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated
		};
		return (
			!this.state.isAuthenticating &&
			<div className="App container">
				<Navbar fluid collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">React Cognito Starter</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
						{this.state.isAuthenticated
								? <NavItem onClick={this.handleLogout}>Logout</NavItem>
								: <Fragment>
										<LinkContainer to="/signup">
											<NavItem>Signup</NavItem>
										</LinkContainer>
										<LinkContainer to="/login">
											<NavItem>Login</NavItem>
										</LinkContainer>
									</Fragment>
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Routes childProps={childProps} />
			</div>
		);
	}
}

/*
the App component does not have access to the router props directly since it is not rendered inside a Route component. To be able to use the router props in our App component we will need to use the withRouter Higher-Order Component (or HOC). You can read more about the withRouter HOC here.
*/
export default withRouter(App);
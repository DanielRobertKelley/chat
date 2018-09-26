import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'

export default class LoginForm extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:"",
	  	error:""
	  };
	}

	setUser = ({user, isUser})=>{

		if(isUser){
			this.setError("User name taken")
		}else{
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const { socket } = this.props
		const  username  = this.state.username
		socket.emit(VERIFY_USER, username, this.setUser)
	}

	handleChange = (e)=>{
		this.setState({username:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {	
		const { nickname, error } = this.state
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form" >

					<label htmlFor="nickname">
						<h2>Username?</h2>
					</label>
					<input
						ref={(input)=>{ this.textInput = input }} 
						type="text"
						id="nickname"
						value={nickname}
						onChange={this.handleChange}
						placeholder={'Username'}
						/>
						<div className="error">{error ? error:null}</div>

				</form>
			</div>
		);
	}
}

import React, { Component } from 'react';
import FASearch from 'react-icons/lib/fa/search'


export default class SideBar extends Component{

	constructor(props) {
			super(props)
			this.state = {
				receiver:""
			}
		}
		handleSubmit = (e) => {
			e.preventDefault()
			const {receiver} = this.state
			const {onSendPrivateMessage} = this.props
			onSendPrivateMessage(receiver);
			console.log(receiver)
		}
		
	render(){
		const { chats, activeChat, user, setActiveChat, logout} = this.props
		const { receiver } = this.state
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">Chat Rooms </div>
						<div className="menu">
							
						</div>
					</div>
					<form onSubmit={this.handleSubmit} className="search">
						<i className="search-icon"><FASearch /></i>
						<input placeholder="Search" 
						type="text"
						value={receiver}
						onChange={(e) =>{this.setState({receiver:e.target.value}) }}/>
						<div className="plus"></div>
					</form>
					<div 
						className="users" 
						ref='users' 
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						
						{
						chats.map((chat)=>{
							if(chat.name){
								const lastMessage = chat.messages[chat.messages.length - 1];
								const chatSideName = chat.users.find((name)=>{
									return name !== user.name
								}) || "Community" 
								const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
								
								return(
								<div 
									key={chat.id} 
									className={`user ${classNames}`}
									onClick={ ()=>{ setActiveChat(chat) } }
									>
									<div className="user-photo">{chatSideName[0].toUpperCase()}</div>
									<div className="user-info">
										<div className="name">{chatSideName}</div>
										{lastMessage && <div className="last-message">{lastMessage.message}</div>}
									</div>
									
								</div>
							)
							}

							return null
						})	
						}
						
					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
								
						</div>
					</div>
			</div>
		);
	
	}
}

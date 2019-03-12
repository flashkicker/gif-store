import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { fetchGifs } from "../../actions"

class GifList extends Component {
	componentDidMount() {
		this.props.fetchGifs()
	}

	renderAdmin(gif) {
		if (gif.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link className="ui button primary" to={`/gif/edit/${gif.id}`}>
						EDIT
					</Link>
					<Link
						className="ui button negative"
						to={`/gif/delete/${gif.id}`}
					>
						DELETE
					</Link>
				</div>
			)
		}
	}

	renderList() {
		return this.props.gifs.map(gif => {
			const { id, title, description } = gif
			return (
				<div className="item" key={id}>
					{this.renderAdmin(gif)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link to={`/gif/show/${id}`} className="header">{title}</Link>
						<div className="description">{description}</div>
					</div>
				</div>
			)
		})
	}

	renderCreateButton() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: "right" }}>
					<Link to="/gif/new" className="ui button primary">
						Create Gif
					</Link>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<h2>gifs</h2>
				<div className="ui celled list">{this.renderList()}</div>
				{this.renderCreateButton()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		gifs: Object.values(state.gifs),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	}
}

export default connect(
	mapStateToProps,
	{
		fetchGifs
	}
)(GifList)

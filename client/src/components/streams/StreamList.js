import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { fetchStreams } from "../../actions"

class StreamList extends Component {
	componentDidMount() {
		this.props.fetchStreams()
	}

	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link className="ui button primary" to={`/streams/edit/${stream.id}`}>
						EDIT
					</Link>
					<Link
						className="ui button negative"
						to={`/streams/delete/${stream.id}`}
					>
						DELETE
					</Link>
				</div>
			)
		}
	}

	renderList() {
		return this.props.streams.map(stream => {
			const { id, title, description } = stream
			return (
				<div className="item" key={id}>
					{this.renderAdmin(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link to={`/streams/show/${id}`} className="header">{title}</Link>
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
					<Link to="/streams/new" className="ui button primary">
						Create Stream
					</Link>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderList()}</div>
				{this.renderCreateButton()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	}
}

export default connect(
	mapStateToProps,
	{
		fetchStreams
	}
)(StreamList)

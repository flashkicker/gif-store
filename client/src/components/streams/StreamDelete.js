import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import history from "../../history"
import Modal from "../Modal"
import { fetchStream } from "../../actions"

class StreamDelete extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id)
	}

	renderActions() {
		return (
			<Fragment>
				<button className="ui button negative">Delete</button>
				<Link to="/" className="ui button">Cancel</Link>
			</Fragment>
		)
	}

	renderStreamDetails() {
		if (!this.props.stream) {
			return "Are you sure you want to delete this stream?"
		}

		return `Are you sure you want to delete ${this.props.stream.title}?`
	}

	render() {
		return (
			<div>
				<Modal
					title="Delete Stream"
					content={this.renderStreamDetails()}
					actions={this.renderActions()}
					onDismiss={() => {
						history.push("/")
					}}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id]
	}
}

export default connect(
	mapStateToProps,
	{
		fetchStream
	}
)(StreamDelete)

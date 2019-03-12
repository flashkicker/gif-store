import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import history from "../../history"
import Modal from "../Modal"
import { fetchGif, deleteGif } from "../../actions"

class GifDelete extends Component {
	componentDidMount() {
		this.props.fetchGif(this.props.match.params.id)
	}

	renderActions() {
		const { id } = this.props.match.params
		return (
			<Fragment>
				<button
					onClick={() => {
						this.props.deleteGif(id)
					}}
					className="ui button negative"
				>
					Delete
				</button>
				<Link to="/" className="ui button">
					Cancel
				</Link>
			</Fragment>
		)
	}

	renderGifDetails() {
		if (!this.props.gif) {
			return "Are you sure you want to delete this gif?"
		}

		return `Are you sure you want to delete ${this.props.gif.title}?`
	}

	render() {
		return (
			<div>
				<Modal
					title="Delete Gif"
					content={this.renderGifDetails()}
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
		gif: state.gifs[ownProps.match.params.id]
	}
}

export default connect(
	mapStateToProps,
	{
		fetchGif,
		deleteGif
	}
)(GifDelete)

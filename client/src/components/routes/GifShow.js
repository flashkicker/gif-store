import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchGif } from "../../actions"

class GifShow extends Component {
	componentDidMount() {
		const { id } = this.props.match.params

		this.props.fetchGif(id)
	}

	render() {
		if (!this.props.gif) {
			return <div>Loading...</div>
		}

		const { title, description, url } = this.props.gif

		return (
			<div>
				<img alt={description} src={url} />
				<h1>{title}</h1>
				<h5>{description}</h5>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return { gif: state.gifs[ownProps.match.params.id] }
}

export default connect(
	mapStateToProps,
	{
		fetchGif
	}
)(GifShow)

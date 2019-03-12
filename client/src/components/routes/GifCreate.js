import React, { Component } from "react"
import { connect } from "react-redux"

import { createGif } from "../../actions"
import GifForm from "./GifForm"

class GifCreate extends Component {
	onSubmit = formValues => {
		this.props.createGif(formValues)
	}

	render() {
		return (
			<div>
				<h3>Create a GIF</h3>
				<GifForm onSubmit={this.onSubmit} />
			</div>
		)
	}
}

export default connect(
	null,
	{
		createGif
	}
)(GifCreate)

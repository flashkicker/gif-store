import React, { Component } from "react"
import { connect } from "react-redux"
import _ from 'lodash'

import { fetchGif, editGif } from "../../actions"
import GifForm from "./GifForm"

class GifEdit extends Component {
	componentDidMount() {
		this.props.fetchGif(this.props.match.params.id)
	}

	onSubmit = formValues => {
		this.props.editGif(this.props.match.params.id, formValues)
	}

	render() {
		if (!this.props.gif) {
			return <div>Loading</div>
		}

		return (
			<div>
				<h3>Edit a Gif</h3>
				<GifForm
					initialValues={_.pick(this.props.gif, 'title', 'description')}
					onSubmit={this.onSubmit}
				/>
			</div>
		)
	}
}

// ownProps is a reference to the props that are passed into this component
const mapStateToProps = (state, ownProps) => {
	return {
		gif: state.gifs[ownProps.match.params.id]
	}
}

export default connect(
	mapStateToProps,
	{
		fetchGif,
		editGif
	}
)(GifEdit)

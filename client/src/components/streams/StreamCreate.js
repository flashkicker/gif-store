import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { connect } from "react-redux"
import { createStream } from "../../actions"

class StreamCreate extends Component {
	renderError = metaProps => {
		const { error, touched } = metaProps

		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error} </div>
				</div>
			)
		}
	}

	renderInput = formProps => {
		const { input, label, meta } = formProps
		const { error, touched } = meta
		const className = `field ${error && touched ? "error" : ""}`
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		)
	}

	onSubmit = formValues => {
		this.props.createStream(formValues)
	}

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className="ui form error"
			>
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field
					name="description"
					component={this.renderInput}
					label="Enter Description"
				/>
				<button className="ui button primary">Submit</button>
			</form>
		)
	}
}

const validate = formValues => {
	let errors = {}

	if (!formValues.title) {
		errors.title = "Please enter a title"
	}

	if (!formValues.description) {
		errors.description = "Please enter a description"
	}

	return errors
}

// this is done because we want to use both redux-form and redux-thunk
const formWrapped = reduxForm({
	form: "streamCreate",
	validate: validate
})(StreamCreate)

export default connect(
	null,
	{
		createStream
	}
)(formWrapped)

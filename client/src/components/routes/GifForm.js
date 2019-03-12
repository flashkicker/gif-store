import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import validator from 'validator'

class GifForm extends Component {
	renderError = metaProps => {
		const { error, touched } = metaProps

		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
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
		this.props.onSubmit(formValues)
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
				<Field name="url" component={this.renderInput} label="Enter URL" />
				<button className="ui button primary">Submit</button>
			</form>
		)
	}
}

const validate = formValues => {
	const errors = {}

	if (!formValues.title) {
		errors.title = "Please enter a title"
	}

	if (!formValues.description) {
		errors.description = "Please enter a description"
	}

	if (formValues.url && !validator.isURL(formValues.url)) {
		errors.url = "Please enter a valid url"
	}

	return errors
}

export default reduxForm({
	form: "gifForm",
	validate: validate
})(GifForm)

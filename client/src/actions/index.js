import gifs from "../apis/gifs"
import history from '../history'
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_GIF,
	FETCH_GIF,
	EDIT_GIF,
	DELETE_GIF,
	FETCH_GIFS
} from "./types"

export const signIn = userId => {
	return {
		type: SIGN_IN,
		payload: userId
	}
}

export const signOut = () => {
	return {
		type: SIGN_OUT
	}
}

export const createGif = formValues => {
	return async (dispatch, getState) => {
		//pulling out the userId from the redux store using the getState function
		const { userId } = getState().auth
		console.log(formValues)
		const response = await gifs.post("/gifs", { ...formValues, userId })

		dispatch({
			type: CREATE_GIF,
			payload: response.data
		})

		// do some "programmatic navigation" to redirect user to home page
		history.push('/')
	}
}

export const fetchGifs = () => {
	return async dispatch => {
		const response = await gifs.get("/gifs")

		dispatch({
			type: FETCH_GIFS,
			payload: response.data
		})
	}
}

export const fetchGif = id => {
	return async dispatch => {
		const response = await gifs.get(`/gifs/${id}`)

		dispatch({
			type: FETCH_GIF,
			payload: response.data
		})
	}
}

export const editGif = (id, formValues) => {
	return async dispatch => {
		const response = await gifs.patch(`/gifs/${id}`, formValues)

		dispatch({
			type: EDIT_GIF,
			payload: response.data
		})

		history.push('/')
	}
}

export const deleteGif = id => {
	return async dispatch => {
		await gifs.delete(`/gifs/${id}`)

		dispatch({
			type: DELETE_GIF,
			payload: id
		})

		history.push('/')
	}
}

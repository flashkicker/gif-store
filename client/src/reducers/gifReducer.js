import _ from 'lodash'
import {
	CREATE_GIF,
	FETCH_GIF,
	FETCH_GIFS,
	EDIT_GIF,
	DELETE_GIF
} from "../actions/types"

export default (state = {}, action) => {
	switch (action.type) {
        case FETCH_GIF:
            // this is called the key interpolation syntax
            return { ...state, [action.payload.id]: action.payload }
		case EDIT_GIF:
			return { ...state, [action.payload.id]: action.payload }
        case CREATE_GIF:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_GIF:
            // here we don't use payload.id because in we are dispatching just the id for the delete action creator
            // omit returns a new object
            return _.omit(state, action.payload)
        case FETCH_GIFS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
		default:
			return state
	}
}

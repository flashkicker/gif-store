import _ from 'lodash'
import {
	CREATE_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
	EDIT_STREAM,
	DELETE_STREAM
} from "../actions/types"

export default (state = {}, action) => {
	switch (action.type) {
        case FETCH_STREAM:
            // this is called the key interpolation syntax
            return { ...state, [action.payload.id]: action.payload }
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload }
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_STREAM:
            // here we don't use payload.id because in we are dispatching just the id for the delete action creator
            // omit returns a new object
            return _.omit(state, action.payload)
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
		default:
			return state
	}
}

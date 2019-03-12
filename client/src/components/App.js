import React from "react"
import { Router, Route } from "react-router-dom"
import Header from "./Header"
import GifCreate from "./routes/GifCreate"
import GifEdit from "./routes/GifEdit"
import GifDelete from "./routes/GifDelete"
import GifList from "./routes/GifList"
import GifShow from "./routes/GifShow"
import history from '../history'

const App = () => {
	return (
		<div className="ui container">
			<Router history={history}>
				<div>
					<Header />
					<Route path="/" exact component={GifList} />
					<Route path="/gif/new" exact component={GifCreate} />
					<Route path="/gif/edit/:id" exact component={GifEdit} />
					<Route path="/gif/delete/:id" exact component={GifDelete} />
					<Route path="/gif/show/:id" exact component={GifShow} />
				</div>
			</Router>
		</div>
	)
}

export default App

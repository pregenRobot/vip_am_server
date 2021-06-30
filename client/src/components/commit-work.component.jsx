import React, {Component} from "react"
import WorkDataService from "../services/work.service.js"

export default class CommitWork extends Component{
	constructor(props){
		super(props);
		this.onChangeType = this.onChangeType.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeWorker = this.onChangeWorker.bind(this);
		this.onChangeData = this.onChangeData.bind(this);
		this.saveWork = this.saveWork.bind(this);
		this.newWork = this.newWork.bind(this);

		this.state = {
			type: "",
			worker: "",
			description: "",
			data: "",
			submitted: false
		}
	}
	
	onChangeType(e){
		this.setState({
			type: e.target.value
		})
	}

	onChangeDescription(e){
		this.setState({
			description: e.target.value
		})
	}

	onChangeWorker(e){
		this.setState({
			worker: e.target.value
		})
	}

	onChangeData(e){
		this.setState({
			data: e.target.value
		})
	}

	saveWork(){
		var post_data ={
			type: this.state.type,
			description: this.state.description,
			worker: this.state.worker,
			data: this.state.data
		}

		WorkDataService.create(post_data)
		.then(response => {
			this.setState({
				id: response.data.id,
				type: response.data.type,
				worker: response.data.worker,
				description: response.data.description,
				data: response.data.data,
				status: response.data.status,
				submitted:true
			})
			console.log(response.data)
		})
		.catch(e =>{
			console.log(e);
		})
	}

	newWork(){
		this.setState({
			type: "",
			worker: "",
			description: "",
			data: "",
			submitted:false
		})
	}
	render(){
		return(
			<div className="submit-form">
				{this.state.submitted ? (
					<div>
						<h4> Recorded a commit from you :)</h4>
						<button className="btn btn-success" onClick={this.newWork}>
							Add Another
						</button>
					</div>
				): (
					<div>
						<div className="form-group">
							<label htmlFor="type">Title</label>
							<input
								type="text"
								className="form-control"
								id="type"
								required
								value={this.state.type}
								onChange={this.onChangeType}
								name="type"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="worker">Worker</label>
							<input
								type="text"
								className="form-control"
								id="worker"
								required
								value={this.state.worker}
								onChange={this.onChangeWorker}
								name="worker"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="description">Description</label>
							<input
								type="text"
								className="form-control"
								id="description"
								required
								value={this.state.description}
								onChange={this.onChangeDescription}
								name="type"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="data">Data</label>
							<input
								type="text"
								className="form-control"
								id="data"
								required
								value={this.state.data}
								onChange={this.onChangeData}
								name="data"
							/>
						</div>
						<button onClick={this.saveWork} className="btn btn-success">
							Submit
						</button>
					</div>
				)}
			</div>
		)
	}
	
}
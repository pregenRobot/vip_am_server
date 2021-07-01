// import React, {Component} from "react"
import WorkDataService from "../services/work.service"

// export default class UploadWork extends Component {
	

// }

import React, {useState} from "react"

function UploadWork (){

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [file, setFile] = useState();

	const send = event => {
		const data = new FormData();
		data.append("file",file)
		data.append("name", name)
		data.append("email", email)
		WorkDataService.upload(data)
		.then(response=> console.log(response))
		.catch(error  => console.log(error))
	}


	return (
		<div>
			<form action="#" className="submit-form">
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input type="text" id="name" required className="form-control" onChange={event =>{
						const {value} = event.target;
						setName(value);
					}}/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="text" id="email" required className="form-control" onChange={event =>{
						const {value} = event.target;
						setEmail(value);
					}}/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>	
					<input type="file" id="file" required className="form-control" onChange={event => {
						const file = event.target.files[0]
						setFile(file)
					}}/>
				</div>
				<button onClick={send}>Send</button>
			</form>
		</div>
	)
}

export default UploadWork;
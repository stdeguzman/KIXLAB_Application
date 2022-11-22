const getData = async () => {
	let response = await fetch('http://kuiz.kixlab.org:8080/getOptions', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json; charset=utf-8',},
	})
    return response
}

export const postData = async (optionLabel, isAnswer) => {
	let response = await fetch('http://kuiz.kixlab.org:8080/submitOption', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8'},
		body: JSON.stringify({ optionLabel: optionLabel, isAnswer: isAnswer})
	})
	return response
}

export default getData

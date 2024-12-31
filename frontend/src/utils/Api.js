import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getMatchState = async () => {
	const { data } = await axios.get(`${API_URL}/admin/state`);
	return data;
};

export const updateScore = async (scoreData) => {
	const { data } = await axios.post(`${API_URL}/admin/score`, scoreData);
	return data;
};

export const getOvers = async () => {
	const { data } = await axios.get(`${API_URL}/admin/overs`);
	return data;
};

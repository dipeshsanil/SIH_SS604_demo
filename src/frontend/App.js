import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UploadAddress from "./contractsData/Upload-address.json";
import UploadAbi from "./contractsData/Upload.json";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login/Login";
import Details from "./Details";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import Upload from "./Upload";
import Preview from "./Preview";
import { useState } from "react";
import { ethers } from "ethers";
// import { upload } from "@testing-library/user-event/dist/upload";

const App = () => {
	const [account, setAccount] = useState(null);
	const [upload, setUpload] = useState({});
	const [balance, setBalance] = useState();
	const [loading, setLoading] = useState(true);

	const web3Handler = async () => {
		//metamask accounts
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		setAccount(accounts[0]);

		const provider = new ethers.providers.Web3Provider(window.ethereum);

		const signer = provider.getSigner();

		const balance = await signer.getBalance(account);
		setBalance(ethers.utils.formatEther(balance));

		loadContracts(signer);

		console.log("Balance:" + balance);
	};

	const loadContracts = async (signer) => {
		const upload = new ethers.Contract(
			UploadAddress.address,
			UploadAbi.abi,
			signer
		);
		setUpload(upload);
		setLoading(false);
	};

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<NavBar
								web3Handler={web3Handler}
								account={account}
								balance={balance}
							/>
						}>
						<Route index element={<Login web3Handler={web3Handler} />} />
						<Route path="home" element={<Home upload={upload} />} />
						<Route path="*" element={<Navigate to="/" />} />
						<Route path="details" element={<Details upload={upload} />} />
						{/* //change */}
						<Route path="preview" element={<Preview upload={upload} />} />
						<Route path="user" element={<UserDashboard />} />
						<Route path="admin" element={<AdminDashboard />} />
						<Route path="upload" element={<Upload upload={upload} />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;

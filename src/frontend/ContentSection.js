import React from "react";
import { ethers } from "ethers";
import "./style.css";
import { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";


// import img1 from "./img/assets/fcc_R2_AW_20220405_091_047_B_01.png";
// import img2 from "./img/assets/fcc_R2_AW_20220405_091_047_D_01.png";
// import img3 from "./img/assets/fcc_R2_AW_20220405_091_052_B_01.png";
// import img4 from "./img/assets/fcc_R2_AW_20220405_091_052_C_01.png";
// import img5 from "./img/assets/fcc_R2_AW_20220405_091_052_D_01.png";
// import img6 from "./img/assets/fcc_R2_AW_20220405_091_057_A_01.png";

const ContentSection = ({ upload }) => {
	
	    const [loading, setLoading] = useState(true)
	    const [items, setItems] = useState([])

	    const loadStorage = async () => {
	      console.log(await upload.tokenId());
	      const itemCount = await upload.tokenId()

	      let items = []
	      for (let i = 1; i <= itemCount; i++) {
	        // const item = await upload.items(i)

			const uri = await upload.getTokenURI(i);

			//console.log(uri)

			const response = await fetch(uri)
			console.log(response);
			const metadata = await response.json()


			items.push({
			title: metadata.title,
			details: metadata.details,
			image: metadata.image
			})
	      }
	      setLoading(false)
	      setItems(items)
	    }

	    useEffect( () => {
			loadStorage()
	    }, [])



	return (
		<div
			className="container-fluid"
			id="marketplace"
			style={{ padding: "7% 0" }}>
			<div className="container px-3">
				<h2 className="text-center">Storage</h2>
				<div className="row my-5">
					{items.length > 0 ? (
						items.map((item, index) => <Card key={index} item={item} />)
					) : (
						<main style={{ padding: "1rem 0" }}>
							<h2>No listed assets</h2>
						</main>
					)}
				</div>
				<center>
					<Button name="View More" />
				</center>
			</div>
		</div>
	);
};

export default ContentSection;

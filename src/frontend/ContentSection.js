import React from "react";
import { ethers } from "ethers";
import "./style.css";
import { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";

import img1 from "./img/assets/fcc_R2_AW_20220405_091_047_B_01.png";
import img2 from "./img/assets/fcc_R2_AW_20220405_091_047_D_01.png";
import img3 from "./img/assets/fcc_R2_AW_20220405_091_052_B_01.png";
import img4 from "./img/assets/fcc_R2_AW_20220405_091_052_C_01.png";
import img5 from "./img/assets/fcc_R2_AW_20220405_091_052_D_01.png";
import img6 from "./img/assets/fcc_R2_AW_20220405_091_057_A_01.png";

const ContentSection = ({ marketplace, nft }) => {
	const loadImage = (ipfsUrl, index) => {
		// let url = URL.createObjectURL(event.target.files[0]);
		var xhr = new XMLHttpRequest();
		xhr.responseType = "arraybuffer";
		xhr.open("GET", ipfsUrl);

		xhr.onload = async function (e) {
			console.log(ipfsUrl);
			var arrayBuffer = this.response;
			Tiff.initialize({
				TOTAL_MEMORY: 16777216 * 10,
			});
			var tiff = new Tiff({ buffer: arrayBuffer });
			let canvas = tiff.toCanvas({ quality: "thumbnail" });
			// var dataURI = tiff.toDataURL();
			// document.getElementById("img").src = dataURI;
			document.getElementById(index).appendChild(canvas);
		};
		xhr.send();
	};

	const onImageChange = async (ipfsUrl, index) => {
		// let url = URL.createObjectURL(event.target.files[0]);
		loadImage(ipfsUrl, index);
		const response = await fetch(ipfsUrl);
		const arrayBuffer = await response.arrayBuffer();
		const tiff = await fromArrayBuffer(arrayBuffer);
		const image = await tiff.getImage();
		//raster data
		const width = image.getWidth();
		const height = image.getHeight();
		const tileWidth = image.getTileWidth();
		const tileHeight = image.getTileHeight();
		const samplesPerPixel = image.getSamplesPerPixel();
		const origin = image.getOrigin();
		const resolution = image.getResolution();
		const bbox = image.getBoundingBox();
		//raster data ends
		console.log(
			width,
			height,
			tileWidth,
			tileHeight,
			samplesPerPixel,
			origin,
			resolution,
			bbox
		);
		// document.getElementById("img").src = image;
	};
	//     const [loading, setLoading] = useState(true)
	//     const [items, setItems] = useState([])

	//     const loadMarketplaceItems = async () => {
	//       console.log(await marketplace.itemCount());
	//       const itemCount = await marketplace.itemCount()

	//       let items = []
	//       for (let i = 1; i <= itemCount; i++) {
	//         const item = await marketplace.items(i)
	//         if (!item.sold) {

	//           const uri = await nft.tokenURI(item.tokenId)

	//           //console.log(uri)

	//           const response = await fetch(uri)
	//           console.log(response);
	//           const metadata = await response.json()

	//           const totalPrice = await marketplace.getTotalPrice(item.itemId)

	//           items.push({
	//             totalPrice,
	//             itemId: item.itemId,
	//             seller: item.seller,
	//             title: metadata.title,
	//             description: metadata.description,
	//             image: metadata.image
	//           })
	//         }
	//       }
	//       setLoading(false)
	//       setItems(items)
	//     }

	//     const buyMarketItem = async (item) => {
	//         await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
	//         loadMarketplaceItems()
	//       }

	//     useEffect(() => {
	//     loadMarketplaceItems()
	//     }, [])

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

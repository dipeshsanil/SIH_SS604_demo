import React from "react";
import { Link, Outlet } from "react-router-dom";
// import { ethers } from "ethers";
const Card = ({ item, buy }) => {
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
	return (
		<div class="col-12 col-md-3 gy-4">
			<div class="card shadow-sm" style={{ borderRadius: 20 }}>
				<div id={index} className="card-image">
					{/* <img
						style={{
							// borderTopLeftRadius: 20,
							// borderTopRightRadius: 20,
							borderRadius: 20,
							minHeight: "200px",
						}}
						// src= {item.image}
						src="https://picsum.photos/200"
						className="card-img-top"
						alt="..."
					/> */}
					{onImageChange(item.image, index)}
					<div className="image-overlay"></div>
				</div>
				<div class="card-body ">
					<div class="d-flex justify-content-between align-items-center">
						<h5 class="card-title">{item.title}</h5>
						<a
							href="#"
							role="button"
							id="dropdownMenuLink"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							<svg
								width="25"
								height="11"
								viewBox="0 0 57 11"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<circle cx="5.5" cy="5.5" r="5.5" fill="black" />
								<circle cx="28.5" cy="5.5" r="5.5" fill="black" />
								<circle cx="51.5" cy="5.5" r="5.5" fill="black" />
							</svg>
						</a>
					</div>
					<p class="card-text text-muted">{item.seller}</p>
					<Link
						to="/details"
						state={{ item, buy }}
						style={{ textDecoration: "none" }}>
						{/* <button class="btn btn-primary btn-rounded" href="#">
							{ethers.utils.formatEther(item.totalPrice)} ETH
						</button> */}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;

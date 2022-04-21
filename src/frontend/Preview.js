import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import { Outlet, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from "geotiff";
import Tiff from "tiff.js";

const Preview = ({ upload }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const item = location.state.item;

	useEffect(() => {
		onImageChange(item.image);
	}, []);

	const loadImage = (ipfsUrl) => {
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
			// document.getElementById(key).src = dataURI;
			document.getElementById("raster").appendChild(canvas);
		};
		xhr.send();
	};

	const onImageChange = async (ipfsUrl) => {
		// let url = URL.createObjectURL(event.target.files[0]);
		loadImage(ipfsUrl);
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

	// return <div id="details" className="container"></div>;
	return(
        <div id="details" className="container" >
            <div className="row">
                <div id="raster" className="col-12 col-lg-6">
                </div>
                <div className="col-12 col-lg-6">
                    <div class="d-flex justify-content-between align-items-center">
                        <h3>{item.title}</h3>
                    </div>
                    <div className="py-2">
                        <h5>Details</h5>
                        <p style={{textAlign:"justify"}}>{item.details}</p>
                    </div>
                    <div>
                        
						<button class="btn btn-primary btn-rounded">
						<a href={item.image}>Download</a>
						</button>

                    </div>
                </div>
            </div>
        </div>
    );
};
//TODO:
export default Preview;

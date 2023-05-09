import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { HomeApi } from "./constants"
function AnimeImageSearchLayout({ searchResult, setToggle }) {
	const [loading, setLoading] = useState(true)
	const [view, setView] = useState([])
	const [select, setSelect] = useState(0)
	const prevAnilist = useRef()
	const getAnime = async (number) => {
		setLoading(true)
		try{
		if (prevAnilist.current !== searchResult.result[number].anilist.id) {
			const url = await fetch(
				`${HomeApi}/meta/anilist/info/${searchResult.result[number].anilist.id}`
			)
			const response = await url.json();
			const responseArray = [response]
			console.log(url)
			setView(responseArray)
		}
		prevAnilist.current = searchResult.result[number].anilist.id
		setLoading(false)
	}catch(error){
		console.log("Error loading image search")
	}
	}

	useEffect(() => {
		getAnime(select)
	}, [searchResult.result, select])

	return (
		<>
			{view.map((imageSearch) => {
				return (
					<>
						{!loading && (
							<div className="movies image-search">
								<div className="filter-bar">
									<div className="heading">
										<h3>Match?</h3>
									</div>
								</div>
								<div className="seasons-grid">
									<div
										className="movie-card">
										<div className="card-head">
											<Link to={`/anime-details/${imageSearch.id}`}>
												<img
													src={imageSearch.image}
													alt={imageSearch.id}
													loading="lazy"
													className="card-img"
												/>
											</Link>
											<div className="card-details">
												<div className="episode-total">
													<span>{(imageSearch.totalEpisodes)}</span>
													<span>{(imageSearch.rating / 10)}</span>
												</div>
												<h5 className="card-title">{imageSearch.userPreferred || imageSearch.title.english || imageSearch.romaji}</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</>
				)
			})}
			<div className="movies">
				<div className="filter-bar">
					<div className="heading">
						<h3>Other Results</h3>
					</div>
				</div>
				<div className="seasons-grid">
					{searchResult.result.map((item, i) => (
						<div
							key={i}
							className={` ${select === i && ""
								}`}
							onClick={() => {
								setSelect(i)
							}}
						>
							<div className="season-card">
								<div className="season-head">
									<img
										className="season-img"
										src={item.image || ""}
										alt={
											item.anilist.title.english ||
											item.anilist.title.romaji ||
											item.anilist.title.native
										}
									/>
									<div className="season-details">
										<h5 className="season-title">{item.anilist.title.english ||
											item.anilist.title.romaji ||
											item.anilist.title.native}</h5>
										<h5 className="season-title">Episode - {item.episode}</h5>
										<h5 className="season-title">{Math.round(item.similarity * 10000) / 100}% similarity</h5>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="image-another-search">
					<div className="image-btn-container">
						<button
							className="image-search-btn"
							onClick={() => setToggle(true)}
						>
							 Another Image
						</button>
					</div>
					{/* <div className="expected-scene">
						<div className="heading">
							<h1>Expected Scene</h1>
						</div>
						<video
							src={searchResult.result[select].video}
							autoPlay
							muted
							controls
							playsInline
							loop
						/>
					</div> */}
				</div>
			</div>
		</>
	)
}

export default AnimeImageSearchLayout
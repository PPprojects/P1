import React from 'react'

const Home = () => (
	<div className="home">
		<div className="banner text-center text-inverted">
			<h1>Employee Management Directory</h1>
			<h1>
				<small>a fake application for managing employees</small>
			</h1>
		</div>
		<div className="about">
			<div className="text-inverted">
				<div className="icon-flexbox container">
					<span className="glyphicon glyphicon-eye-open" />
					<span>+</span>
					<span className="glyphicon glyphicon-edit" />
					<span>+</span>
					<span className="glyphicon glyphicon-duplicate" />
					<span>=</span>
					<span className="glyphicon glyphicon-sunglasses" />
				</div>
			</div>
			<div className="inverted">
				<div className="container">
					<div className="media large-font">
						<div className="media-left media-middle">
							<img
								className="media-object"
								src="/images/stock-footage-old-typewriter.jpg"
							/>
						</div>
						<div className="media-body">
							<p className="media-heading large-font">
								Some Media Heading Here
							</p>
							<span>
								Some long paragraph here... maybe an introduction of some sort.
							</span>
						</div>
					</div>
					<br />
					<br />
					<br />
					<div className="media large-font">
						<div className="media-body">
							<p className="media-heading large-font">More heading!</p>
							<span>
								Doop doop scoopidy-poo. Doop doop scoopidy-poo. Doop doop
								scoopidy-poo. Doop doop scoopidy-poo. Doop doop scoopidy-poo.
								Doop doop scoopidy-poo. Doop doop scoopidy-poo.
							</span>
						</div>
						<div className="media-right media-middle">
							<img
								className="media-object"
								src="/images/stock-footage-old-man.jpg"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default Home

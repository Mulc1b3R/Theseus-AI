import '../styles/Tabs.css';
import React, { useState } from 'react';

import { SlIcon, SlTooltip, SlSpinner } from "@shoelace-style/shoelace/dist/react";

export function TabList ({ children, html, css, js, loadingResponse, downloadFunction }) {
	const [activeTab, setActiveTab] = useState(children[0].key);

	const handleChangeTab = (key) => {
		setActiveTab(key);
	}

	const loading_screen = (
		loadingResponse ? (
			<div className="loading-screen">
				<SlSpinner />
			</div>
		) : null
	);


	return (
		<div className="tablist-container">
			<div className="tablist-header">
				{children.map(({ key, props }) => (
					<div
						key={key}
						className={`tablist-tab ${activeTab === key ? "active" : ""}`}
						onClick={() => handleChangeTab(key)}
					>
						<SlIcon name={props.icon} label={props.label} />
						<span>{props.label}</span>
					</div>
				))}

				<SlTooltip content="Download the current page">
					<div className="tablist-tab right" onClick={downloadFunction}>
						<SlIcon name="download" label="Download" />
						<span>Download</span>
					</div>
				</SlTooltip>
			</div>
			{children.map(({ key, props }) => (
				<div key={key} className={`tablist-content ${activeTab === key ? "active" : ""}`}>
					<div className="tablist-content-inner">
						{loading_screen}
						{React.cloneElement(props.children, { html, css, js, loadingResponse })}
					</div>
				</div>
			))}
		</div>
	);
}


export function Tab({ label, children }) {
	return (
		<>
			{children}
		</>
	);
}
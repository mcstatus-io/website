import React from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import Highlight from '../../components/Highlight';
import humanizeDuration from 'humanize-duration';
import DocumentationLayout from '../../layouts/Documentation';
import javaExample from '../../assets/response/v2/java.jsonc';
import bedrockExample from '../../assets/response/v2/bedrock.jsonc';
import sampleIcon from '../../assets/response/icon.png';

export default function DocumentationV2() {
	return (
		<DocumentationLayout version="v2">
			<div className="postman-run-button mt-5 is-block" data-postman-action="collection/fork" data-postman-var-1="12464026-ccd5d862-d399-4ff7-a4dc-19fdbd3cd8d3" data-postman-collection-url="entityId=12464026-ccd5d862-d399-4ff7-a4dc-19fdbd3cd8d3&entityType=collection&workspaceId=ce0bc9a0-bbc1-4857-bbbe-83fe699bda22" />
			<div className="heading-group">
				<h2 className="title is-size-4" id="overview">
					<span className="is-align-middle">Overview</span>
					<Link href="#overview"><a className="ml-3 is-size-4 is-align-middle">#</a></Link>
				</h2>
				<p className="subtitle is-size-5">A quick summary of what to expect</p>
			</div>
			<p>mcstatus.io believes that anybody should be able to retrieve the status of any Minecraft server using a simple and efficient manner. This is why we prioritize a detailed and continuously updated documentation on how to interact with our service from yours. Please make sure to read this documentation thoroughly to prevent any errors that may be a mistake on your part.</p>
			<p>All methods documented are using the REST API, which is supported in all major programming languages and browsers. Body data sent and received from/to the server are using JSON formatting for standardization reasons. You should familiarize yourself with this data encoding before attempting to use our service. If you have any questions, concerns or encounter any problems after attempting a solution, please feel free to contact us by sending an email to <a href="mailto:api@mcstatus.io">api@mcstatus.io</a>.</p>
			<p>All server statuses are cached for up to <span className="has-text-weight-bold">{humanizeDuration(parseInt(process.env.NEXT_PUBLIC_CACHE_TIME) * 1000, { round: true, largest: 1 })}</span> from the previous network fetch. The <code>X-Cache-Time-Remaining</code> response header will be present if the status was retrieved from the cache, and contains the amount of seconds until the cache expires.</p>
			<div className="heading-group">
				<h2 className="title is-size-4" id="java-status">
					<span className="is-align-middle">Java Status</span>
					<Link href="#java-status"><a className="ml-3 is-size-4 is-align-middle">#</a></Link>
				</h2>
				<p className="subtitle is-size-5">Retrieve the status of any Java Edition Minecraft server</p>
			</div>
			<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/v2/status/java/&lt;address&gt;</code></p>
			<Highlight source={javaExample} />
			<div className="heading-group">
				<h2 className="title is-size-4" id="bedrock-status">
					<span className="is-align-middle">Bedrock Status</span>
					<Link href="#bedrock-status"><a className="ml-3 is-size-4 is-align-middle">#</a></Link>
				</h2>
				<p className="subtitle is-size-5">Retrieve the status of any Bedrock Edition Minecraft server</p>
			</div>
			<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/v2/status/bedrock/&lt;address&gt;</code></p>
			<Highlight source={bedrockExample} />
			<div className="heading-group">
				<h2 className="title is-size-4" id="icon">
					<span className="is-align-middle">Icon</span>
					<Link href="#icon"><a className="ml-3 is-size-4 is-align-middle">#</a></Link>
				</h2>
				<p className="subtitle is-size-5">Preview the icon of any Minecraft server</p>
			</div>
			<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/v2/icon/&lt;address&gt;</code></p>
			<Image src={sampleIcon} alt="Sample icon of Hypixel" width="128" height="128" />
		</DocumentationLayout>
	);
}
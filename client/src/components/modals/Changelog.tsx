import { APP_BUILD, APP_VERSION } from "../../store/global";

export default function Changelog({cancel}: {cancel: ()=>void} ) {

const changelogText = `# ${APP_VERSION} (${APP_BUILD})
- Responsive Web Design
- Added Smooth Animations

## Todo list
- Improve server security.
- Code cleanup.
- Post editing/deleting.
- User badges.
- Add more features.
- QOL updates.
`;

	return (
		<>
			<h3 className="text-blue-950">Changelog</h3>
				<pre id="MODAL_CHANGELOG" className="text-blue-950 bg-gray-200 p-1 m-1 rounded-md">{changelogText}</pre>
				<small className="text-blue-950" > <a href="https://github.com/hppsrc/mini-react" target="_blank">Check the source code here!</a> </small>
				<br />
			<button className="btn blue" onClick={cancel}><p>Ok</p></button>
		</>
	)
}

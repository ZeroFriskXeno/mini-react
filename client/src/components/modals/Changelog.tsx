import { APP_BUILD } from "../../store/global";

export default function Changelog({cancel}: {cancel: ()=>void} ) {

const changelogText = `# v1.0.0 (${APP_BUILD})
- Stable public version
- Added register, login, delete account actions
- Added posting, liking, reporting

## Todo list
- Add full responsive design
- Edit/delete post
-

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

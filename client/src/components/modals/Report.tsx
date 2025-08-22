import type { PostData, ReportData, ResponseData } from "../../types/types"

import { useState } from "react"
import dayjs from "dayjs";
import { useGlobalStore } from "../../store/globalStore";

export default function Report(
	{ post, 					report, 																	cancel				}:
	{ post: PostData | null, 	report: (postData: PostData, reportData: ReportData)=>Promise<ResponseData>, 	cancel: ()=>void} ) {

	const { setError, setSuccess } = useGlobalStore();

	const [ fetching, setFetching ] = useState(false);
	const [ reason, setReason ] = useState("");

	const handleReport = async () => {

        if (!post) return;

        setFetching(true);

        try {
            const reportData: ReportData = {
                post_id: post.post_id || post.id,
                reason: reason.trim()
            };

            let res = await report(post, reportData);
			if (res.ok) setSuccess(res.message);
			else setError(res.message);
            cancel();

        } catch (error) {
			setError((error as Error).message);
            console.error("Error reporting post:", error);
        } finally {
            setFetching(false);
        }

    };

	if (!post) return(<p>Post Expected</p>);

	return (
		<>

			<h3 className="text-blue-950">Report post</h3>
			<p className="text-blue-950">Submit a report of a malicious post or username</p>

            <div className="mb-4 p-3 bg-gray-100 rounded">
                <p className="text-sm text-gray-600">Reporting post by:</p>
                <p className="font-bold text-blue-950">{post.username}</p>
                <p className="text-sm text-gray-700 mt-1">"{post.content}"</p>
                <p className="text-xs text-gray-500 mt-1">
                    {dayjs(post.post_time).format('DD/MM/YY hh:mm A')}
                </p>
            </div>
			<form>
				<small className="text-blue-950">Reason for your report</small>
				<input
					className={`${fetching ? "animate-pulse" : null } `}
					placeholder="Something bad :("
					value={reason}
					onChange={(e)=>setReason(e.target.value)}
					disabled={fetching}
				/>

				<button
					className={`btn red ${fetching ? "animate-pulse" : null } `}
					disabled={fetching}
					onClick={handleReport}>
					<p>Report</p>
				</button>

				<button
					className={`btn blue ${fetching ? "animate-pulse" : null } `}
					disabled={fetching}
					onClick={cancel}>
					<p>Cancel</p>
				</button>
			</form>

		</>
	)
}

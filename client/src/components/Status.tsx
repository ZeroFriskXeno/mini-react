import type { ResponseData } from '../types/types'

import { useEffect, useState } from 'react'
import { fetchStatusSupabase } from '../api/Status'

import { Circle } from 'react-feather'

export default function Status() {

	const [data, setData] = useState<ResponseData | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchStatusSupabase()
			.then(setData)
			.catch(err => {
				setError(err.message);
			})
	}, [])

	if (error) return (
		<>
			< Circle className='stroke-red-600 fill-red-600 size-5 p-2' />
			<p className="text-red-400" title={error}>Error</p>
		</>
	)

	if (!data) return (
		<>
			< Circle className='stroke-gray-600 fill-gray-600 size-5 p-2' />
			<p className="text-gray-600">Connecting...</p>
		</>
	)

	return (< Circle className='stroke-green-400 fill-green-400 size-5 p-2' />)

}

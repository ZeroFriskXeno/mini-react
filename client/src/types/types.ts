export interface PostProps {
	author: string
	liked: boolean
	likesCount: number
	content: string
	postdate: Date
}

export interface SectionProps {
	title: string
	icon: React.ReactNode
	posts: React.ReactNode
}

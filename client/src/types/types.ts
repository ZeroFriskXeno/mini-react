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

export interface PanelOptionProps {
	text: string
	action: () => void
}

export interface PanelProps {
	slide: boolean
	action: () => void
	options: React.ReactNode
}

export interface ModalProps {
	show: boolean
	content: React.ReactNode
	action: () => void
}

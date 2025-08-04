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
	icon: React.ReactNode
	text: string
	action: () => void
}

export interface PanelProps {
	logged: boolean
	slide: boolean
	close: () => void
	onRegister: () => void
	onLogin: () => void
	newPost: () => void
}

export interface ModalProps {
	show: boolean
	content: React.ReactNode
	action: () => void
}

export interface Response {
	ok: boolean
	message: string
}

export interface UserData {
	username: string
	password: string
	status?: number
}

export interface PostData {
	id: number 			// id => user_id
	username: string 	// usename
	content: string
	likes: number
	time: string
}

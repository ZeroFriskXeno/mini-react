export interface PostProps {
	username: string
	liked: boolean
	likes: number
	content: string
	post_time: string
}

export interface SectionProps {
	title: string
	icon: React.ReactNode
  	posts: PostProps[];
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
	onNewPost: () => void
}

export interface ModalProps {
	show: boolean
	content: React.ReactNode
	action: () => void
}

export interface ResponseData {
	ok: boolean
	message: string
	data?: any
}

export interface UserData {
	username: string
	password: string
	status?: number
}

export interface PostData {
	id: number 			// id => user_id
	username: string
	content: string
	likes: number
	post_time: string
}

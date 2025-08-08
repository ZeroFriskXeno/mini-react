export interface PostProps {
	id: number
	username: string
	liked: boolean
	likes: number
	content: string
	post_time: string
	likeAction: (userData: PostData)=>Promise<ResponseData>
	likeUpdate: () => void
}

export interface SectionProps {
	title: string
	icon: React.ReactNode
  	posts: PostProps[]
	likeAction: (userData: PostData)=>Promise<ResponseData>
	likeUpdate?: () => void
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
	onLogout: () => void
}

export interface ModalProps {
	show: boolean
	content: React.ReactNode
	action: () => void
}

export interface UserData {
	username: string
	password: string
	status?: number
}

export interface PostData {
	id: number 			// id => user_id
	post_id?: number
	username: string
	content: string
	likes: number
	post_time: string
}

export interface ResponseData {
	ok: boolean
	message: string
	data?: any
	modal?: boolean
}

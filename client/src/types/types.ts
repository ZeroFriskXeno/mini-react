//#region COMPONENT PROPS

export interface PostProps {
	id: number
	username: string
	liked: boolean
	likes: number
	reports: number
	content: string
	post_time: string
	likeAction: (userData: PostData)=>Promise<ResponseData>
	likeUpdate: () => void
	reportAction: (postData: PostData) => void
}

export interface SectionProps {
	title: string
	icon: React.ReactNode
  	posts: PostProps[]
	likeAction: (userData: PostData)=>Promise<ResponseData>
	likeUpdate: () => void
    reportAction: (postData: PostData) => void
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

export interface PanelOptionProps {
	icon: React.ReactNode
	text: string
	action: () => void
}

export interface ModalProps {
	show: boolean
	content: React.ReactNode
	action: () => void
}

export interface ReportModalProps {
    post: PostData;
    report: (postData: PostData, reportData: ReportData) => Promise<ResponseData>;
    cancel: () => void;
}


//#region API PROPS

export interface UserData {
	username: string
	password: string
	// status?: number // TODO add on future update
}

export interface PostData {
	id: number 			// id => user_id
	post_id?: number
	username: string
	content: string
	likes: number
	reports: number
	post_time: string
}

export interface ReportData {
    post_id: number;
	reason: string
}

export interface ResponseData {
	ok: boolean
	message: string
	data?: any
}

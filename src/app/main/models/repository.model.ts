export interface Repository {
    id: string
    project_id: string
    name: string
    description: string
    type: string
    repository_url: string
    position: number
    createdAt: Date
    updatedAt: Date
}
export interface BaseParams {
    page: number
    limit: number
}

export interface BaseRepository<T, P extends BaseParams = BaseParams> {
    findMany(params: P): Promise<{
        data: T[]
        totalPages: number
        currentPage: number
    }>
    delete(id: number): Promise<boolean>
}

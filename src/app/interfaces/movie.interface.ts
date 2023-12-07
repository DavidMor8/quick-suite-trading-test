export interface Movie {
    id: number,
    title: string,
    description : string,
    rating : number,
    duration : string, 
    genre: string,
    releasedDate :  string,
    trailerLink :string,
    youtubeId?: string,
    image: string,
    addedToWatchlist?: boolean;
}
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import movieApi from '../../common/api/MovieApi'
import {APIKey} from '../../common/api/MovieApiKey'

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies',
    async()=>{
        const movieText = 'Batman'
        const response = await movieApi.get( 
            `?apiKey=${APIKey}&s=${movieText}&type=movie`
        );
      return response.data;
    }
)

export const fetchAsyncShows = createAsyncThunk(
    'shows/fetchAsyncShows',
    async()=>{
        const seriesText = 'education'
        const response = await movieApi.get( 
            `?apiKey=${APIKey}&s=${seriesText}&type=series`
        );
      return response.data;
        
    }
)

const initialState = {
    movies: {},
    shows:{}
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers:{
        addMovies:(state,{payload})=>{
            state.movies=payload;
        }
    },
    extraReducers:{
        [fetchAsyncMovies.pending]:()=>{
            console.log('Pending');
        },
        [fetchAsyncMovies.fulfilled]:(state,{payload})=>{
            console.log('Fetched successfully!');
            return {...state,movies:payload};
        },
        [fetchAsyncMovies.rejected]:()=>{
            console.log('Rejected!');
        },
        [fetchAsyncShows.fulfilled]:(state,{payload})=>{
            console.log('Fetched successfully!');
            return {...state,shows:payload};
        }
    }
})

export const {addMovies} = movieSlice.actions;
export default movieSlice.reducer;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
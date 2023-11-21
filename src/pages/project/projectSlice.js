// src/redux/projectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  projects: [],
  selectedProject: null,
  selectedEpisode: null,
  loading: false,
  error: null,
};

const API_URL = "https://ailama.onrender.com";
// Async Thunks

// Helper function to get the token from local storage
const getToken = () => {
  return localStorage.getItem('token'); // Replace 'yourAuthTokenKey' with the actual key you use to store the token
};
const saveSelectedProjectInLocalStorage = (project) => {
  localStorage.setItem('selectedProject', JSON.stringify(project));
};

export const createProject = createAsyncThunk('project/createProject', async (projectData) => {
  try {
    const response = await axios.post(`${API_URL}/project/create`, projectData, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const getAllProjects = createAsyncThunk('project/getAllProjects', async () => {
    try {
      const response = await axios.get(`${API_URL}/project/getAllProjects`,{
        headers: {
            Authorization: `${getToken()}`,
          },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  });
  

export const addEpisode = createAsyncThunk('project/addEpisode', async ({ projectId, episodeData }) => {
  try {
    const response = await axios.post(`${API_URL}/project/addEpisode/${projectId}`, episodeData, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const deleteEpisode = createAsyncThunk('project/deleteEpisode', async ({ projectId, episodeId }) => {
  try {
    await axios.delete(`${API_URL}/project/deleteEpisode/${projectId}/${episodeId}`, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });
    return episodeId;
  } catch (error) {
    throw error.response.data;
  }
});


export const updateEpisode = createAsyncThunk('projects/updateEpisode', async ({ projectId, episodeId, name, description, status }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/project/${projectId}/episodes/${episodeId}`, { description}, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    // Handle error
    return rejectWithValue(error.response.data);
  }
});

export const getAllEpisodes = createAsyncThunk('project/getAllEpisodes', async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/project/getAllEpisodes/${projectId}`, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Define the slice
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {

    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setSelectedEpisode: (state, action) => { // Add setSelectedEpisode reducer
      state.selectedEpisode = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEpisode.fulfilled, (state, action) => {
        state.selectedProject = action.payload;
      })
      .addCase(addEpisode.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteEpisode.fulfilled, (state, action) => {
        if (state.selectedProject) {
          state.selectedProject.episodes = state.selectedProject.episodes.filter(
            (episode) => episode._id !== action.payload
          );
        }
      })
      .addCase(deleteEpisode.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllEpisodes.fulfilled, (state, action) => {
        state.selectedProject.episodes = action.payload;
        // Assuming you have a specific way to determine the initially selected episode
        state.selectedEpisode = action.payload[0]; // Set the first episode as selected
      })
      .addCase(getAllEpisodes.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateEpisode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEpisode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the episode in the state
        const { projectId, episodeId, name, description, status } = action.payload;
        const projectIndex = state.projects.findIndex((project) => project.id === projectId);
        const episodeIndex = state.projects[projectIndex].episodes.findIndex((episode) => episode.id === episodeId);
        state.projects[projectIndex].episodes[episodeIndex] = {
          ...state.projects[projectIndex].episodes[episodeIndex],
          name,
          description,
          status,
        };
      })
      .addCase(updateEpisode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

// Export actions and reducer
export const { setSelectedProject,setSelectedEpisode } = projectSlice.actions;
export default projectSlice.reducer;

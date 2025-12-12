import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types/Task';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  pending: number;
}

const initialState: TasksState = { 
  tasks: [],
  loading: false,
  pending: 0
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      
      state.pending = action.payload.filter(task => task.status === "pending").length;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPending: (state, action: PayloadAction<number>) => {
      state.pending = action.payload;
    }
  },
});

export const { setTasks, setLoading, setPending } = tasksSlice.actions;
export default tasksSlice.reducer;

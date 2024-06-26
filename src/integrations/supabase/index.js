import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return data;
};

/* supabase integration types

### resources_table

| name            | type   | format | required |
|-----------------|--------|--------|----------|
| resource_id     | uuid   | string | true     |
| quantity        | numeric| number | true     |
| resource_type   | text   | string | false    |
| allocation_date | date   | string | false    |

### task_table

| name             | type        | format | required |
|------------------|-------------|--------|----------|
| id               | bigint      | number | true     |
| created_at       | timestamptz | string | true     |
| task_name        | text        | string | false    |
| task_description | text        | string | false    |
| assigned_user    | text        | string | false    |
| status           | text        | string | false    |
| priority         | text        | string | false    |

### profile

| name                | type                | format | required |
|---------------------|---------------------|--------|----------|
| user_id             | uuid                | string | true     |
| created_at          | timestamptz         | string | true     |
| email               | text                | string | false    |
| first_name          | text                | string | false    |
| last_name           | text                | string | false    |
| address             | text                | string | false    |
| phone_number        | character varying   | string | false    |
| profile_picture_url | text                | string | false    |

### milestone_table

| name                | type                | format | required |
|---------------------|---------------------|--------|----------|
| milestone_id        | bigint              | number | true     |
| milestone_name      | text                | string | false    |
| milestone_description | text              | string | false    |
| created_at          | timestamptz         | string | true     |
| desired_due_date    | date                | string | false    |
| milestone_status    | text                | string | false    |
| project_id          | integer             | number | false    |

### group_profiles

| name                | type                | format | required |
|---------------------|---------------------|--------|----------|
| id                  | bigint              | number | true     |
| name_alias          | text                | string | true     |
| role                | text                | string | false    |
| contact_info        | text                | string | false    |
| user_id             | uuid                | string | false    |

### project

| name                | type                | format | required |
|---------------------|---------------------|--------|----------|
| project_id          | integer             | number | true     |
| project_name        | character varying   | string | true     |
| project_description | text                | string | false    |
| start_date          | date                | string | true     |
| end_date            | date                | string | false    |
| project_status      | character varying   | string | true     |
| creator_of_project  | uuid                | string | false    |

*/

export const useResourcesTable = () => useQuery({
    queryKey: ['resources_table'],
    queryFn: () => fromSupabase(supabase.from('resources_table').select('*')),
});

export const useAddResource = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newResource) => fromSupabase(supabase.from('resources_table').insert([newResource])),
        onSuccess: () => {
            queryClient.invalidateQueries('resources_table');
        },
    });
};

export const useTaskTable = () => useQuery({
    queryKey: ['task_table'],
    queryFn: () => fromSupabase(supabase.from('task_table').select('*')),
});

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask) => fromSupabase(supabase.from('task_table').insert([newTask])),
        onSuccess: () => {
            queryClient.invalidateQueries('task_table');
        },
    });
};

export const useProfile = () => useQuery({
    queryKey: ['profile'],
    queryFn: () => fromSupabase(supabase.from('profile').select('*')),
});

export const useAddProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProfile) => fromSupabase(supabase.from('profile').insert([newProfile])),
        onSuccess: () => {
            queryClient.invalidateQueries('profile');
        },
    });
};

export const useMilestoneTable = () => useQuery({
    queryKey: ['milestone_table'],
    queryFn: () => fromSupabase(supabase.from('milestone_table').select('*')),
});

export const useAddMilestone = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMilestone) => fromSupabase(supabase.from('milestone_table').insert([newMilestone])),
        onSuccess: () => {
            queryClient.invalidateQueries('milestone_table');
        },
    });
};

export const useGroupProfiles = () => useQuery({
    queryKey: ['group_profiles'],
    queryFn: () => fromSupabase(supabase.from('group_profiles').select('*')),
});

export const useAddGroupProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newGroupProfile) => fromSupabase(supabase.from('group_profiles').insert([newGroupProfile])),
        onSuccess: () => {
            queryClient.invalidateQueries('group_profiles');
        },
    });
};

export const useProject = () => useQuery({
    queryKey: ['project'],
    queryFn: () => fromSupabase(supabase.from('project').select('*')),
});

export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProject) => fromSupabase(supabase.from('project').insert([newProject])),
        onSuccess: () => {
            queryClient.invalidateQueries('project');
        },
    });
};
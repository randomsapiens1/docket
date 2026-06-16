# Supabase Setup Instructions

Run the following SQL in your Supabase SQL Editor to create the necessary table and storage bucket for the Document Vault.

## 1. Create Documents Table

```sql
-- Create a table for document metadata
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  doc_type text not null, -- e.g., 'TIN', 'NID', 'TRADE_LICENSE'
  file_path text not null,
  file_name text not null,
  content_type text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.documents enable row level security;

-- Create policies
create policy "Users can view their own documents"
  on public.documents for select
  using ( auth.uid() = user_id );

create policy "Users can upload their own documents"
  on public.documents for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own documents"
  on public.documents for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own documents"
  on public.documents for delete
  using ( auth.uid() = user_id );
```

## 2. Create Storage Bucket

1. Go to **Storage** in your Supabase Dashboard.
2. Create a new bucket named `vault`.
3. Set the bucket to **Private**.
4. Add the following RLS policies for the `vault` bucket:
   - **Select**: `auth.uid() = (storage.foldername(name))[1]::uuid`
   - **Insert**: `auth.uid() = (storage.foldername(name))[1]::uuid`
   - **Update**: `auth.uid() = (storage.foldername(name))[1]::uuid`
   - **Delete**: `auth.uid() = (storage.foldername(name))[1]::uuid`

*Note: This storage policy assumes files are stored in a folder named after the user's ID (e.g., `vault/user-uuid/document.pdf`).*

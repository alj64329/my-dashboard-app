import { Client, Account, TablesDB } from 'appwrite';

export const client = new Client();
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string
client
    .setEndpoint(endpoint)
    .setProject(projectId); // Replace with your project ID

export const account = new Account(client);
export const tableDB = new TablesDB(client)
export { ID } from 'appwrite';

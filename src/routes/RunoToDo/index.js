import { connectToDatabase } from "$lib/db";
import { ObjectId } from "mongodb";

export async function get(request) {
    try {
        const completed = request.url.searchParams.get('completed') === 'true' ? true : false;
        const dbConnection = await connectToDatabase()
        const db = dbConnection.db
        const collection = db.collection('ToDos')
        const todos = await collection.find({completed}).toArray()
        
        return {
            status: 200,
            body: {
                todos
            }
        }
    } catch(err) {
        return {
            status: 500,
            body: {
                error: 'A server error ...'
            }
        }
    }    
}

export async function post(request) {
    
}

export async function put(request) {
    
}

export async function del(request) {
    
}
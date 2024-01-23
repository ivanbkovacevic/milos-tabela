import ProjectModel from '../Models/Project.js';

export async function handler(event, context) {
  try {
    const data = await ProjectModel.find();
    if (!data) return { statusCode: 204, body: JSON.stringify({ message: 'No projects found' }) };
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal Server Error' }) };
  }
}

import ProjectModel from '../Models/Project.js';

export async function handler(event, context) {
  try {
    const newItem = JSON.parse(event.body);
    const newProject = await ProjectModel.create(newItem);
    console.log('New project saved:', newProject);
    return { statusCode: 201, body: JSON.stringify(newProject) };
  } catch (error) {
    console.error('Error saving new project:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal Server Error' }) };
  }
}

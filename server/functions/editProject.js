import ProjectModel from '../Models/Project.js';

export async function handler(event, context) {
  try {
    const item = JSON.parse(event.body);
    if (!item._id) {
      return { statusCode: 400, body: JSON.stringify({ message: 'id required' }) };
    }
    const project = await ProjectModel.findOne({ _id: item._id }).exec();
    if (!project) {
      return { statusCode: 204, body: JSON.stringify({ message: `No project with that id ${item._id}` }) };
    }
    // ... update project properties
    const result = await project.save();
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    console.error('Error saving new project:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal Server Error' }) };
  }
}

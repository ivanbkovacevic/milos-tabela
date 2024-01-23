import ProjectModel from '../Models/Project.js';

export async function handler(event, context) {
  try {
    const item = JSON.parse(event.body);
    if (!item._id) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Project id is required' }) };
    }
    const project = await ProjectModel.findOne({ _id: item._id }).exec();
    if (!project) {
      return { statusCode: 204, body: JSON.stringify({ message: `No project with that id ${item._id}` }) };
    }
    const result = await project.deleteOne({ _id: item._id });
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    console.error('Error deleting new project:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal Server Error' }) };
  }
}

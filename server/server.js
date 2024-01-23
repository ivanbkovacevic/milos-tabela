import express from 'express';
import pkg from 'body-parser';
// import ProjectModel from './Models/Project.js';
// import pkgg from 'mongoose';
import dotenv from 'dotenv';
import { connectionDB} from './connectionDB.js';
// const { connection} = pkgg;

dotenv.config();
const {json} = pkg;
const app = express();
// const PORT = 5000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


app.use(json());
app.set("view engine", "ejs");
connectionDB();
export { app };
// Set up Multer for image upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
  
//   const upload = multer({ storage: storage });

  // Define an endpoint for image upload
// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//       const newImage = new Image({ filename: req.file.filename });
//       await newImage.save();
//       res.status(201).json({ message: 'Image uploaded successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
  
// GET: Retrieve all items
// app.get('/api/items', async (req, res) => {
//     const data = await ProjectModel.find();
//     if (!data) return res.status(204).json({
//         'message': 'No projects found'
//     })
 
//     res.json(data);
// });
// GET: Retrieve all images
// app.get('/api/items', async (req, res) => {
//     const imgData= await ImageModel.find({});
//    if (!imgData) return res.status(204).json({
//     'message': 'No img found'
// })
//     res.json(imgData);
// });

// POST: Create a new item

// const addNewProject = async (req, res) => {
//     const newItem = req.body;
//     try {
//         const newProject = await ProjectModel.create(newItem);
//         console.log('New project saved:', newProject);
//         res.status(201).json(newProject);
//     } catch (error) {
//         console.error('Error saving new project:', error);
//     }
// }
// const editProject = async (req, res) => {
//     const item = req.body;
//     try {
//         if (!item?._id) {
//             return res.status(400).json({
//                 'message': 'id required'
//             })
//         }
//         const project = await ProjectModel.findOne({
//             _id: item._id
//         }).exec();
//         if (!project) {
//             return res.status(204).json({
//                 'message': `No project with that id ${item._id}`
//             })
//         }
//         if (item?.name) project.name = item.name;
//         if (item?.productImg) project.productImg = item.productImg !== null ? item.productImg : '/miising iamge';
//         if (item?.productPage) project.productPage = item.productPage;
//         if (item?.articlePage) project.articlePage = item.articlePage;
//         if (item?.email) project.email = item.email;
//         if (item?.pageLink) project.pageLink = item.pageLink;

//         const result = await project.save();
//         res.json(result);
//         console.log('Project edited:', result);
//     } catch (error) {
//         console.error('Error saving new project:', error);
//     }
// }

// const deleteProject = async (req, res) => {
//     const item = req.body;
//     try {
//         if (!item?._id) {
//             return res.status(400).json({
//                 'message': 'Project id is required'
//             })
//         }
//         const project = await ProjectModel.findOne({
//             _id: item._id
//         }).exec();
//         if (!project) {
//             return res.status(204).json({
//                 'message': `No project with that id ${item._id}`
//             })
//         }
//         const result = await project.deleteOne({
//             _id: item._id
//         });
//         res.json(result);
//         console.log('Project deleted:', result);
//     } catch (error) {
//         console.error('Error deleting new project:', error);
//     }
// }

// app.post('/api/items/new', (req, res) => {
//     addNewProject(req, res)
// });

// // PUT: Update an existing item
// app.post('/api/items', (req, res) => {
//     editProject(req, res);
// });

// // DELETE: Delete an item
// app.post('/api/items/delete', (req, res) => {
//     deleteProject(req, res)
// });

// Start the server
// connection.once('open', () => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => {
//         console.log(`Server is running on http://localhost:${PORT}`);
//     });
// });
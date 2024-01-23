import {
    Schema,
    model,
} from 'mongoose';

const imageSchema = new Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
  });
  
  const ImageModel = model('Image', imageSchema);
  
  export default ImageModel;
import moongoose from "mongoose"
const { Schema, model } = mongoose

/* {
    "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
     "name": "app test 1",  //REQUIRED
     "description": "somthing longer", //REQUIRED
     "brand": "nokia", //REQUIRED
     "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", //REQUIRED
     "price": 100, //REQUIRED
     "category": "smartphones"  
     "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
     "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED

     {
        "_id": "123455", //SERVER GENERATED
        "comment": "A good book but definitely I don't like many parts of the plot", //REQUIRED
        "rate": 3, //REQUIRED, max 5
        "productId": "5d318e1a8541744830bef139", //REQUIRED reference to Products Table
        "createdAt": "2019-08-01T12:46:45.895Z"  //SERVER GENERATED
}
     }  */ 

     const productSchema = new Schema(
        {
          name: {type: String, required: true},
          description: { type: String, required: true },
          brand: { type: String, required: true },
          imageUrl: { type: String, required: true },
          price: { type: Number, required: true },
          category:  { type: String },
          
          reviews: [
            {
              comment: { type: String },
              rate: { type: Number, min: 1, max: 5},
              category: { type: String },
             
            },
          ],
        },
        {
          timestamps: true, 
        }
      )
  
  export default model("Product", productSchema);
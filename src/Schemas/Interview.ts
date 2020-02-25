import { Document, Schema, Model, model} from "mongoose";
import { Entry } from "../Interfaces/Entry";

export interface IntvwModel extends Entry, Document {
  
}

export var InterviewSchema: Schema = new Schema({
    createdAt: Date,
    firstName: String,
    lastName: String
  });
  //Trying to put a pre-save hook that saves the date an interview entry was created but it isnt working.
/*InterviewSchema.pre("save", function(next) {
    let now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });
*/
export const Interview: Model<IntvwModel> = model<IntvwModel>("Interview", InterviewSchema);
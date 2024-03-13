import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  let files;
  let fields;
  form.uploadDir = "./formfiles/";
  form.keepExtensions = true;
  let a = await form
    .parse(req, (err, formFields, formFiles) => {
      console.log(formFields);
      files = formFiles;
      fields = formFields;
      console.log(files);
    })

};

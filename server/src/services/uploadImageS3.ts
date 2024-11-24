// upload image to s3 bucket

module.exports = async (base64Image: string) => {
  // const s3 = new S3({
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // });

  // const base64Data = new Buffer.from(
  //     base64Image.replace(/^data:image\/\w+;base64,/, ""),
  //     "base64"
  // );

  // const type = base64Image.split(";")[0].split("/")[1];

  // const params = {
  //     Bucket: process.env.AWS_BUCKET_NAME,
  //     Key: `${uuidv4()}.${type}`,
  //     Body: base64Data,
  //     ACL: "public-read",
  //     ContentEncoding: "base64",
  //     ContentType: `image/${type}`,
  // };

  // const data = await s3.upload(params).promise();

  // return data.Location;

  return "./ex1.png";
};

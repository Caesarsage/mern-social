import jwt from 'jsonwebtoken'

const auth = async (req,res, next)=>{
  try {
    const token = req.headers.authorization.split(" ")[1]
    // check if the token is from google or jwt
    const isCustomAut = token.length < 500;

    let decodedData;
    // if it is jwt(ours)
    if(token && isCustomAut){
      decodedData = jwt.verify(token, 'someSecretToChangeLater')

      req.userId = decodedData?.id;
    }else{
      // google token
      decodedData =  jwt.decode(token)

      req.userId = decodedData?.sub;
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth